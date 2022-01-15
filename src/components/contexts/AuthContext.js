import React, { useState, useEffect } from "react";
import { auth } from "../Firebase/firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  sendEmailVerification,
} from "firebase/auth";

const AuthContext = React.createContext({
  currentUser: null,
  signUp: () => {},
  signIn: () => {},
  signOut: () => {},
  resetPassword: () => {},
  updatePass: () => {},
});

export const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);

  const signUp = (auth, email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (auth, email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = (auth, email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updatePass = (user, password) => {
    return updatePassword(user, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        console.log(`You have logged in as ${user.email}`);
      } else {
        setCurrentUser(null);
        console.log("You have logged out");
      }
    });
    return unsubscribe; // this is a method that we call in order to remove the listener onAuthStateChanged after it runs, so that we can attach a new listener
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updatePass,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
