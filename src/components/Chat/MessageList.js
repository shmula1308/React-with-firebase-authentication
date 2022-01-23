import React from "react";
import MessageItem from "./MessageItem";

const MessageList = ({ messages, onRemoveMessage, onEditMessage }) => {
  return (
    <ul>
      {messages.map((message) => (
        <MessageItem
          key={message.uid}
          message={message}
          onRemoveMessage={onRemoveMessage}
          onEditMessage={onEditMessage}
        />
      ))}
    </ul>
  );
};

export default MessageList;
