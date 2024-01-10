import { initializeApp, getApps } from "firebase/app";
import {
  Auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDigEeOQ5TyyUGUj05kK7SAZm6x_tKfZWc",
  authDomain: "rw-db-a2a96.firebaseapp.com",
  projectId: "rw-db-a2a96",
  storageBucket: "rw-db-a2a96.appspot.com",
  messagingSenderId: "879678598925",
  appId: "1:879678598925:web:81336e818f89d9869fca44",
  measurementId: "G-1NSK34P57Q",
};

import {
  collection,
  getFirestore,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  setDoc,
  arrayUnion,
  deleteDoc,
  writeBatch,
  CollectionReference,
} from "firebase/firestore";
// Initialize Firebase
const app = initializeApp(firebaseConfig);

let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
const db = getFirestore(app);
