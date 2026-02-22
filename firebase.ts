
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA-JkUbCJgy1k5mAWfb571EL3kOad_wbPA",
    authDomain: "privacy-policy-37461.firebaseapp.com",
    projectId: "privacy-policy-37461",
    storageBucket: "privacy-policy-37461.firebasestorage.app",
    messagingSenderId: "424686060",
    appId: "1:424686060:web:1e626bceeab712d07990c9",
    measurementId: "G-Z652RK93VV"

};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
