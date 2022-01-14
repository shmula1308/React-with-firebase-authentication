import React, { useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { auth } from "../Firebase/firebase";
import { SIGN_IN } from "../../constants/routes";

//  Find a better way to disable button and handle errors so it doesnt cause an error. Try the useEffect as suggested
const PasswordChangePage = () => {
  const authCtx = useContext(AuthContext);
  const passwordOneRef = useRef();
  const passwordTwoRef = useRef();

  const navigate = useNavigate();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (ev) => {
    ev.preventDefault();
    const passwordOne = passwordOneRef.current.value;
    const passwordTwo = passwordTwoRef.current.value;

    if (passwordOne !== passwordTwo) {
      return setError("Passwords should match!");
    }

    try {
      setError("");
      setLoading(true);
      const user = auth.currentUser;
      await authCtx.updatePass(user, passwordOne);
      setLoading(false);
      await authCtx.signOut(auth);
      navigate(SIGN_IN, { replace: true });
    } catch (error) {
      if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters");
      } else {
        setError("Unable to reset password");
      }
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Update Your Password</h1>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor='passwordOne'>New Password</label>
        <input ref={passwordOneRef} type='password' name='passwordOne' placeholder='New Password' required />
        <label htmlFor='passwordTwo'>Confrim New Password</label>
        <input
          ref={passwordTwoRef}
          type='password'
          name='passwordTwo'
          placeholder='Confirm New Password'
          required
        />
        <button disabled={loading} type='submit'>
          Reset My Password
        </button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default PasswordChangePage;
