import React from "react";

import { db } from "../Firebase/firebase";
import { set, ref, onValue } from "firebase/database";

const DBContext = React.createContext({
  writeUserData: () => {},
  readAllUsers: () => {},
});

export const DBContextProvider = (props) => {
  const writeUserData = (userId, fullName, email) => {
    set(ref(db, "users/" + userId), {
      username: fullName,
      email: email,
    });
  };
  const readAllUsers = () => {
    const users = ref(db, "users");
    return users;
  };
  // Using set() overwrites data at the specified location, including any child nodes.

  return <DBContext.Provider value={{ writeUserData, readAllUsers }}>{props.children}</DBContext.Provider>;
};

export default DBContext;
