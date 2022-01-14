import React from "react";
import PasswordChangePage from "../PasswordChange/index";
import PasswordForgetPage from "../PasswordForget/index";

const AccountPage = () => {
  return (
    <div>
      <h1>Account</h1>
      <PasswordChangePage />
      <PasswordForgetPage />
    </div>
  );
};

export default AccountPage;
