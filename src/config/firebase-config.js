// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyD7qF8X747EGTueQ9LZ5-dCRl_f9PgETEs",
  authDomain: "task-management-applicat-a08fa.firebaseapp.com",
  projectId: "task-management-applicat-a08fa",
  storageBucket: "task-management-applicat-a08fa.appspot.com",
  messagingSenderId: "496181720225",
  appId: "1:496181720225:web:2b20a69b30df01d82dece0",
  measurementId: "G-SMBJCGLNWW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getDatabase(app)