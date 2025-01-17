import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCUaQIV4_ZQsnReSZT4qfjn6btUDAw-GoI",
  authDomain: "challengers-66645.firebaseapp.com",
  projectId: "challengers-66645",
  storageBucket: "challengers-66645.firebasestorage.app",
  messagingSenderId: "202449545843",
  appId: "1:202449545843:web:b02596feba5560c89b1806",
  measurementId: "G-P315CS7PTG",
 };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);