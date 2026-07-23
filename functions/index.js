const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const {
  contactSchema,
  jobApplicationSchema,
} = require("./validation");

admin.initializeApp();
const db = admin.firestore();

const gmailUser = defineSecret("GMAIL_USER");
const gmailPass = defineSecret("GMAIL_PASS");
const recaptchaSecret = defineSecret("RECAPTCHA_SECRET");


function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

async function checkRateLimit(identifier, type) {
  const docId = `${type}_${identifier}`;
  const ref = db.collection("rateLimits").doc(docId);

  const now = Date.now();

  await db.runTransaction(async (transaction) => {
    const snap = await transaction.get(ref);

    if (!snap.exists) {
      transaction.set(ref, {
        count: 1,
        firstRequest: now,
      });
      return;
    }

    const data = snap.data();

    if (now - data.firstRequest > RATE_LIMIT_WINDOW) {
      transaction.set(ref, {
        count: 1,
        firstRequest: now,
      });
      return;
    }

    if (data.count >= MAX_REQUESTS) {
      throw new HttpsError(
        "resource-exhausted",
        "Too many submissions. Please wait 10 minutes before trying again."
      );
    }

    transaction.update(ref, {
      count: admin.firestore.FieldValue.increment(1),
    });
  });
}

async function checkDuplicate(collectionName, filters) {
  let query = db.collection(collectionName);

  Object.entries(filters).forEach(([field, value]) => {
    query = query.where(field, "==", value);
  });

  const snapshot = await query.limit(1).get();

  return !snapshot.empty;
}

exports.submitContact = onCall(
  {
    secrets: [gmailUser, gmailPass, recaptchaSecret],
    enforceAppCheck: true,

    region: "us-central1",
    memory: "256MiB",
    timeoutSeconds: 30,
    maxInstances: 5,
  },
  async (request) => {
    try {
      const data = {
        ...request.data,
        email: request.data.email
          ? request.data.email.toLowerCase().trim()
          : ""
      };

      // rest of your code...
    console.log("submitContact started");

    // Validate input
    const validation = contactSchema.safeParse(data);

    if (!validation.success) {
      console.error(validation.error.flatten());

      throw new HttpsError(
        "invalid-argument",
        validation.error.issues[0].message
      );
    }
   await checkRateLimit(data.email, "contact");

   if (!data.captchaToken) {
  throw new HttpsError(
    "invalid-argument",
    "Missing reCAPTCHA token."
   );
   }
    // Verify reCAPTCHA
    let captchaResult;
      try {
        const captchaRes = await fetch(
  "https://www.google.com/recaptcha/api/siteverify",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      secret: recaptchaSecret.value(),
      response: data.captchaToken,
    }),
  }
);
        captchaResult = await captchaRes.json();
        console.log("reCAPTCHA result:", captchaResult.success);
      } catch (err) {
        console.error("reCAPTCHA fetch failed:", err.message);
        throw new HttpsError("internal", "Could not verify reCAPTCHA. Please try again.");
      }

      if (!captchaResult.success) {
        console.error("reCAPTCHA failed:", captchaResult["error-codes"]);
        throw new HttpsError("invalid-argument", "reCAPTCHA verification failed. Please try again.");
      }
      const duplicate = await checkDuplicate(
  "contactSubmissions",
  {
    email: data.email,
  }
);

if (duplicate) {
  throw new HttpsError(
    "already-exists",
    "We already received an inquiry from this email."
  );
}

      // Save to Firestore
      const { captchaToken, ...contactData } = data;
      let docRef;
      try {
        docRef = await db.collection("contactSubmissions").add({
          ...contactData,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        console.log("Saved to Firestore:", docRef.id);
      } catch (err) {
        console.error("Firestore write failed:", err.message);
        throw new HttpsError("internal", "Failed to save your message. Please try again.");
      }

      // Send emails — failure here does NOT block success
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: gmailUser.value(),
            pass: gmailPass.value(),
          },
        });

        const safeName = escapeHtml(data.name);
        const safeEmail = escapeHtml(data.email);
        const safePhone = escapeHtml(data.phone);
        const safeCompany = data.company ? escapeHtml(data.company) : "Not provided";
        const safeMessage = escapeHtml(data.message);

        // Notify owner
        await transporter.sendMail({
          from: "greenhousebrandworks123@gmail.com",
          to: "greenhousebrandworks123@gmail.com",
          subject: `New Contact Inquiry from ${safeName}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><b>Name:</b> ${safeName}</p>
            <p><b>Email:</b> ${safeEmail}</p>
            <p><b>Phone:</b> ${safePhone}</p>
            <p><b>Company:</b> ${safeCompany}</p>
            <p><b>Message:</b><br/>${safeMessage}</p>
          `,
        });

        // Confirmation to client
        await transporter.sendMail({
          from: "greenhousebrandworks123@gmail.com",
          to: data.email,
          subject: "We received your inquiry - Greenhouse Brandworks",
          html: `
            <h2>Hello ${safeName},</h2>
            <p>Thank you for reaching out to <b>Greenhouse Brandworks</b>.</p>
            <p>We have received your inquiry and one of our lead brand directors will review your details and get back to you within <b>24 hours</b> to schedule a discovery call.</p>
            <br/>
            <p>Regards,<br/>Greenhouse Brandworks Team</p>
          `,
        });

        console.log("Contact emails sent successfully");
        return { success: true, id: docRef.id, emailSent: true };
      } catch (err) {
        console.error("Email failed:", err.message, err.code);
        return { success: true, id: docRef.id, emailSent: false };
      }

    } catch (err) {
      if (err instanceof HttpsError) throw err;
      console.error("Unhandled error in submitContact:", err.message, err.stack);
      throw new HttpsError("internal", "An unexpected error occurred. Please try again.");
    }
  }
);

exports.submitJobApplication = onCall(
  {
    secrets: [gmailUser, gmailPass, recaptchaSecret],
    enforceAppCheck: true,

    region: "us-central1",
    memory: "256MiB",
    timeoutSeconds: 30,
    maxInstances: 5,
  },
  async (request) => {
    try {
      const data = {
        ...request.data,
        email: request.data.email
          ? request.data.email.toLowerCase().trim()
          : ""
      };

      // rest of your code...
      console.log("submitJobApplication started");

      // Validate input
      const validation = jobApplicationSchema.safeParse(data);

      if (!validation.success) {
        console.error(validation.error.flatten());

        throw new HttpsError(
          "invalid-argument",
          validation.error.issues[0].message
        );
      }
      await checkRateLimit(data.email, "job");

if (!data.captchaToken) {
  throw new HttpsError(
    "invalid-argument",
    "Missing reCAPTCHA token."
  );
}
      // Verify reCAPTCHA
      let captchaResult;

      try {
       const captchaRes = await fetch(
  "https://www.google.com/recaptcha/api/siteverify",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      secret: recaptchaSecret.value(),
      response: data.captchaToken,
    }),
  }
);

        captchaResult = await captchaRes.json();
        console.log("reCAPTCHA result:", captchaResult.success);
      } catch (err) {
        console.error("reCAPTCHA fetch failed:", err.message);
        throw new HttpsError(
          "internal",
          "Could not verify reCAPTCHA. Please try again."
        );
      }

      if (!captchaResult.success) {
        console.error("reCAPTCHA failed:", captchaResult["error-codes"]);

        throw new HttpsError(
          "invalid-argument",
          "reCAPTCHA verification failed. Please try again."
        );
      }
      const duplicate = await checkDuplicate(
  "jobApplications",
  {
    email: data.email
  }
);

if (duplicate) {
  throw new HttpsError(
    "already-exists",
    "You have already submitted an application."
  );
}

      // Save to Firestore
      const { captchaToken, ...applicationData } = data;

      let docRef;

      try {
        docRef = await db.collection("jobApplications").add({
          ...applicationData,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        console.log("Saved to Firestore:", docRef.id);
      } catch (err) {
        console.error("Firestore write failed:", err.message);

        throw new HttpsError(
          "internal",
          "Failed to save your application. Please try again."
        );
      }

      // Send Emails
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: gmailUser.value(),
            pass: gmailPass.value(),
          },
        });

        const safeName = escapeHtml(data.name);
        const safeEmail = escapeHtml(data.email);
        const safePhone = escapeHtml(data.phone);
        const safeJobTitle = escapeHtml(data.jobTitle);
        const safeResumeURL = escapeHtml(data.resumeURL);
        const safePortfolio = data.portfolio
          ? escapeHtml(data.portfolio)
          : "Not provided";
        const safeMessage = escapeHtml(data.message);

        await transporter.sendMail({
          from: "greenhousebrandworks123@gmail.com",
          to: "greenhousebrandworks123@gmail.com",
          subject: `New Application: ${safeJobTitle}`,
          html: `
            <h2>New Job Application</h2>
            <p><b>Name:</b> ${safeName}</p>
            <p><b>Email:</b> ${safeEmail}</p>
            <p><b>Phone:</b> ${safePhone}</p>
            <p><b>Role:</b> ${safeJobTitle}</p>
            <p><b>Resume:</b> <a href="${safeResumeURL}">View Resume</a></p>
            <p><b>Portfolio:</b> ${safePortfolio}</p>
            <p><b>Message:</b><br/>${safeMessage}</p>
          `,
        });

        await transporter.sendMail({
          from: "greenhousebrandworks123@gmail.com",
          to: data.email,
          subject: "Application Received - Greenhouse Brandworks",
          html: `
            <h2>Hello ${safeName},</h2>
            <p>Thank you for applying for the <b>${safeJobTitle}</b> position.</p>
            <p>We have received your application successfully. Our team will review it and contact you if shortlisted.</p>
            <br/>
            <p>Regards,<br/>Greenhouse Brandworks Team</p>
          `,
        });

        console.log("Emails sent successfully");

        return {
          success: true,
          id: docRef.id,
          emailSent: true,
        };
      } catch (err) {
        console.error("Email failed:", err.message, err.code);

        return {
          success: true,
          id: docRef.id,
          emailSent: false,
        };
      }
    } catch (err) {
      if (err instanceof HttpsError) throw err;

      console.error(
        "Unhandled error in submitJobApplication:",
        err.message,
        err.stack
      );

      throw new HttpsError(
        "internal",
        "An unexpected error occurred. Please try again."
      );
    }
  }
);
