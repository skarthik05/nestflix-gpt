// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB62IzNtGFRZ83WFMEAZ41c7mqrrHe8JG8",
  authDomain: "netflixgpt-1357a.firebaseapp.com",
  projectId: "netflixgpt-1357a",
  storageBucket: "netflixgpt-1357a.firebasestorage.app",
  messagingSenderId: "367674248510",
  appId: "1:367674248510:web:589c29e144a4602551706f",
  measurementId: "G-Z6M680X4PT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()