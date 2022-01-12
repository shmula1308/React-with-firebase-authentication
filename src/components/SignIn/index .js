import React, { useRef, useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { firebaseApp } from "../Firebase/firebase";
import { getAuth } from "firebase/auth";

const SignInPage = () => {
  const authCtx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (ev) => {
    ev.preventDefault();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    if (password.length < 6) {
      return setError("Password needs to be 6 characters or longer");
    }
    try {
      setError("");
      setLoading(true);

      const auth = getAuth(firebaseApp);

      const userCredentials = await authCtx.signUp(auth, email, password);
      //console.log("currentUser signed in", authCtx.currentUser);
      console.log("userCredentials", userCredentials);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email already in use");
      } else {
        setError("Unable to login");
      }
    }
    setLoading(false);
  };

  const logoutHandler = () => {
    const auth = getAuth(firebaseApp);
    authCtx.signOut(auth);
  };
  return (
    <div>
      <h1>SignIn1</h1>
      <div>{authCtx.currentUser && authCtx.currentUser.email}</div>
      {/* When we refresh our page authCtx.currentUser === null. Firebase set localstorage for you, sets tokens to verify if you have a user already signed in. But we have an initial loading state until onAuthStateChanged runs and set the current user*/}
      {error && <div>{error}</div>}
      <form onSubmit={onSubmitHandler}>
        <label htmlFor='email'>Email</label>
        <input ref={emailRef} type='text' name='email' placeholder='email' required />
        <label htmlFor='password'>Password</label>
        <input ref={passwordRef} type='password' name='password' placeholder='password' required />
        <button disabled={loading} type='submit'>
          Sig Up
        </button>
      </form>
      <button type='submit' onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
};

export default SignInPage;
