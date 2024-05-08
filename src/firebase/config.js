import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCLemJwrdPUK1pBehx2tmg9CJ7H9qgdZ-o",
    authDomain: "fir-b26a6.firebaseapp.com",
    projectId: "fir-b26a6",
    storageBucket: "fir-b26a6.appspot.com",
    messagingSenderId: "1012391540670",
    appId: "1:1012391540670:web:4de20ddba2f9b18ff66bef",
    measurementId: "G-Q1TD2X03L4"
  };

  export default firebase.initializeApp(firebaseConfig)