import React, { useEffect, useState, useContext } from "react";
import DBContext from "../contexts/DBContext";
import { onValue } from "firebase/database";

const AdminPage = () => {
  const [users, setUsers] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const DatabaseCtx = useContext(DBContext);
  useEffect(() => {
    setIsLoading(true);
    const users = DatabaseCtx.readAllUsers();
    const subscribe = onValue(users, (snapshot) => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map((key) => ({ ...usersObject[key], uid: key }));
      setUsers(usersList);
      setIsLoading(false);
    });
    return subscribe; // clean up function which removes the listener
  }, []);

  return (
    <div>
      <h1>Admin1</h1>
      <ul>
        {loading ? "Loading..." : ""}
        {users && users.map((user) => <li key={user.uid}>{user.username}</li>)}
      </ul>
    </div>
  );
};

export default AdminPage;
