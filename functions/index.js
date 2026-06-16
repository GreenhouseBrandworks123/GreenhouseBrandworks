const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

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
    try {
      const data = request.data;
      console.log("submitJobApplication started", { jobTitle: data.jobTitle, email: data.email });

      // Verify reCAPTCHA using Node 24 built-in fetch
      let captchaResult;
      try {
        const captchaRes = await fetch(
          `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret.value()}&response=${data.captchaToken}`,
          { method: "POST" }
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

      // Save to Firestore
      let docRef;
      try {
        docRef = await db.collection("jobApplications").add({
          ...data,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        console.log("Saved to Firestore:", docRef.id);
      } catch (err) {
        console.error("Firestore write failed:", err.message);
        throw new HttpsError("internal", "Failed to save your application. Please try again.");
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

        console.log("Emails sent successfully");
        return { success: true, id: docRef.id, emailSent: true };
      } catch (err) {
        console.error("Email failed:", err.message, err.code);
        return { success: true, id: docRef.id, emailSent: false };
      }

    } catch (err) {
      if (err instanceof HttpsError) throw err;
      console.error("Unhandled error in submitJobApplication:", err.message, err.stack);
      throw new HttpsError("internal", "An unexpected error occurred. Please try again.");
    }
  }
);
