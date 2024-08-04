/*-- init.js --*/
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Firestore를 사용하기 위해 불러옵니다.
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Storage를 사용하기 위해 불러옵니다.

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBL2ocTE6GkRA104qZBICH4WpPrlRzOP8c",
    authDomain: "hello-wordy.firebaseapp.com",
    projectId: "hello-wordy",
    storageBucket: "hello-wordy.appspot.com",
    messagingSenderId: "192483386403",
    appId: "1:192483386403:web:349d76e2719009ca71bd96",
    measurementId: "G-V0CKTG6HCM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Firestore 인스턴스를 초기화합니다.
const auth = getAuth(app);
const storage = getStorage(app); // Storage 인스턴스를 초기화합니다.

export { db, auth, storage };
