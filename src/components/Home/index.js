import React from "react";
import Messages from "../Chat/Messages";

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>The Home Page is accessible by every signed in user.</p>
      <Messages />
    </div>
  );
};

export default HomePage;
