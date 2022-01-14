import React, { useRef, useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { auth } from "../Firebase/firebase";
// import { getAuth } from "firebase/auth";

import { SIGN_IN } from "../../constants/routes";

//  Find a better way to disable button and handle errors so it doesnt cause an error. Try the useEffect as suggested
const PasswordForgetPage = () => {
  const authCtx = useContext(AuthContext);
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
    </div>
  );
};

export default PasswordForgetPage;
