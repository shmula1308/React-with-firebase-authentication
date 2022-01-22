import React from "react";
import MessageItem from "./MessageItem";

const MessageList = ({ messages, onRemoveMessage }) => {
  return (
    <ul>
      {messages.map((message) => (
        <MessageItem key={message.uid} message={message} onRemoveMessage={onRemoveMessage} />
      ))}
    </ul>
  );
};

export default MessageList;
