import React from "react";
import SignOutButton from "../SignOut";
import { Link } from "react-router-dom";
import { ACCOUNT, LANDING, HOME } from "../../constants/routes";

const NavigationAuth = () => {
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
        <li>
          <SignOutButton />
        </li>
      </ul>
    </div>
  );
};

export default NavigationAuth;
