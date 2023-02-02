import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCkk6pdN8ov2zEn9rKOE3gYDJZvbr8k4WQ",
  authDomain: "dsboard-task-manager.firebaseapp.com",
  projectId: "dsboard-task-manager",
  storageBucket: "dsboard-task-manager.appspot.com",
  messagingSenderId: "1066431990239",
  appId: "1:1066431990239:web:dbe7b2aa3f328d3a911c6a",
  measurementId: "G-Y73EDE98L1",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
