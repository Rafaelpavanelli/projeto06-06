// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAnVdRAjT6EurEZzszLlLgw_37iDQ_95eI",
  authDomain: "todolistluiz.firebaseapp.com",
  projectId: "todolistluiz",
  storageBucket: "todolistluiz.appspot.com",
  messagingSenderId: "531309883288",
  appId: "1:531309883288:web:85e15ed2cd83be9f0e45ed",
  measurementId: "G-R1EHP7HYXR"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db = getFirestore(app);
export{app,auth,db};