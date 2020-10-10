import React from "react";

const ButtonsToCommitChange = (props: {
  buttonsToCommitChangeClicked: Function;
}) => {
  return (
    <div className="buttons-for-other-changes">
      <button
        className="btn"
        onClick={() => props.buttonsToCommitChangeClicked("email")}
      >
        Αλλάξτε email
      </button>

      <button
        className="btn"
        onClick={() => props.buttonsToCommitChangeClicked("password")}
      >
        Αλλάξτε κωδικό
      </button>
    </div>
  );
};

export default ButtonsToCommitChange;
