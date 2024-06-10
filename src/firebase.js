// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNIfOspWQE82DRqL3uRcTR8QwH6PR2C0Y",
  authDomain: "loa-scheduler.firebaseapp.com",
  projectId: "loa-scheduler",
  storageBucket: "loa-scheduler.appspot.com",
  messagingSenderId: "39926211116",
  appId: "1:39926211116:web:0e3d18fc3de97915022789",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
