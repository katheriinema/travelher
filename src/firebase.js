// firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCHmkdu42io7XDi1g3Gks7JZWgJSJxGsQI",
    authDomain: "travelher-18c3a.firebaseapp.com",
    projectId: "travelher-18c3a",
    storageBucket: "travelher-18c3a.firebasestorage.app",
    messagingSenderId: "1093833754401",
    appId: "1:1093833754401:web:fb5f15f1e218f5799a2060",
    measurementId: "G-124J3JZD6S"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Export authentication and Google provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
