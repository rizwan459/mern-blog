// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-a45bd.firebaseapp.com",
  projectId: "mern-blog-a45bd",
  storageBucket: "mern-blog-a45bd.firebasestorage.app",
  messagingSenderId: "350004451992",
  appId: "1:350004451992:web:28b7691c9eebc0902b4eed"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

