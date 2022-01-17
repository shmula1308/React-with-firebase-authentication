import React, { useRef, useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { auth } from "../Firebase/firebase";
//import { setPersistence, inMemoryPersistence } from "firebase/auth";
import SignInWithGoogle from "./SignInWithGoogle";
import SignInWithFacebook from "./SignInWithFacebook";
import SignInWithTwitter from "./SignInWithTwitter";
import { SIGN_UP, HOME, PASSWORD_FORGET } from "../../constants/routes";

const ERROR_CODE_ACCOUNT_EXISTS = "auth/account-exists-with-different-credential";
const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

//  Find a better way to disable button and handle errors so it doesnt cause an error. Try the useEffect as suggested
const SignInPage = () => {
  const authCtx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const [error, setError] = useState(); // disabled on button was causing an error -->  Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
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
      //await setPersistence(auth, inMemoryPersistence); // you define this if you want NO session persistence
      await authCtx.signIn(auth, email, password); // returns userCredentials
      //You can also get the currently signed-in user by using the currentUser property. If a user isn't signed in, currentUser is null: const auth = getAuth();
      // const user = auth.currentUser;
      const user = auth.currentUser;
      console.log("Currently signed in user", user);
      setLoading(false);
      navigate(HOME);
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setError("Wrong Password");
      } else if (error.code === "auth/user-not-found") {
        setError("User not found");
      } else if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
        setError(ERROR_MSG_ACCOUNT_EXISTS);
      } else {
        setError("Unable to login");
      }
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>SignIn Page</h1>
      {/* <div>{authCtx.currentUser && authCtx.currentUser.email}</div> */}
      {/* When we refresh our page authCtx.currentUser === null. Firebase set localstorage for you, sets tokens to verify if you have a user already signed in. But we have an initial loading state until onAuthStateChanged runs and set the current user*/}

      <form onSubmit={onSubmitHandler}>
        <label htmlFor='email'>Email</label>
        <input ref={emailRef} type='text' name='email' placeholder='email' required />
        <label htmlFor='password'>Password</label>
        <input ref={passwordRef} type='password' name='password' placeholder='password' required />
        <button disabled={loading} type='submit'>
          Sign In
        </button>
        {error && <div>{error}</div>}
        <p>
          Don't have an account? <Link to={SIGN_UP}>Sign Up</Link>
        </p>
        <p>
          <Link to={PASSWORD_FORGET}>Forgot Password?</Link>
        </p>
      </form>
      <SignInWithGoogle />
      <SignInWithFacebook />
      <SignInWithTwitter />
    </div>
  );
};

export default SignInPage;
