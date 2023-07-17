// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// raletime database
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyAzSunP3NDM5pK7XzUJvKWwxtCmQ0H-wrM",
  authDomain: "glumechat-4fe6f.firebaseapp.com",
  projectId: "glumechat-4fe6f",
  storageBucket: "glumechat-4fe6f.appspot.com",
  messagingSenderId: "667019655381",
  appId: "1:667019655381:web:9b70c05a172468e8f04a5c",
  measurementId: "G-MQGQ3DKD5G",
  databaseURL: "https://glumechat-4fe6f-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const database = getDatabase(app);

// admin

