// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSIM2xwqvg3tpv6_Zsb6JUXYcOCdWZ1XQ",
  authDomain: "whatsapp-clone-808d4.firebaseapp.com",
  projectId: "whatsapp-clone-808d4",
  storageBucket: "whatsapp-clone-808d4.appspot.com",
  messagingSenderId: "369257529000",
  appId: "1:369257529000:web:e6c49da669b91df3e90c9d",
  measurementId: "G-MSD1Q5DE0X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
