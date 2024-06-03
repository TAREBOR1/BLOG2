// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "amenze-blog.firebaseapp.com",
  projectId: "amenze-blog",
  storageBucket: "amenze-blog.appspot.com",
  messagingSenderId: "699106492131",
  appId: "1:699106492131:web:413a438aa672c77154cfd6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);