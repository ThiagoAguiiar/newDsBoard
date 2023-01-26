import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGKqET0xZlYfmssJWCUDL8DXsvqZH9g34",
  authDomain: "dsboard-4ff5e.firebaseapp.com",
  projectId: "dsboard-4ff5e",
  storageBucket: "dsboard-4ff5e.appspot.com",
  messagingSenderId: "784729008760",
  appId: "1:784729008760:web:5b955ba9a9dbd5a58cdb8d",
  measurementId: "G-78QKJ1RNQ7",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
