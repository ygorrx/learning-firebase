import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD8lnkmVY4B-5HNxyt6HsNoFvzHSMMuS-4",
    authDomain: "learning-firebase-84fb0.firebaseapp.com",
    projectId: "learning-firebase-84fb0",
    storageBucket: "learning-firebase-84fb0.appspot.com",
    messagingSenderId: "420804775613",
    appId: "1:420804775613:web:6efdb723e63511853df1d4"
  };

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };