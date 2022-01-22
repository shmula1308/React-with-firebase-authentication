import React from "react";

const MessageItem = ({ message, onRemoveMessage }) => {
  console.log(message.uid);
  return (
    <li>
      <strong>{message.userId}</strong>
      {message.text}
      <button
        onClick={() => {
          onRemoveMessage(message.uid);
        }}>
        Delete
      </button>
    </li>
  );
};

export default MessageItem;
