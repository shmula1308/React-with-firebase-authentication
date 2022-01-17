// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Importing firebase services. Each firebase service followes a similar pattern
// Import service from its path. Import service getter function. Each subpackage has a getter function, But you must initialize your firebase app first before calling any service getter function.

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig); // firebase instance that stores the firbase configuarion. This instance knows how to connect to your specific firebase backend
export const auth = getAuth(firebaseApp); // username and passwort authentication
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const twitterProvider = new TwitterAuthProvider();
export const db = getDatabase(firebaseApp); // To read or write data from the database, you need an instance of firebase.database.Reference

// Learn about security rules and app check
// here --> https://firebase.google.com/docs/rules
// and here --> https://firebase.google.com/docs/app-check/web/recaptcha-provider

//Each getter function can OPTIONALLY take the the firebase app as a parameter, which you should pass in to be explicit
// Now you can import individual functions from different subpackages. They take firebase service returned from the getter function as the first parameter(or some relevant container object) and callback function  as second parameter
// This is the pattern that firebase followes for each subpackage

// const auth = getAuth(firebaseApp);
// const db = getFirestore(firebaseApp);
// const carsCollection = collection(db, "Cars"); //this is how we create a collection in the firestore (which is a firebase database)
// const snapshot = await getDocs(carsCollection); // if we want to get the documents inside the collection we import getDocs and pass in the collection as the first parameter. It returns a promise, therefore we use await
// // they are not methods on the service itself --> db.collection('Cars').getDocs()  because GOOGLE Engineeres!!! Tree shaking monkeys
// onAuthStateChanged(auth, (user) => {
//   if (user !== null) {
//     console.log("logged in");
//   } else {
//     console.log("no user");
//   }
// });
