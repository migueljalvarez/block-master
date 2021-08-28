import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAus1mXT3gX4x0A_WrQWSUusWQzss5a0ms",
  authDomain: "block-master-6dfc7.firebaseapp.com",
  projectId: "block-master-6dfc7",
  storageBucket: "block-master-6dfc7.appspot.com",
  messagingSenderId: "391311679759",
  appId: "1:391311679759:web:688e2f5ebe7e8207ac5e7a",
  measurementId: "G-18TJ0GJNHL",
};

firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const google = new firebase.auth.GoogleAuthProvider();
const facebook = new firebase.auth.FacebookAuthProvider();

export { db, google, facebook, firebase };
