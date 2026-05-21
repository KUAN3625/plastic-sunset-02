// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANpVgO3xVfkiI879XC91zSXBmic5CBvno",
  authDomain: "sunset-68587.firebaseapp.com",
  projectId: "sunset-68587",
  storageBucket: "sunset-68587.firebasestorage.app",
  messagingSenderId: "747027591169",
  appId: "1:747027591169:web:736fcbdbda1852db8bd000",
  measurementId: "G-91C4SEQ0HL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);