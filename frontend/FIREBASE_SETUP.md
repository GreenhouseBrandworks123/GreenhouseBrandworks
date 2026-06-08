# Firebase Setup for Greenhouse Portfolio

This is a **public portfolio website** with no user authentication. Firebase is used to:
- 📝 **Firestore**: Store contact form submissions and job applications
- 📦 **Storage**: Store uploaded resumes and portfolios from job applicants

## ✅ What's Been Configured

- ✓ Firebase SDK installed (Firestore + Storage only)
- ✓ `src/firebase.js` - Firebase initialization
- ✓ `src/firebaseUtils.js` - Utility functions for forms & file uploads
- ✓ Environment configuration files

## 🔧 Setup Steps

### 1. Create Firebase Project
- Go to [Firebase Console](https://console.firebase.google.com)
- Click "Add project" → Enter "Greenhouse" → Continue
- Create a web app

### 2. Get Your Credentials
- In Firebase Console → Project Settings (⚙️)
- Scroll to "Your apps"
- Copy your **Web app config** and paste into `.env.local`:

```
VITE_FIREBASE_API_KEY=xxxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxxx
VITE_FIREBASE_PROJECT_ID=xxxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxxx
VITE_FIREBASE_APP_ID=xxxxx
```

### 3. Enable Required Services in Firebase

#### Firestore Database
1. Go to **Firestore Database** → Click "Create database"
2. Select **Production mode** → Choose your region → Create
3. Create two collections:
   - `contactSubmissions` - for contact form data
   - `jobApplications` - for job application data

#### Cloud Storage
1. Go to **Cloud Storage** → Click "Create bucket"
2. Name it: `greenhouse-uploads`
3. Choose storage location → Create
4. Security Rules (can be updated later):
   - Allow uploads for resumes: `storage/uploads/resumes/{allPaths=**}`
   - Allow uploads for portfolios: `storage/uploads/portfolios/{allPaths=**}`

### 4. Firebase Security Rules

**Firestore Rules** - Read-only (no direct client writes):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if false;
      allow write: if false;
    }
  }
}
```

**Storage Rules** - Allow file uploads:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /resumes/{allPaths=**} {
      allow write: if request.resource.size < 10 * 1024 * 1024; // 10MB
    }
    match /portfolios/{allPaths=**} {
      allow write: if request.resource.size < 50 * 1024 * 1024; // 50MB
    }
  }
}
```

## 📚 Available Functions

### Contact Form - `saveContactSubmission(contactData)`
```jsx
import { saveContactSubmission } from './firebaseUtils';

const handleContactSubmit = async (formData) => {
  try {
    const submissionId = await saveContactSubmission({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      message: formData.message,
    });
    console.log('Submission saved:', submissionId);
  } catch (error) {
    console.error('Error:', error.message);
  }
};
```

### Job Application - `saveJobApplication(applicationData)`
```jsx
import { saveJobApplication, uploadResume, uploadPortfolio } from './firebaseUtils';

const handleJobApplication = async (applicationData, resumeFile, portfolioFile) => {
  try {
    // Upload resume
    let resumeURL = null;
    if (resumeFile) {
      resumeURL = await uploadResume(resumeFile, applicationData.jobId);
    }

    // Upload portfolio
    let portfolioURL = null;
    if (portfolioFile) {
      portfolioURL = await uploadPortfolio(portfolioFile, applicationData.jobId);
    }

    // Save application
    const applicationId = await saveJobApplication({
      jobId: applicationData.jobId,
      name: applicationData.name,
      email: applicationData.email,
      phone: applicationData.phone,
      message: applicationData.message,
      resumeURL,
      portfolioURL,
    });
    
    console.log('Application saved:', applicationId);
  } catch (error) {
    console.error('Error:', error.message);
  }
};
```

### File Upload Functions
- `uploadResume(file, jobId)` - Upload resume to Cloud Storage
- `uploadPortfolio(file, jobId)` - Upload portfolio to Cloud Storage
- Returns download URL after successful upload

## 🔒 Security Notes

- `.env.local` is in `.gitignore` - never commit it
- Use `.env.example` as a template for team members
- Backend should validate all submissions before displaying
- Set strong Firestore/Storage rules to prevent abuse

## 🚀 Integration Checklist

- [ ] Set up Firebase project
- [ ] Add credentials to `.env.local`
- [ ] Enable Firestore & Storage
- [ ] Create `contactSubmissions` collection
- [ ] Create `jobApplications` collection
- [ ] Set Firestore security rules
- [ ] Set Storage security rules
- [ ] Test contact form submission
- [ ] Test job application with file uploads
