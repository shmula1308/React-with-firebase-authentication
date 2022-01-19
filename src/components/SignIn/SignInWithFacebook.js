import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FacebookAuthProvider } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import AuthContext from "../contexts/AuthContext";
import DBContext from "../contexts/DBContext";
import { HOME } from "../../constants/routes";
const ERROR_CODE_ACCOUNT_EXISTS = "auth/account-exists-with-different-credential";
const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

const SignInWithFacebook = () => {
  const [error, setError] = useState(null);
  const authCtx = useContext(AuthContext);
  const databaseCtx = useContext(DBContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (ev) => {
    ev.preventDefault();
    try {
      const socialAuthUser = await authCtx.signInWithFacebook();

      authCtx.verifyUsersEmail(); // with facebook email is unverified. With google it is out of the box
      // The signed-in user info.
      const user = socialAuthUser.user;
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(socialAuthUser);
      console.log(credential);
      const accessToken = credential.accessToken;
      let roles = {};
      databaseCtx.writeUserData(user.uid, user.displayName, user.email, roles);
      navigate(HOME);
    } catch (error) {
      if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
        setError(ERROR_MSG_ACCOUNT_EXISTS);
      } else {
        setError(error.code);
      }
    }
  };

  return (
    <div>
      <form onClick={onSubmitHandler}>
        <button type='submit'>Sign In with Facebook</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignInWithFacebook;
