import React from "react";

const DefaultLoginToggle = ({ onlyOneLeft, isEnabled, signInMethod, onLink, onUnlink }) => {
  isEnabled ? (
    <button
      disabled={onlyOneLeft}
      onClick={() => {
        onUnlink(signInMethod.id);
      }}>
      Deactivate {signInMethod.id}
    </button>
  ) : (
    <button type='button' onClick={() => onLink(signInMethod.provider)}>
      {signInMethod.id}
    </button>
  );
};

export default SocialLoginToggle;
