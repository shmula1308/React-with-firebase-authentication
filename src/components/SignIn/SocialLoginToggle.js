import React from "react";

const SocialLoginToggle = ({ onlyOneLeft, isEnabled, signInMethod, onLink, onUnlink }) => {
  return isEnabled ? (
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
