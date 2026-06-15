# Security Vulnerability Report — Greenhouse Brandworks

**Date:** 2026-06-12  
**Project:** React + Vite SPA with Firebase (Firestore + Cloud Storage)  
**Audited Directories:** `frontend/src/`, `frontend/vercel.json`, `frontend/package.json`  
**Backend:** None — all logic is client-side

---

## Summary

| Severity | Count |
|----------|-------|
| Critical | 3 |
| High | 5 |
| Medium | 5 |
| Low / Informational | 3 |

---

## Critical

### C-1: Live Firebase Credentials Bundled Into Public JS

**File:** `frontend/.env.local`  
**Risk:** All `VITE_` prefixed variables (Firebase API key, project ID, app ID, reCAPTCHA site key) are bundled verbatim into the client-side JavaScript at build time. Anyone who inspects the production bundle via browser DevTools can extract every credential. The `.gitignore` correctly excludes `.env.local` from commits, but any production build exposes all keys publicly.

**Action:**
- Rotate all Firebase credentials and the reCAPTCHA site key immediately.
- Accept that `VITE_` vars are always public in the bundle — rely on Firebase Security Rules for actual protection, not key secrecy.

---

### C-2: No Firestore Security Rules — Database Open to the Internet

**Files:** No `firestore.rules` or `firebase.json` found anywhere in the repository.  
**Risk:** With no rules deployed, anyone who obtains the public project ID and API key (both embedded in the JS bundle via C-1) can directly read all Firestore data using the Firebase REST API. This exposes every name, email, phone number, and message submitted through the contact and careers forms.

**Action:**
- Deploy `firestore.rules` immediately.
- Restrict client writes to append-only on `contactSubmissions` and `jobApplications` collections.
- Deny all client reads — only authenticated admins should read submissions.

Example minimum rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contactSubmissions/{doc} {
      allow create: if true;
      allow read, update, delete: if false;
    }
    match /jobApplications/{doc} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

---

### C-3: No Firebase Storage Rules — Uploaded Files Fully Exposed

**Files:** No `storage.rules` found anywhere in the repository.  
**Risk:** Same situation as C-2 for Firebase Storage. Anyone can list, download, or overwrite uploaded resumes and portfolio files using the public bucket URL embedded in the Firebase config.

**Action:**
- Add `storage.rules` restricting downloads to authenticated admins.
- Restrict uploads to the specific paths (`resumes/`, `portfolios/`) and enforce content type.

Example minimum rules:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /resumes/{file} {
      allow write: if request.resource.contentType in ['application/pdf', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        && request.resource.size < 10 * 1024 * 1024;
      allow read: if false;
    }
    match /portfolios/{file} {
      allow write: if request.resource.size < 20 * 1024 * 1024;
      allow read: if false;
    }
  }
}
```

---

## High

### H-1: Firebase Config Logged to Console in Production

**File:** `frontend/src/firebase.js:15`  
**Risk:** The following line prints all Firebase credentials to the browser console in every environment, including production. Any visitor who opens DevTools sees the full config object.

```js
console.log("Firebase Config:", firebaseConfig);
```

**Action:** Remove this line before any production deployment.

---

### H-2: reCAPTCHA Is Client-Side Only — Zero Bot Protection

**File:** `frontend/src/pages/Careers.jsx:97–99, 109–118`  
**Risk:** The captcha token is checked in the UI (`if (!captchaValue) return`) but is never sent to any backend for verification. The Firestore write only saves form fields — the token is discarded. Any bot can bypass the React UI entirely and call the Firestore API directly using the public credentials.

```js
// Token checked in UI but never verified server-side
if (!captchaValue) {
  setErrors({ captcha: 'Please complete the reCAPTCHA' });
  return;
}
// captchaValue is never included in the Firestore write below
```

**Action:**
- Deploy a Firebase Cloud Function that accepts form submissions, verifies the token against Google's reCAPTCHA secret key server-side, then writes to Firestore.
- The reCAPTCHA **secret key** must never appear in client code.

---

### H-3: Contact Form Has Zero Bot Protection

**File:** `frontend/src/pages/Contact.jsx`  
**Risk:** No reCAPTCHA, no rate limiting, no honeypot field. Any automated script can flood the `contactSubmissions` Firestore collection with arbitrary data, inflating storage and billing.

**Action:** Add reCAPTCHA v2 or v3 to the contact form, consistent with the careers form. Route the submission through a Cloud Function for server-side token verification.

---

### H-4: No Input Sanitization or Field Length Limits

**Files:** `frontend/src/pages/Contact.jsx:42–48`, `frontend/src/pages/Careers.jsx:109–118`, `frontend/src/firebaseUtils.js`  
**Risk:** Fields like `name`, `message`, and `company` are written to Firestore with only presence checks (`trim()` / email regex). No maximum length is enforced. A malicious user can submit megabytes of text per submission, inflating Firestore storage and billing. If stored data is later rendered in an admin dashboard or email notification without proper escaping, injection could occur.

**Action:**
- Enforce field length limits in client-side validation (e.g. `message` max 2000 chars).
- Enforce the same limits in Firestore Security Rules using `request.resource.data.message.size() < 2000`.

---

### H-5: Resume URL Field Accepts Any `https://` Link

**File:** `frontend/src/pages/Careers.jsx:92–95`  
**Risk:** Validation only checks `startsWith('https://')`. An attacker can submit a URL pointing to a malware site, phishing page, or any arbitrary destination. When an admin clicks the link from a Firestore dashboard they navigate to that arbitrary destination with no warning.

**Action:** Allowlist accepted resume hosting domains:
```js
const ALLOWED_RESUME_DOMAINS = ['drive.google.com', 'docs.google.com', 'dropbox.com', 'onedrive.live.com'];
const url = new URL(formData.resumeURL);
if (!ALLOWED_RESUME_DOMAINS.includes(url.hostname)) {
  setErrors({ resumeURL: 'Please use Google Drive, Dropbox, or OneDrive' });
  return;
}
```

---

## Medium

### M-1: Raw Firebase Error Messages Exposed in UI

**File:** `frontend/src/pages/Careers.jsx:124, 312`  
**Risk:** Caught exceptions are rendered directly in the UI:

```jsx
setErrors({ submit: error.message });
// ...
{errors.submit && <span className="form-error">{errors.submit}</span>}
```

Firebase SDK error messages can reveal internal details such as collection names, Firestore rule violation descriptions (`Missing or insufficient permissions`), and project structure hints.

**Action:** Map errors to generic user-facing strings:
```js
setErrors({ submit: 'Something went wrong. Please try again later.' });
```

---

### M-2: No Security Headers Configured

**File:** `frontend/vercel.json`  
**Risk:** No `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, or `Referrer-Policy` headers are set. The site is vulnerable to clickjacking and MIME-type sniffing attacks.

**Action:** Add a `headers` section to `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' https://www.google.com https://www.gstatic.com; frame-src https://www.google.com;" }
      ]
    }
  ]
}
```

---

### M-3: File Uploads Have No MIME Type or Size Validation

**File:** `frontend/src/firebaseUtils.js:40–74`  
**Risk:** `uploadResume` and `uploadPortfolio` accept any `File` object with no content-type check, no file extension validation, and no size limit. Malicious files (e.g. an HTML file containing scripts) can be uploaded and served from the Firebase Storage domain, potentially harming admins who open them.

**Action:**
- Add client-side type and size checks before upload:
```js
const ALLOWED_TYPES = ['application/pdf', 'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
if (!ALLOWED_TYPES.includes(file.type)) throw new Error('Only PDF and Word documents are accepted.');
if (file.size > 10 * 1024 * 1024) throw new Error('File must be under 10 MB.');
```
- Enforce content type in Firebase Storage Rules (see C-3 example).

---

### M-4: Portfolio URL Field Has No HTTPS Enforcement

**File:** `frontend/src/pages/Careers.jsx:244–253`  
**Risk:** The portfolio URL field uses only HTML `type="url"` validation. No JavaScript-level check enforces `https://` or restricts to safe domains. HTTP links and `javascript:` URIs in browsers with lax parsing could pass through.

**Action:** Apply the same domain allowlist approach as H-5, or at minimum enforce `https://` in JS validation.

---

### M-5: Phone Field Accepts Any Non-Empty String

**Files:** `frontend/src/pages/Contact.jsx:29–30`, `frontend/src/pages/Careers.jsx:89–91`  
**Risk:** Phone number validation only checks `!formData.phone.trim()`. Any non-empty string is accepted and stored in Firestore. No format or regex validation is applied.

**Action:** Add a basic phone format check:
```js
const phoneRegex = /^[+\d\s\-().]{7,20}$/;
if (!phoneRegex.test(formData.phone)) {
  setErrors({ phone: 'Please enter a valid phone number.' });
}
```

---

## Low / Informational

### L-1: No Authentication Layer for Admin Access to Firestore

There is no Firebase Authentication in the project. All protection depends entirely on Firestore/Storage Security Rules being correct. There is no way to distinguish an admin from a random visitor at the application layer. This is acceptable for a public form but means any rule misconfiguration immediately exposes all data with no fallback auth gate.

---

### L-2: Custom Router — No Open Redirect (Safe)

**File:** `frontend/src/App.jsx`  
The custom router uses a React `useState` switch over a hardcoded set of page IDs. No URL parameters or user-controlled input feeds into `setCurrentPage`. The default case renders `<Home />`. No open redirect vulnerability exists.

---

### L-3: Dependencies — 0 Known Vulnerabilities (Safe)

**File:** `frontend/package.json`  
`npm audit` reports zero vulnerabilities. All packages are current:

| Package | Version |
|---------|---------|
| `firebase` | `^12.14.0` |
| `react` | `^19.2.6` |
| `react-google-recaptcha` | `^3.1.0` |
| `vite` | `^8.0.12` |

No action required on dependencies.

---

## Priority Action Checklist

- [ ] **Rotate all Firebase credentials and reCAPTCHA site key** (C-1)
- [ ] **Deploy Firestore Security Rules** — data is publicly readable right now (C-2)
- [ ] **Deploy Firebase Storage Rules** — uploaded files are publicly accessible (C-3)
- [ ] **Remove `console.log` from `firebase.js:15`** — one-line fix (H-1)
- [ ] **Add a Firebase Cloud Function** for form submissions with server-side reCAPTCHA verification (H-2, H-3)
- [ ] **Add security headers to `vercel.json`** (M-2)
- [ ] **Restrict resume URL field** to an allowlist of trusted domains (H-5)
- [ ] **Add file type and size validation** to resume/portfolio uploads (M-3)
- [ ] **Add reCAPTCHA to the Contact form** (H-3)
- [ ] **Map Firebase errors to generic messages** before displaying in UI (M-1)
