import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TwitterAuthProvider } from "firebase/auth";
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

const SignInWithTwitter = () => {
  const [error, setError] = useState(null);
  const authCtx = useContext(AuthContext);
  const databaseCtx = useContext(DBContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (ev) => {
    ev.preventDefault();
    try {
      const socialAuthUser = await authCtx.signInWithTwitter();
      // The signed-in user info.
      const user = socialAuthUser.user;
      console.log(socialAuthUser);
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = TwitterAuthProvider.credentialFromResult(socialAuthUser);
      console.log(credential);
      const token = credential.accessToken;
      const secret = credential.secret;

      databaseCtx.writeUserData(user.uid, user.displayName, user.email);
      navigate(HOME);
    } catch (error) {
      if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
        setError(ERROR_MSG_ACCOUNT_EXISTS);
        // } else if (error.code === "auth/invalid-credential") {
        //   setError(ERROR_MSG_ACCOUNT_EXISTS);
        // }
      } else {
        setError(error.code);
        console.log(error);
      }
    }
  };

  return (
    <div>
      <form onClick={onSubmitHandler}>
        <button type='submit'>Sign In with Twitter</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignInWithTwitter;

// Bearer Token AAAAAAAAAAAAAAAAAAAAAGHTYAEAAAAAhH8OsAa8Xiw1KOEYrcvUkggUd4k%3DItxdwdUcWzFS1MQMOFGU9gjimyb1uaDAKxPgBF3HFABDGo2Jdw
// in order to get email also go here https://twitter.com/settings/connected_apps and revoke
