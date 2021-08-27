// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBbhi_hCEqedAMezxHn8pZfESqLE0HT4IE",
    authDomain: "linkedin-clone-moise.firebaseapp.com",
    projectId: "linkedin-clone-moise",
    storageBucket: "linkedin-clone-moise.appspot.com",
    messagingSenderId: "470787678509",
    appId: "1:470787678509:web:3750a69aa0ab4b504673a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, provider, storage };
export default db;