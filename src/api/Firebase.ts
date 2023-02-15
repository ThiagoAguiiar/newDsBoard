import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBAOiyDpjqxtcZQINV6h1HnKi3LruAsKtc",
  authDomain: "dsboard-4da67.firebaseapp.com",
  projectId: "dsboard-4da67",
  storageBucket: "dsboard-4da67.appspot.com",
  messagingSenderId: "757019631397",
  appId: "1:757019631397:web:93e2a173787eafe3ee04cc",
  measurementId: "G-1NF12Z0ZQB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
