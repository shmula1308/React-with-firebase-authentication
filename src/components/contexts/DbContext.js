import React from "react";

import { db } from "../Firebase/firebase";
import { set, ref } from "firebase/database";

const DBContext = React.createContext({
  writeUserData: () => {},
  readAllUsers: () => {},
  getSingleUser: () => {},
  deleteUser: () => {},
});

export const DBContextProvider = (props) => {
  const writeUserData = (userId, fullName, email, roles) => {
    // Using set() overwrites data at the specified location, including any child nodes.
    // Since Firebase is essentially a schema-less JSON structure, which is an important part of dynamic real-time data, there is no way to store an empty object/array/null value.

    set(ref(db, "users/" + userId), {
      username: fullName,
      email: email,
      roles,
    });
  };
  const readAllUsers = () => {
    const users = ref(db, "users");
    return users;
  };

  const deleteUser = (uid) => {
    ref(db, `users/${uid}`).remove();
  };

  // const getSingleUser = (uid) => {
  //   const dbRef = ref(db);
  //   const dbUser = get(child(dbRef, `users/${uid}`));
  //   return dbUser;
  // };
  const getSingleUser = (uid) => {
    const user = ref(db, `users/${uid}`);
    return user;
  };

  const message = (uid) => ref(db, `messages/${uid}`); // This is an equivalent of an API endpoint, to read,write,update and delete a message
  const messages = (uid) => ref(db, "messages"); // This endpoint is used  to read all the messages and create a message

  return (
    <DBContext.Provider value={{ writeUserData, readAllUsers, getSingleUser, deleteUser }}>
      {props.children}
    </DBContext.Provider>
  );
};

export default DBContext;
