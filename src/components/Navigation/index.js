import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import NavigationAuth from "./NavigationAuth";
import NavigationNonAuth from "./NavigationNonAuth";

const Navigation = () => {
  const authCtx = useContext(AuthContext);
  return <div>{authCtx.currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

export default Navigation;
