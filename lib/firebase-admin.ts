import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function getFirebaseCredentials() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    return null;
  }

  return { projectId, clientEmail, privateKey };
}

export function isFirebaseConfigured() {
  return getFirebaseCredentials() !== null;
}

export function getFirebaseDb() {
  const credentials = getFirebaseCredentials();

  if (!credentials) {
    throw new Error(
      "Firebase is not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY."
    );
  }

  const app =
    getApps()[0] ??
    initializeApp({
      credential: cert(credentials)
    });

  return getFirestore(app);
}

export async function isDoctorToken(token: string) {
  const credentials = getFirebaseCredentials();
  const doctorEmail = process.env.DOCTOR_EMAIL?.toLowerCase();

  if (!credentials || !doctorEmail) {
    throw new Error("Firebase authentication is not configured. Set DOCTOR_EMAIL with the Firebase Admin credentials.");
  }

  const app =
    getApps()[0] ??
    initializeApp({
      credential: cert(credentials)
    });
  const decodedToken = await getAuth(app).verifyIdToken(token);

  return decodedToken.email?.toLowerCase() === doctorEmail;
}
