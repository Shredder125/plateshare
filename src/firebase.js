// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpv8X4acXEZSihbk5LHuEGlB3NNZz0tCw",
  authDomain: "plateshare-8f801.firebaseapp.com",
  projectId: "plateshare-8f801",
  storageBucket: "plateshare-8f801.firebasestorage.app",
  messagingSenderId: "862254191872",
  appId: "1:862254191872:web:4f788a503fd5c0d62acfe5"
};

const app = initializeApp(firebaseConfig);

// Firebase Auth
export const auth = getAuth(app);

// Google Provider for Google Sign-In
export const provider = new GoogleAuthProvider();
