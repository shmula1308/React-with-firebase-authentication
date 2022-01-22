import React from "react";

const MessageItem = ({ message }) => {
  return (
    <li>
      <strong>{message.userId}</strong>
      {message.text}
    </li>
  );
};

export default MessageItem;
