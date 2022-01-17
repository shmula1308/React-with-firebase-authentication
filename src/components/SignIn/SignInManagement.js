import React, { useContext, useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { fetchSignInMethodsForEmail, linkWithPopup, unlink } from "firebase/auth";
import * as Firebase from "../Firebase/firebase";
import AuthContext from "../contexts/AuthContext";

const SIGN_IN_METHODS = [
  {
    id: "password",
    provider: null,
  },
  {
    id: "google.com",
    provider: "googleProvider",
  },
  {
    id: "facebook.com",
    provider: "facebookProvider",
  },
  {
    id: "twitter.com",
    provider: "twitterProvider",
  },
];
const SignInManagement = (props) => {
  const [activeSignInMethods, setActiveSignInMethods] = useState([]);
  const authCtx = useContext(AuthContext);

  const { auth } = Firebase;

  useEffect(() => {
    getSignInMethodsForAuthUser();
  }, []);

  const getSignInMethodsForAuthUser = async () => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, authCtx.currentUser.email);
      setActiveSignInMethods(signInMethods);
    } catch (error) {
      console.log(error);
    }
  };

  const onUnlink = async (providerid) => {
    try {
      await unlink(auth.currentUser, providerid);
      getSignInMethodsForAuthUser();
    } catch (error) {
      console.log(error);
    }
  };

  const onSocialLoginLink = async (provider) => {
    try {
      const user = await linkWithPopup(auth.currentUser, Firebase[provider]);
      getSignInMethodsForAuthUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      Sign In Methods:
      <ul>
        {SIGN_IN_METHODS.map((signInMethod) => {
          const isEnabled = activeSignInMethods.includes(signInMethod.id);
          const onlyOneLeft = activeSignInMethods.length === 1;
          return (
            <li key={signInMethod.id}>
              {isEnabled ? (
                <button
                  disabled={onlyOneLeft}
                  onClick={() => {
                    onUnlink(signInMethod.id);
                  }}>
                  Deactivate {signInMethod.id}
                </button>
              ) : (
                <button type='button' onClick={() => onSocialLoginLink(signInMethod.provider)}>
                  {signInMethod.id}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SignInManagement;
