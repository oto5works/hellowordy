/*-- init.js --*/
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Firestore를 사용하기 위해 불러옵니다.

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBjkicMXAV8l-G7Y2nXS1USIZRo_xqHOAU",
    authDomain: "ankitokidb.firebaseapp.com",
    projectId: "ankitokidb",
    storageBucket: "ankitokidb.appspot.com",
    messagingSenderId: "472753733214",
    appId: "1:472753733214:web:99725918e803fe8372fecf",
    measurementId: "G-GJRTWGCDYN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Firestore 인스턴스를 초기화합니다.

export default db; // Firestore 인스턴스를 내보냅니다.
