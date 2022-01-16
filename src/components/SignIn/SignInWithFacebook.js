import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FacebookAuthProvider } from "firebase/auth";
import AuthContext from "../contexts/AuthContext";
import DBContext from "../contexts/DBContext";
import { HOME } from "../../constants/routes";

const SignInWithFacebook = () => {
  const [error, setError] = useState(null);
  const authCtx = useContext(AuthContext);
  const databaseCtx = useContext(DBContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (ev) => {
    ev.preventDefault();
    try {
      const socialAuthUser = await authCtx.signInWithFacebook();
      // The signed-in user info.
      const user = socialAuthUser.user;
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(socialAuthUser);
      console.log(credential);
      const accessToken = credential.accessToken;

      databaseCtx.writeUserData(user.uid, user.displayName, user.email);
      navigate(HOME);
    } catch (error) {
      console.log(error);
      setError(error);
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
