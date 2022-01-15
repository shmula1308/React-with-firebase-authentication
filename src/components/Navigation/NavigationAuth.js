import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import SignOutButton from "../SignOut";
import { Link } from "react-router-dom";
import { ACCOUNT, LANDING, HOME, ADMIN } from "../../constants/routes";

const NavigationAuth = () => {
  const authCtx = useContext(AuthContext);
  return (
    <div>
      <ul>
        <li>
          <Link to={LANDING}>Landing</Link>
        </li>
        <li>
          <Link to={HOME}>Home</Link>
        </li>
        <li>
          <Link to={ACCOUNT}>Account</Link>
        </li>
        {authCtx.currentUser.roles["ADMIN"] && (
          <li>
            <Link to={ADMIN}>Admin</Link>
          </li>
        )}
        <li>
          <SignOutButton />
        </li>
      </ul>
    </div>
  );
};

export default NavigationAuth;
