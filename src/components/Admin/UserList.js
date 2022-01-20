import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

const UsersList = ({ users, loading }) => {
  return (
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
            <span>
              <Link to={user.uid}>Details</Link>
            </span>
          </li>
        ))}
    </ul>
  );
};

export default UsersList;
