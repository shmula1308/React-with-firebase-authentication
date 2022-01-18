import React from "react";
import { useState } from "react/cjs/react.development";

const DefaultLoginToggle = ({ onlyOneLeft, isEnabled, signInMethod, onLink, onUnlink }) => {
  // let initialState = { passwordOne: "", passwordTwo: "" };
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  // const [passwords, setPasswords] = useState(initialState);

  const onSubmitHandler = (ev) => {
    ev.preventDefault();
    onLink(passwordOne);
  };

  const passwordOneChangeHandler = (ev) => {
    setPasswordOne(ev.target.value);
  };
  const passwordTwoChangeHandler = (ev) => {
    setPasswordTwo(ev.target.value);
  };

  // const passwordChangeHandler = (ev) => {
  //   console.log(ev.target.name);
  //   setPasswords((prevPass) => {
  //     console.log(typeof prevPass[ev.target.name]);
  //     prevPass[ev.target.name] = ev.target.value;
  //   });
  // };

  // const { passwordOne, passwordTwo } = passwords;

  const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

  return isEnabled ? (
    <button
      disabled={onlyOneLeft}
      onClick={() => {
        onUnlink(signInMethod.id);
      }}>
      Deactivate {signInMethod.id}
    </button>
  ) : (
    <form onSubmit={onSubmitHandler}>
      <label htmlFor='passwordOne'>Password</label>
      <input
        value={passwordOne}
        onChange={passwordOneChangeHandler}
        type='password'
        name='passwordOne'
        placeholder='New Password'
      />
      <label htmlFor='passwordTwo'>Confirm Password</label>
      <input
        value={passwordTwo}
        onChange={passwordTwoChangeHandler}
        type='password'
        name='passwordTwo'
        placeholder='Confirm New Password'
      />
      <button disabled={isInvalid} type='submit'>
        Link {signInMethod.id}
      </button>
    </form>
  );
};

export default DefaultLoginToggle;
