import React, { useState, useEffect } from "react";
import { firebaseApp } from "../Firebase/firebase";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";

const AuthContext = React.createContext({});

export const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const auth = getAuth(firebaseApp);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signUp,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
