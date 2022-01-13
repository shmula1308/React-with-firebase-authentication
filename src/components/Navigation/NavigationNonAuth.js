import React from "react";
import { Link } from "react-router-dom";
import { SIGN_IN, LANDING } from "../../constants/routes";

const NavigationNonAuth = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to={LANDING}>Landing</Link>
        </li>
        <li>
          <Link to={SIGN_IN}>Sign In</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavigationNonAuth;
