import firebase from "firebase/app"
import "firebase/storage"

const {FIREBASE_API_KEY, MESSAGING_SENDER_ID} = process.env

// Initialize Firebase
const config = {
    apiKey: FIREBASE_API_KEY,
    authDomain: "siena-baby-book.firebaseapp.com",
    databaseURL: "https://siena-baby-book.firebaseio.com",
    projectId: "siena-baby-book",
    storageBucket: "siena-baby-book.appspot.com",
    messagingSenderId: MESSAGING_SENDER_ID
};
  firebase.initializeApp(config);

  const storage = firebase.storage()

  export {
      storage, firebase as default
  }