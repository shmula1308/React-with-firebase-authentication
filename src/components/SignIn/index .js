import React, { useRef, useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { firebaseApp } from "../Firebase/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignInPage = () => {
  const auth = useContext(AuthContext);
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
      const userCredentials = await auth.signUp(email, password);
      console.log(userCredentials);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        return setError("Email already in use");
      }
      setError("Unable to login");
    }
    setLoading(false);
    console.log(auth.currentUser.email);
  };
  return (
    <div>
      <h1>SignIn1</h1>
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
    </div>
  );
};

export default SignInPage;
