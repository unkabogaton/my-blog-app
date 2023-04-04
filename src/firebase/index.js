import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmnpz4eyj0oDaMDlJDULbY8JYHAnGgKxM",
  authDomain: "libhub-d0824.firebaseapp.com",
  projectId: "libhub-d0824",
  storageBucket: "libhub-d0824.appspot.com",
  messagingSenderId: "885721062394",
  appId: "1:885721062394:web:f7ce7e82832829e764a243",
  measurementId: "G-HFVPQZZQMK"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();
