import firebase from "firebase/app"
import "firebase/storage"

// Initialize Firebase
var config = {
    apiKey: "***REMOVED***",
    authDomain: "siena-baby-book.firebaseapp.com",
    databaseURL: "https://siena-baby-book.firebaseio.com",
    projectId: "siena-baby-book",
    storageBucket: "siena-baby-book.appspot.com",
    messagingSenderId: "22477900499"
  };
  firebase.initializeApp(config);

  const storage = firebase.storage()

  export {
      storage, firebase as default
  }