require("dotenv").config();

const { onCall } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const fetch = require("node-fetch");
admin.initializeApp();

const db = admin.firestore();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});


exports.submitContact = onCall(async (request) => {
  const data = request.data;

  const docRef = await db.collection("contactSubmissions").add({
    ...data,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return {
    success: true,
    id: docRef.id,
  };
});


exports.submitJobApplication = onCall(async (request) => {
  const data = request.data;


  const captchaCheck = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${data.captchaToken}`,
    {
      method: "POST",
    }
  );

  const captchaResult = await captchaCheck.json();

  if (!captchaResult.success) {
    throw new Error("Captcha verification failed");
  }

  const docRef = await db.collection("jobApplications").add({
    ...data,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
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

      <p>
      <b>Resume:</b>
      <a href="${data.resumeURL}">
      View Resume
      </a>
      </p>

      <p>
      <b>Portfolio:</b>
      ${data.portfolio || "Not provided"}
      </p>

      <p>
      <b>Message:</b><br/>
      ${data.message}
      </p>
    `,
  });
  // 2. Send confirmation to applicant
await transporter.sendMail({
  from: "greenhousebrandworks123@gmail.com",
  to: data.email,

  subject: "Application Received - Greenhouse Brandworks",

  html: `
    <h2>Hello ${data.name},</h2>

    <p>
    Thank you for applying for the 
    <b>${data.jobTitle}</b> position.
    </p>

    <p>
    We have received your application successfully.
    Our team will review it and contact you if shortlisted.
    </p>

    <br/>

    <p>
    Regards,<br/>
    Greenhouse Brandworks Team
    </p>
  `,
});


  return {
    success: true,
    id: docRef.id,
  };
});