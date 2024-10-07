// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt1scIzPa-BsjSpdkTbm-JJeedTw4t2GI",
  authDomain: "ecg-classification-148c2.firebaseapp.com",
  projectId: "ecg-classification-148c2",
  storageBucket: "ecg-classification-148c2.appspot.com",
  messagingSenderId: "456499086876",
  appId: "1:456499086876:web:7f6da6faa8ccf8700401d9",
  measurementId: "G-4VQTWD2931",
  databaseURL: "https://ecg-classification-148c2-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Get the database instance

export { db }; // Export the database instance