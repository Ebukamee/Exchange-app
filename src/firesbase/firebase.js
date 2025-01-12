// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage'
import {  getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuumsXbq3QOGBkVscAGqgahwxBpeK0_xs",
  authDomain: "exchange-app-229a6.firebaseapp.com",
  projectId: "exchange-app-229a6",
  storageBucket: "exchange-app-229a6.firebasestorage.app",
  messagingSenderId: "895784379644",
  appId: "1:895784379644:web:bfd48c5d701473c1a3e379",
  measurementId: "G-WQS0SBBSGT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
console.log(auth)
export const db = getFirestore();
export const storage = getStorage();