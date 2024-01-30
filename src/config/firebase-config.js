// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAVuYImhgSrfNDDvz-nB64wD0sAnzWyt48",
  authDomain: "task-17396.firebaseapp.com",
  databaseURL: "https://task-17396-default-rtdb.firebaseio.com",
  projectId: "task-17396",
  storageBucket: "task-17396.appspot.com",
  messagingSenderId: "972445921070",
  appId: "1:972445921070:web:2414d368adeccfafe054bf",
  measurementId: "G-M5EZ7R4097"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getDatabase();
// export const datab = database()