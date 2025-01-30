import { initializeApp, getApps } from "firebase/app";
import {
  Auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.auth,
  projectId: process.env.projectId,
  storageBucket: process.env.storage,
  messagingSenderId: process.env.messageingid,
  appId: process.env.apiId,
  measurementId: process.env.measurementid,
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
