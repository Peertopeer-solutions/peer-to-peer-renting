import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";
import {getFunctions} from 'firebase/functions'

export const firebaseConfig = {
<<<<<<< HEAD
  apiKey: "AIzaSyByBWbpNlNbLlg5BrbzJc-DQ5pd_S-0IB8",
  authDomain:  "awesome-renting.firebaseapp.com",
  projectId:  "awesome-renting",
=======
  apiKey:  process.env.REACT_FIREBASE_API_KEY,
  authDomain:   import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || process.env.RECT_FIREBASE_AUTH_DOMAIN,
  projectId:  import.meta.env.VITE_FIREBASE_PROJECT_ID || process.env.REACT_FIREBASE_PROJECT_ID,
>>>>>>> 34679ecf037dbaaf1e5d443181f983b195fb964e
  storageBucket: "awesome-renting.appspot.com",
  messagingSenderId: "702713068942",
  appId: "1:702713068942:web:6620f924cf541a261238df"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app) 
export const messaging = getMessaging(app);
export const functions = getFunctions(app);
