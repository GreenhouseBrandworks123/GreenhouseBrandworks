const { onRequest, onCall, HttpsError } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// Helper to verify reCAPTCHA token
async function verifyRecaptcha(token) {
  if (!token) {
    throw new HttpsError("invalid-argument", "reCAPTCHA token is missing.");
  }

  // Get the reCAPTCHA secret key from configuration env
  // Note: Set this in the console or functions config
  const secretKey = process.env.RECAPTCHA_SECRET_KEY || 
                    (global.process && global.process.env.RECAPTCHA_SECRET_KEY);

  if (!secretKey) {
    // Fallback/log warning: in development or if not set, we might need a warning, 
    // but in production it must be set. We'll check if config is present.
    console.warn("RECAPTCHA_SECRET_KEY is not set. Skipping verification (dev only) or failing if enforced.");
    // For safety, let's assume if it's missing, it's a server config error.
    // However, if we want to allow testing without it setup, we can log. 
    // Let's enforce it.
    throw new HttpsError("failed-precondition", "Server reCAPTCHA configuration error.");
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`
    });

    const data = await response.json();
    if (!data.success) {
      console.error("reCAPTCHA validation failed:", data["error-codes"]);
      throw new HttpsError("permission-denied", "Failed reCAPTCHA verification.");
    }
    return true;
  } catch (error) {
    if (error instanceof HttpsError) throw error;
    throw new HttpsError("internal", "Error validating reCAPTCHA token.", error);
  }
}

// Helper to validate phone number format
const phoneRegex = /^[+\d\s\-().]{7,20}$/;
function validatePhone(phone) {
  if (!phone || !phoneRegex.test(phone)) {
    throw new HttpsError("invalid-argument", "Invalid phone number format.");
  }
}

// 1. Contact submission function
exports.submitContact = onCall(async (request) => {
  const { data } = request;
  const { name, email, phone, company, message, captchaToken } = data || {};

  // Validate reCAPTCHA
  // reCAPTCHA temporarily disabled for testing
// await verifyRecaptcha(captchaToken);

  // Validate Input Existence & Length Limits
  if (!name || name.trim().length > 100) {
    throw new HttpsError("invalid-argument", "Name is required and must be under 100 characters.");
  }
  if (!email || email.trim().length > 100 || !/\S+@\S+\.\S+/.test(email)) {
    throw new HttpsError("invalid-argument", "A valid email under 100 characters is required.");
  }
  validatePhone(phone);
  if (company && company.trim().length > 100) {
    throw new HttpsError("invalid-argument", "Company name must be under 100 characters.");
  }
  if (!message || message.trim().length > 2000) {
    throw new HttpsError("invalid-argument", "Message is required and must be under 2000 characters.");
  }

  try {
    const docRef = await db.collection("contactSubmissions").add({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company ? company.trim() : "",
      message: message.trim(),
      submittedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error writing contact submission to Firestore:", error);
    throw new HttpsError("internal", "Failed to save contact submission.");
  }
});

// 2. Careers submission function
exports.submitJobApplication = onCall(async (request) => {
  const { data } = request;
  const { jobId, jobTitle, name, email, phone, portfolio, message, resumeURL, captchaToken } = data || {};

  // Validate reCAPTCHA
  // reCAPTCHA temporarily disabled for testing
// await verifyRecaptcha(captchaToken);

  // Validate Inputs
  if (!jobId || jobId.trim().length > 50) {
    throw new HttpsError("invalid-argument", "Invalid Job ID.");
  }
  if (!jobTitle || jobTitle.trim().length > 100) {
    throw new HttpsError("invalid-argument", "Invalid Job Title.");
  }
  if (!name || name.trim().length > 100) {
    throw new HttpsError("invalid-argument", "Name is required and must be under 100 characters.");
  }
  if (!email || email.trim().length > 100 || !/\S+@\S+\.\S+/.test(email)) {
    throw new HttpsError("invalid-argument", "A valid email under 100 characters is required.");
  }
  validatePhone(phone);
  if (!resumeURL || resumeURL.trim().length > 500 || !/^https:\/\//.test(resumeURL)) {
    throw new HttpsError("invalid-argument", "Valid resume URL (starting with https://) is required.");
  }

  // Validate resume domain limits
  const ALLOWED_RESUME_DOMAINS = ["drive.google.com", "docs.google.com", "dropbox.com", "onedrive.live.com", "onedrive.com"];
  try {
    const url = new URL(resumeURL);
    if (!ALLOWED_RESUME_DOMAINS.some(domain => url.hostname === domain || url.hostname.endsWith("." + domain))) {
      throw new HttpsError("invalid-argument", "Resume URL must be from drive.google.com, docs.google.com, dropbox.com, or onedrive.live.com.");
    }
  } catch (e) {
    throw new HttpsError("invalid-argument", "Resume link must be a valid URL.");
  }

  // Verify portfolio link if provided
  if (portfolio && portfolio.trim()) {
    if (portfolio.trim().length > 500 || !/^https:\/\//.test(portfolio.trim())) {
      throw new HttpsError("invalid-argument", "Portfolio must be a valid HTTPS URL.");
    }
  }

  if (message && message.trim().length > 2000) {
    throw new HttpsError("invalid-argument", "Message must be under 2000 characters.");
  }

  try {
    const docRef = await db.collection("jobApplications").add({
      jobId: jobId.trim(),
      jobTitle: jobTitle.trim(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      portfolio: portfolio ? portfolio.trim() : "",
      message: message ? message.trim() : "",
      resumeURL: resumeURL.trim(),
      appliedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error writing job application to Firestore:", error);
    throw new HttpsError("internal", "Failed to save job application.");
  }
});
