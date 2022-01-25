import React, { useState, useContext, useEffect, useRef } from "react";
import AuthContext from "../contexts/AuthContext";
import DBContext from "../contexts/DBContext";
import MessageList from "./MessageList";
import { onValue, serverTimestamp } from "firebase/database";

const Messages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfMsg, setNumberOfMsg] = useState(5);
  const messageRef = useRef();
  const [messages, setMessages] = useState([]);
  const databaseCtx = useContext(DBContext);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    const messagesCollection = databaseCtx.readAllMessages(numberOfMsg);

    const subscribe = onValue(messagesCollection, (snapshot) => {
      if (snapshot.val()) {
        const messages = [];
        // using forEach method on snapshot is the only way to apporach this. Because snapshot.val() return an object which does not keep the sorting specified in the query. So orderByChild() will not work.
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          messages.push({ uid: childKey, ...childData }); // ascending order, when we define orderByChild("text")
        });
        setMessages(messages); // use reverse() method on array to change to (descending)
        setIsLoading(false);
      } else {
        setMessages(null);
        setIsLoading(false);
      }
    });
    return subscribe;
  }, [databaseCtx, numberOfMsg]);

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

  const onShowMoreMessages = () => {
    setNumberOfMsg((prevState) => {
      return prevState + 5;
    });
  };
  const onShowLessMessages = () => {
    setNumberOfMsg((prevState) => {
      return prevState - 5 > 0 ? prevState - 5 : 5;
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
      {!isLoading && messages && (
        <span>
          <button type='button' onClick={onShowMoreMessages}>
            More
          </button>
          <button type='button' onClick={onShowLessMessages}>
            Less
          </button>
        </span>
      )}
      <form onSubmit={onCreateMessageHandler}>
        <input type='text' ref={messageRef} />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
};

export default Messages;
