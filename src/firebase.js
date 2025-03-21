// Import Firebase core and services
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; 

// Firebase configuration (verify this from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyDO4nMX84JEvCsbgFnpU23NMn4pxh9iu1U",
  authDomain: "exam-generator-a6b92.firebaseapp.com",
  databaseURL: "https://exam-generator-a6b92-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "exam-generator-a6b92",
  storageBucket: "exam-generator-a6b92.firebasestorage.app",
  messagingSenderId: "538782935381",
  appId: "1:538782935381:web:6def0483d2c827f6b727dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };