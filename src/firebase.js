// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// import { collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkmHMkuCF8THXdTNOgnIv5VX25S0_YLiQ",
  authDomain: "quick-chat-7c8f3.firebaseapp.com",
  projectId: "quick-chat-7c8f3",
  storageBucket: "quick-chat-7c8f3.appspot.com",
  messagingSenderId: "120140880390",
  appId: "1:120140880390:web:197432db15c16633cac187",
  measurementId: "G-4CEHCR4VG2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const fireStore = getFirestore(app)
//  async function getPosts(db) {
//   const postsCol = collection(db, 'posts');
//   const postsSnapshot = await getDocs(postsCol);
//   const postsList = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//   return postsList;
// }


const authentification = getAuth(app)

export {authentification,fireStore};
