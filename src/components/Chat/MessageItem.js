import React, { useState, useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const MessageItem = ({ message, onRemoveMessage, onEditMessage }) => {
  const [messageEdit, setMessageEdit] = useState({
    editMode: false,
    editText: message.text,
  });
  const authCtx = useContext(AuthContext);
  const { currentUser } = authCtx;

  const onToggleEditMode = () => {
    setMessageEdit((prevState) => {
      return {
        editMode: !prevState.editMode,
        editText: message.text,
      };
    });
  };

  const onSaveEditText = (ev) => {
    setMessageEdit((prevState) => {
      return {
        editMode: !prevState.editMode,
        editText: message.text,
      };
    });
    console.log(message, messageEdit.editText);
    onEditMessage(message, messageEdit.editText);
  };

  const onChangeEditText = (ev) => {
    setMessageEdit((prevState) => {
      return {
        editMode: prevState.editMode,
        editText: ev.target.value,
      };
    });
  };

  const { editMode, editText } = messageEdit;

  return (
    <li>
      {editMode ? (
        <input value={editText} onChange={onChangeEditText} type='text' />
      ) : (
        <span>
          <strong>{message.userId}</strong>
          {message.text}
        </span>
      )}
      {message.editedAt && <span>(Edited)</span>}
      {currentUser.uid === message.userId && (
        <span>
          {!editMode && (
            <button
              onClick={() => {
                onRemoveMessage(message.uid);
              }}>
              Delete
            </button>
          )}
          {editMode ? (
            <span>
              <button onClick={onSaveEditText}>Save</button>
              <button onClick={onToggleEditMode}>Reset</button>
            </span>
          ) : (
            <button onClick={onToggleEditMode}>Edit</button>
          )}
        </span>
      )}
    </li>
  );
};

export default MessageItem;
