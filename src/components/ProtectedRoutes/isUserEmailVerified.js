import { Fragment, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { SIGN_IN, LANDING } from "../../constants/routes";

// A wrapper component
const IsUserEmailVerified = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(authCtx.currentUser);

  useEffect(() => {
    if (authCtx.currentUser && authCtx.currentUser.emailVerified) {
      return navigate(LANDING, { replace: true });
    }
  }, [authCtx.currentUser, navigate]);

  return <div>{!authCtx.currentUser && props.children}</div>;
};

export default IsUserEmailVerified;
