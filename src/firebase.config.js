import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyCEaLiRKPJMkB6MPhq6r42KTQiD1puNEbs",
  authDomain: "awesome-renting.firebaseapp.com",
  projectId: "awesome-renting",
  storageBucket: "awesome-renting.appspot.com",
  messagingSenderId: "702713068942",
  appId: "1:702713068942:web:6620f924cf541a261238df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app) 
export const messaging = getMessaging(app);