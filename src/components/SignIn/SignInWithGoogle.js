import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import DBContext from "../contexts/DBContext";
import { HOME } from "../../constants/routes";

const SignInWithGoogle = () => {
  const [error, setError] = useState(null);
  const authCtx = useContext(AuthContext);
  const databaseCtx = useContext(DBContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (ev) => {
    ev.preventDefault();
    try {
      const socialAuthUser = await authCtx.signInWithGoogle();
      console.log(socialAuthUser);

      databaseCtx.writeUserData(
        socialAuthUser.user.uid,
        socialAuthUser.user.displayName,
        socialAuthUser.user.email
      );
      navigate(HOME);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <div>
      <form onClick={onSubmitHandler}>
        <button type='submit'>Sign In with Google</button>
      </form>
      {/* {error && <p>{error}</p>} */}
    </div>
  );
};

export default SignInWithGoogle;

// In this scenario, every time a user signs in with Google, a new user with this stable id coming from the social login is created in your database. Basically if a user signs in twice with the same social login, the old user gets overridden. This can be a desired behavior, because maybe a user has changed their username on Google and want to see it reflected in your applications’s database too. If you don’t want to have this behavior and only create the user once with a social login, make use of the socialuser.additionalUserInfo.isNewUser property to only create a new user when signing in with Google for the first time.
