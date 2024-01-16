// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPkPl7HolBtyYi4TRSuYd1_2jJTGCnOvc",
  authDomain: "social-media-app-bacc4.firebaseapp.com",
  projectId: "social-media-app-bacc4",
  storageBucket: "social-media-app-bacc4.appspot.com",
  messagingSenderId: "826090750204",
  appId: "1:826090750204:web:cf6f0781d699ea2ead5779",
  measurementId: "G-6MK2PHXKMS"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
//const analytics = getAnalytics(FIREBASE_APP);