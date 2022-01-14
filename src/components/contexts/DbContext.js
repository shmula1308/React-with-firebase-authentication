import React, { useState, useEffect } from "react";

import { getDatabase } from "firebase/database";

const AuthContext = React.createContext({});

export const DBContextProvider = (props) => {
    
  return <DBContext.Provider value={{}}>{props.children}</DBContext.Provider>;
};

export default DBContext;
