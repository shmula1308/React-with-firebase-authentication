import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { SIGN_IN } from "../../constants/routes";
import { auth } from "../Firebase/firebase";

const SignOutButton = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const signOutHandler = () => {
    authCtx.signOut(auth);
    navigate(SIGN_IN, { replace: true });
  };
  return (
    <button type='button' onClick={signOutHandler}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
