import React, { useEffect, useState, useContext } from "react";
import DBContext from "../contexts/DBContext";
import { Route, Routes, Link } from "react-router-dom";
import { onValue } from "firebase/database";
import UsersList from "./UserList";
import UsersItem from "./UserItem";
import { ADMIN_USER_DETAILS, ADMIN_USER_LIST } from "../../constants/routes";

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
      <Link to={ADMIN_USER_LIST}>All your users</Link>

      {/* {!users && <p>No users found!</p>} */}
      <Routes>
        <Route path={ADMIN_USER_LIST} element={<UsersList users={users} loading={loading} />} />
        <Route path={ADMIN_USER_DETAILS} element={<UsersItem loading={loading} />} />
      </Routes>
    </div>
  );
};

export default AdminPage;
