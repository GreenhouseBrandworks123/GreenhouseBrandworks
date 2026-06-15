const { onCall } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

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

  const docRef = await db.collection("jobApplications").add({
    ...data,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return {
    success: true,
    id: docRef.id,
  };
});
