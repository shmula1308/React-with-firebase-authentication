import React from "react";
import { Link } from "react-router-dom";
import { ACCOUNT, ADMIN, SIGN_IN, LANDING, HOME } from "../../constants/routes";

const Navigation = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to={SIGN_IN}>Sign In</Link>
        </li>
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
          <Link to={ADMIN}>Admin</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
