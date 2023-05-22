// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWaJO32FddoKmCwckeS41OnqT501by4B0",
  authDomain: "gujicofeetasktracker.firebaseapp.com",
  projectId: "gujicofeetasktracker",
  storageBucket: "gujicofeetasktracker.appspot.com",
  messagingSenderId: "1094643826540",
  appId: "1:1094643826540:web:03eb68f77b07f4e5727d49",
  measurementId: "G-S5S8WDB372"
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(initializeApp(firebaseConfig));

export const db = getFirestore()