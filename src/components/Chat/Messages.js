import React, { useState, useContext, useEffect, useRef } from "react";
import AuthContext from "../contexts/AuthContext";
import DBContext from "../contexts/DBContext";
import MessageList from "./MessageList";
import { onValue, serverTimestamp } from "firebase/database";

const Messages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const messageRef = useRef();
  const [messages, setMessages] = useState([]);
  const databaseCtx = useContext(DBContext);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    const messagesRef = databaseCtx.readAllMessages();
    const subscribe = onValue(messagesRef, (snapshot) => {
      const messagesObj = snapshot.val();

      if (messagesObj) {
        const messages = Object.keys(messagesObj).map((key) => ({ ...messagesObj[key], uid: key }));
        setMessages(messages);
        setIsLoading(false);
      } else {
        setMessages(null);
        setIsLoading(false);
      }
    });
    return subscribe;
  }, [databaseCtx]);

  const onCreateMessageHandler = (ev) => {
    ev.preventDefault();
    const userId = authCtx.currentUser.uid;
    const text = messageRef.current.value;
    databaseCtx.addNewMessage(userId, text);
  };

  const onRemoveMessage = (uid) => {
    databaseCtx.removeMessage(uid);
  };

  const onEditMessage = (message, text) => {
    const { uid, ...messageSnapshot } = message;

    console.log(messageSnapshot, uid);
    databaseCtx.updateMessage(uid, {
      ...messageSnapshot,
      text,
      editedAt: serverTimestamp(),
    });
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {messages ? (
        <MessageList messages={messages} onRemoveMessage={onRemoveMessage} onEditMessage={onEditMessage} />
      ) : (
        <p>There are no messages...</p>
      )}
      <form onSubmit={onCreateMessageHandler}>
        <input type='text' ref={messageRef} />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
};

export default Messages;
