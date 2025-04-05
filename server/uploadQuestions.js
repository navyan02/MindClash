require("dotenv").config();
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// Load service account key from FIREBASE_CONFIG env
const serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  

const db = admin.firestore();

// Load the question bank
const questionsPath = path.join(__dirname, "data", "questionBank.json");
const questions = JSON.parse(fs.readFileSync(questionsPath, "utf-8"));

// Upload questions to Firestore
async function uploadQuestions() {
  const batch = db.batch();

  questions.forEach((question, index) => {
    const docRef = db.collection("questions").doc(`q${index + 1}`);
    batch.set(docRef, question);
  });

  try {
    await batch.commit();
    console.log("Successfully uploaded all questions!");
  } catch (err) {
    console.error("Failed to upload questions:", err);
  }
}

uploadQuestions();
