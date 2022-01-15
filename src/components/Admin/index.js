import React, { useEffect, useState, useContext } from "react";
import DBContext from "../contexts/DBContext";
import { onValue } from "firebase/database";

const AdminPage = () => {
  const [users, setUsers] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const DatabaseCtx = useContext(DBContext);

  useEffect(() => {
    setIsLoading(true);
    const users = DatabaseCtx.readAllUsers(); // here we're getting a users reference from db
    // we're calling a onValue listener for when users change. We're dealing with a realtime database

    const subscribe = onValue(users, (snapshot) => {
      // async callback happens here. It's a callback pattern.
      const usersObject = snapshot.val();
      if (usersObject) {
        const usersList = Object.keys(usersObject).map((key) => ({ ...usersObject[key], uid: key }));
        setUsers(usersList);
        setIsLoading(false);
      }
      setIsLoading(false);
    });

    return subscribe; // clean up function which removes the listener, otherwose you get memory leakage
  }, [DatabaseCtx]);

  return (
    <div>
      <h1>Admin1</h1>
      {!users && <p>No users found!</p>}
      <ul>
        {loading ? "Loading..." : ""}
        {users &&
          users.map((user) => (
            <li key={user.uid}>
              <span>
                <strong>Id:</strong>
                {user.uid}
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
          ))}
      </ul>
    </div>
  );
};

export default AdminPage;
