import React, { useState, useEffect } from "react";
import { firebaseApp } from "../Firebase/firebase";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  sendEmailVerification,
} from "firebase/auth";

const AuthContext = React.createContext({});

export const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();

  const signUp = (auth, email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (auth, email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        console.log(`You have logged in as ${user.email}`);
      } else {
        console.log("You have logged out");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signUp,
        signIn,
        signOut: signOut,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
