import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2l-pFG7S9NEC16U3GdCS62eQ2OxtQYU8",
  authDomain: "detflex-23384.firebaseapp.com",
  projectId: "detflex-23384",
  storageBucket: "detflex-23384.appspot.com",
  messagingSenderId: "655919905516",
  appId: "1:655919905516:web:f67d53c8cde5f22fb543c9",
  measurementId: "G-ZTZNNXF7JY",
};

initializeApp(firebaseConfig);
export const authService = getAuth();
export const dbService = getFirestore();
