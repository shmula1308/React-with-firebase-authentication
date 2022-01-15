import React, { useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import DBContext from "../contexts/DBContext";
import { auth } from "../Firebase/firebase";

import { HOME } from "../../constants/routes";

const SignUpPage = () => {
  const authCtx = useContext(AuthContext);
  const DatabaseCtx = useContext(DBContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const nameRef = useRef();

  const navigate = useNavigate();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (ev) => {
    ev.preventDefault();
    const fullName = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const passwordOne = passwordRef.current.value;
    const passwordTwo = passwordConfirmationRef.current.value;

    if (passwordOne.length < 6) {
      return setError("Password needs to be 6 characters or longer");
    }
    if (passwordOne !== passwordTwo) {
      return setError("Passwords must match!");
    }

    try {
      setError("");
      setLoading(true);

      const userCredentials = await authCtx.signUp(auth, email, passwordOne);
      DatabaseCtx.writeUserData(userCredentials.user.uid, fullName, email);
      setLoading(false);
      navigate(HOME, { replace: true }); // replace:true means redirect instead of a push [no more useHistory in react router v6]. You can alos pass in numbers to navigate(-1) --> one page back/ navigate(2) ---> two pages forward. Redirecting programmatically
      // console.log("currentUser signed in", authCtx.currentUser);
      // console.log("userCredentials", userCredentials);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email already in use");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid Email");
      } else {
        setError("Unable to login");
      }
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>SignUp</h1>
      <div>{authCtx.currentUser && authCtx.currentUser.email}</div>
      {/* When we refresh our page authCtx.currentUser === null. Firebase set localstorage for you, sets tokens to verify if you have a user already signed in. But we have an initial loading state until onAuthStateChanged runs and set the current user*/}

      <form onSubmit={onSubmitHandler}>
        <label htmlFor='fullname'>Full Name</label>
        <input ref={nameRef} type='text' name='fullname' placeholder='Full Name' required />
        <label htmlFor='email'>Email</label>
        <input ref={emailRef} type='text' name='email' placeholder='email' required />
        <label htmlFor='password'>Password</label>
        <input ref={passwordRef} type='password' name='password' placeholder='password' required />
        <label htmlFor='password'>Password Confirmation</label>
        <input
          ref={passwordConfirmationRef}
          type='password'
          name='password'
          placeholder='Password Confirmation'
          required
        />
        <button disabled={loading} type='submit'>
          Sign Up
        </button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default SignUpPage;
