// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getFirebase} from "firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMtWGxu51nKGPNDjJXexllEW8NyUnBQcA",
  authDomain: "mymntraproject.firebaseapp.com",
  projectId: "mymntraproject",
  storageBucket: "mymntraproject.appspot.com",
  messagingSenderId: "497254596585",
  appId: "1:497254596585:web:36c8d931a46f824e455578"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth (app);

export {fireDB,auth}