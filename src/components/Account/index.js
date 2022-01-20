import { useContext } from "react";
import PasswordChangePage from "../PasswordChange/index";
import PasswordForgetPage from "../PasswordForget/index";
import SignInManagement from "../SignIn/SignInManagement";
import AuthContext from "../contexts/AuthContext";

const AccountPage = () => {
  const authCtx = useContext(AuthContext);
  //const provider = authCtx.currentUser.providerId;
  // provider !== "facebook.com" && provider !== "google.com"

  return (
    <div>
      <h1>Account{authCtx.currentUser && authCtx.currentUser.email}</h1>
      {/* in case of user deleting account the current user will become null, which will crash the app. Therefore we check wether user exist before rendering their email */}
      {/* Probably password update page and password forgot page should NOT show if user has signed in with gmail, facebook or twitter etc */}
      <PasswordChangePage />
      <PasswordForgetPage />
      <SignInManagement />
    </div>
  );
};

export default AccountPage;
