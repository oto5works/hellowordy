/*-- init.js --*/
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Firestore를 사용하기 위해 불러옵니다.

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0961QpZqkQlchSbeAZ0dvywQh1my2hbE",
    authDomain: "ankitoki.firebaseapp.com",
    projectId: "ankitoki",
    storageBucket: "ankitoki.appspot.com",
    messagingSenderId: "873952892092",
    appId: "1:873952892092:web:e7c46b6b2846b05e126cb9",
    measurementId: "G-E19JLRGDNQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Firestore 인스턴스를 초기화합니다.

export default db; // Firestore 인스턴스를 내보냅니다.
