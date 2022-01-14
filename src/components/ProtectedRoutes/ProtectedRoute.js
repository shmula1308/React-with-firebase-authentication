import { Fragment, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { SIGN_IN } from "../../constants/routes";

// A wrapper component
const ProtectedRoute = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authCtx.currentUser) {
      navigate(SIGN_IN, { replace: true });
    }
  }, [authCtx.currentUser, navigate]);

  return <Fragment>{props.children}</Fragment>;
};

export default ProtectedRoute;
