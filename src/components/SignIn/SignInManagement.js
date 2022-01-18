import React, { useContext, useEffect } from "react";
import { useState } from "react/cjs/react.development";
import {
  fetchSignInMethodsForEmail,
  linkWithPopup,
  unlink,
  EmailAuthProvider,
  linkWithCredential,
} from "firebase/auth";
import * as Firebase from "../Firebase/firebase";
import AuthContext from "../contexts/AuthContext";
import SocialLoginToggle from "./SocialLoginToggle";
import DefaultLoginToggle from "./DefaultLoginToggle";

//  The purpose of this component is:
// You can allow users to sign in to your app using multiple authentication providers by linking auth provider credentials to an existing user account. Users are identifiable by the same Firebase user ID regardless of the authentication provider they used to sign in. For example, a user who signed in with a password can link a Google account and sign in with either method in the future. Or, an anonymous user can link a Facebook account and then, later, sign in with Facebook to continue using your app.

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

  const onDefaultLoginLink = async (password) => {
    try {
      const credential = await EmailAuthProvider.credential(auth.currentUser.email, password);
      await linkWithCredential(auth.currentUser, credential);
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
              {signInMethod.id === "password" ? (
                <DefaultLoginToggle
                  isEnabled={isEnabled}
                  onlyOneLeft={onlyOneLeft}
                  signInMethod={signInMethod}
                  onLink={onDefaultLoginLink}
                  onUnlink={onUnlink}
                />
              ) : (
                <SocialLoginToggle
                  isEnabled={isEnabled}
                  onlyOneLeft={onlyOneLeft}
                  signInMethod={signInMethod}
                  onLink={onSocialLoginLink}
                  onUnlink={onUnlink}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SignInManagement;
