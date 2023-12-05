// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCwNAaeMxAWGsg2AeOFz9U8QDGSfS3OuVY",
    authDomain: "drivesave-69420.firebaseapp.com",
    projectId: "drivesave-69420",
    storageBucket: "drivesave-69420.appspot.com",
    messagingSenderId: "1019387797693",
    appId: "1:1019387797693:web:dd3358a3c87bf59259d7d4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, app, auth };
