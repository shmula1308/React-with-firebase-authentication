import { Fragment, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { HOME } from "../../constants/routes";

// A wrapper component
const IsUserAuthenticated = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  // because for a second currentUser is null we get to see signin or signup page. Once it's populated it's redirected to Home
  useEffect(() => {
    if (authCtx.currentUser) {
      navigate(HOME, { replace: true });
    }
  }, [authCtx.currentUser, navigate]);

  return <Fragment>{props.children}</Fragment>;
};

export default IsUserAuthenticated;
