const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const { logger } = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const fetch = require("node-fetch");

admin.initializeApp();
const db = admin.firestore();

const gmailUser = defineSecret("GMAIL_USER");
const gmailPass = defineSecret("GMAIL_PASS");
const recaptchaSecret = defineSecret("RECAPTCHA_SECRET");


exports.submitContact = onCall(async (request) => {
  const data = request.data;

  const docRef = await db.collection("contactSubmissions").add({
    ...data,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { success: true, id: docRef.id };
});


exports.submitJobApplication = onCall(
  { secrets: [gmailUser, gmailPass, recaptchaSecret] },
  async (request) => {
    const data = request.data;

    // Verify reCAPTCHA
    let captchaResult;
    try {
      const captchaCheck = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret.value()}&response=${data.captchaToken}`,
        { method: "POST" }
      );
      captchaResult = await captchaCheck.json();
    } catch (err) {
      logger.error("reCAPTCHA request failed:", err);
      throw new HttpsError("internal", "Could not verify reCAPTCHA. Please try again.");
    }

    if (!captchaResult.success) {
      throw new HttpsError("invalid-argument", "reCAPTCHA verification failed. Please try again.");
    }

    // Save application to Firestore
    let docRef;
    try {
      docRef = await db.collection("jobApplications").add({
        ...data,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    } catch (err) {
      logger.error("Firestore write failed:", err);
      throw new HttpsError("internal", "Failed to save your application. Please try again.");
    }

    // Send emails
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser.value(),
        pass: gmailPass.value(),
      },
    });

    try {
      await transporter.sendMail({
        from: "greenhousebrandworks123@gmail.com",
        to: "greenhousebrandworks123@gmail.com",
        subject: `New Application: ${data.jobTitle}`,
        html: `
          <h2>New Job Application</h2>
          <p><b>Name:</b> ${data.name}</p>
          <p><b>Email:</b> ${data.email}</p>
          <p><b>Phone:</b> ${data.phone}</p>
          <p><b>Role:</b> ${data.jobTitle}</p>
          <p><b>Resume:</b> <a href="${data.resumeURL}">View Resume</a></p>
          <p><b>Portfolio:</b> ${data.portfolio || "Not provided"}</p>
          <p><b>Message:</b><br/>${data.message}</p>
        `,
      });

      await transporter.sendMail({
        from: "greenhousebrandworks123@gmail.com",
        to: data.email,
        subject: "Application Received - Greenhouse Brandworks",
        html: `
          <h2>Hello ${data.name},</h2>
          <p>Thank you for applying for the <b>${data.jobTitle}</b> position.</p>
          <p>We have received your application successfully. Our team will review it and contact you if shortlisted.</p>
          <br/>
          <p>Regards,<br/>Greenhouse Brandworks Team</p>
        `,
      });
    } catch (err) {
      logger.error("Email sending failed:", { message: err.message, code: err.code, response: err.response });
      // Application is saved — don't fail the whole request over email
      // Return success but log the email failure for investigation
      return { success: true, id: docRef.id, emailSent: false };
    }

    return { success: true, id: docRef.id, emailSent: true };
  }
);
