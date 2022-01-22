import React, { useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import DBContext from "../contexts/DBContext";
import { auth } from "../Firebase/firebase";
import {} from "firebase/auth";

import { SIGN_IN } from "../../constants/routes";

//  Find a better way to disable button and handle errors so it doesnt cause an error. Try the useEffect as suggested
const PasswordForgetPage = () => {
  const authCtx = useContext(AuthContext);
  const databaseCtx = useContext(DBContext);
  const emailRef = useRef();

  const navigate = useNavigate();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (ev) => {
    ev.preventDefault();
    const email = emailRef.current.value.trim();

    try {
      setError("");
      setLoading(true);
      console.log(auth);
      await authCtx.resetPassword(auth, email);
      await authCtx.signOut(auth);
      setLoading(false);
      navigate(SIGN_IN, { replace: true });
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("User not found!");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email");
      } else {
        setError("Unable to reset password");
      }
      setLoading(false);
    }
  };

  const deleteAccountHandler = async () => {
    try {
      authCtx.deleteAccount(auth.currentUser);
      databaseCtx.deleteUser(auth.currentUser.uid);
      console.log(`User deleted ${auth.currentUser.email}`);
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        authCtx.askUserToSignInAgain(); // this is  the easy way out alternatively const credential = promptForCredentials() and once they do run: ALSO dont forget to cleanup the local storage once they delete their account
        // reauthenticateWithCredential(user, credential).then(() => {
        //   // User re-authenticated.
        // }).catch((error) => {
        //   // An error ocurred
        //   // ...
        // });
        // then they can delete their account
      }
    }
  };

  return (
    <div>
      <h1>Reset Your Password</h1>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor='email'>Email</label>
        <input ref={emailRef} type='text' name='email' placeholder='Email Address' required />
        <button disabled={loading} type='submit'>
          Reset My Password
        </button>
        {error && <div>{error}</div>}
      </form>
      <button type='button' onClick={deleteAccountHandler}>
        Delete my account
      </button>
    </div>
  );
};

export default PasswordForgetPage;
