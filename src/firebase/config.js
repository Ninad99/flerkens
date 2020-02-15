import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAVpK4N2KexNlBCBELVThfI-fI0PYsrjNg",
  authDomain: "flerkens.firebaseapp.com",
  databaseURL: "https://flerkens.firebaseio.com",
  projectId: "flerkens",
  storageBucket: "flerkens.appspot.com",
  messagingSenderId: "901402747646",
  appId: "1:901402747646:web:851e57971a3f350b577baf",
  measurementId: "G-CR7W31YN03"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export default firebase;