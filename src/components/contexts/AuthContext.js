import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, facebookProvider, twitterProvider } from "../Firebase/firebase";
import { VERIFY_EMAIL } from "../../constants/routes";
import DBContext from "./DBContext";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  deleteUser,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { onValue } from "firebase/database";

const AuthContext = React.createContext({
  currentUser: null,
  signUp: () => {},
  signIn: () => {},
  signOut: () => {},
  resetPassword: () => {},
  updatePass: () => {},
  deleteAccount: () => {},
  askUserToSignInAgain: () => {},
  signInWithGoogle: () => {},
  signInWithFacebook: () => {},
  signInWithTwitter: () => {},
  verifyUsersEmail: () => {},
});

export const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("authUser")));
  const databaseCtx = useContext(DBContext);

  const navigate = useNavigate();

  const signUp = (auth, email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const verifyUsersEmail = () => {
    return sendEmailVerification(auth.currentUser, {
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });
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

  const deleteAccount = (user) => {
    return deleteUser(user);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const signInWithFacebook = () => {
    return signInWithPopup(auth, facebookProvider);
  };
  const signInWithTwitter = () => {
    return signInWithPopup(auth, twitterProvider);
  };

  const askUserToSignInAgain = () => {
    alert("Please sign out and then sign in again for security purposes!");
  };
  // Some security-sensitive actions—such as deleting an account, setting a primary email address, and changing a password—require that the user has recently signed in. If you perform one of these actions, and the user signed in too long ago, the action fails with an error. When this happens, re-authenticate the user by getting new sign-in credentials from the user and passing the credentials to reauthenticateWithCredential

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        console.log(authUser);
        if (!authUser.emailVerified && authUser.providerData[0].providerId !== "facebook.com") {
          signOut(auth);
          alert("Please verify your email");
          return navigate(VERIFY_EMAIL);
        }
        const dbUserRef = databaseCtx.getSingleUser(authUser.uid);
        onValue(dbUserRef, (snapshot) => {
          const dbUser = snapshot.val();

          if (!dbUser.roles) {
            dbUser.roles = {};
          }
          authUser = {
            uid: authUser.uid,
            emailVerified: authUser.emailVerified,
            providerData: authUser.providerData,
            providerId: authUser.providerData[0].providerId,
            ...dbUser,
          };

          localStorage.setItem("authUser", JSON.stringify(authUser)); // this is to prevent flickering.
          setCurrentUser(authUser);
          console.log(`You have been signed in as ${authUser.username}`);
        });
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
        deleteAccount,
        askUserToSignInAgain,
        signInWithGoogle,
        signInWithFacebook,
        signInWithTwitter,
        verifyUsersEmail,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
