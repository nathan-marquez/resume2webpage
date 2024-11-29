import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvYOXm6DtBL404KkP6_TPYs-PqzQ9_xYc",
  authDomain: "resume2webpage.firebaseapp.com",
  projectId: "resume2webpage",
  storageBucket: "resume2webpage.firebasestorage.app",
  messagingSenderId: "932464344942",
  appId: "1:932464344942:web:e5ed8b50260edd149c4b7f",
  measurementId: "G-Z50CTWYFTQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export default app;
