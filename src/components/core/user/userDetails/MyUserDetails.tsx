import React, { useState } from "react";
import { connect } from "react-redux";
import { State } from "../../../../interfaces";

// Components
import ChangeUserName from "../form/ChangeUserNameForm";
import ChangeEmailForm from "../form/ChangeEmailForm";
import ChangePasswordForm from "../form/ChangePasswordForm";
import ButtonsToCommitChange from "./ButtonsToCommitChange";

const MyUserDetails = (props: {
  savingChanges: boolean;
  errorOccured: boolean;
  errorMessage: string;
}) => {
  const [changeEmail, setChangeEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [changeHasBeenMade, setChangeHasBeenMade] = useState(false);

  const buttonsToCommitChangeClicked = (change: string) => {
    if (change === "email") {
      setChangeHasBeenMade(false);
      setChangeEmail(true);
      setShowButtons(false);
    } else {
      setChangeHasBeenMade(false);
      setChangePassword(true);
      setShowButtons(false);
    }
  };

  return (
    <div className="user-details">
      {!changeEmail && !changePassword && (
        <ChangeUserName
          changeHasBeenMade={changeHasBeenMade}
          setChangeHasBeenMade={setChangeHasBeenMade}
        />
      )}

      {showButtons && (
        <ButtonsToCommitChange
          buttonsToCommitChangeClicked={buttonsToCommitChangeClicked}
        />
      )}

      {changeEmail && (
        <ChangeEmailForm
          changeHasBeenMade={changeHasBeenMade}
          setChangeHasBeenMade={setChangeHasBeenMade}
          setChangeEmail={setChangeEmail}
          setShowButtons={setShowButtons}
        />
      )}

      {changePassword && (
        <ChangePasswordForm
          changeHasBeenMade={changeHasBeenMade}
          setChangeHasBeenMade={setChangeHasBeenMade}
          setShowButtons={setShowButtons}
          setChangePassword={setChangePassword}
        />
      )}

      {props.savingChanges && (
        <div className="saving">
          <p>Παρακαλώ Περιμένετε...</p>
        </div>
      )}

      {props.errorOccured && (
        <div className="update-error">
          <p>{props.errorMessage}</p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  savingChanges: state.user.savingChanges,
  errorOccured: state.formError.errorOccured,
  errorMessage: state.formError.errorMessage
});

export default connect(mapStateToProps, {})(MyUserDetails);
