import { useContext, useState, useEffect } from "react";
import DBContext from "../contexts/DBContext";
import { useParams } from "react-router-dom";
import { onValue } from "firebase/database";

const UsersItem = ({ loading }) => {
  const [user, setUser] = useState();
  const params = useParams();
  const databaseCtx = useContext(DBContext);

  useEffect(() => {
    const userRef = databaseCtx.getSingleUser(params.id);
    onValue(userRef, (snapshot) => {
      const bluser = snapshot.val();
      console.log(bluser);
      setUser(bluser);
    });
  }, [databaseCtx]);

  console.log(params);
  return (
    <ul>
      {loading ? "Loading..." : ""}
      {user && (
        <li>
          <span>
            <strong>Id:</strong>
            {/* {user.uid} */}
          </span>
          <span>
            <strong>Username:</strong>
            {user.username}
          </span>
          <span>
            <strong>Email:</strong>
            {user.email}
          </span>
        </li>
      )}
    </ul>
  );
};

export default UsersItem;
