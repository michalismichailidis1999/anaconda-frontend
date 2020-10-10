import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { State } from "../../../../interfaces";
import { updatePassword, resetPasswordUpdate } from "../../../../actions/user";
import { removeError, setError } from "../../../../actions/formError";

const ChangePasswordForm = (props: {
  changeHasBeenMade: boolean;
  setChangeHasBeenMade: Function;
  updatePassword: Function;
  removeError: Function;
  setError: Function;
  errorOccured: boolean;
  userId: string;
  token: string;
  passwordUpdated: boolean;
  setChangePassword: Function;
  setShowButtons: Function;
  resetPasswordUpdate: Function;
  savingChanges: boolean;
}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    props.setChangeHasBeenMade(false);

    if (newPassword !== confirmPassword) {
      props.setError("Οι κωδικοί δεν ταιριάζουν");
      return;
    }

    props.updatePassword(props.userId, props.token, oldPassword, newPassword);
  };

  const cancel = () => {
    props.setChangeHasBeenMade(false);
    props.setShowButtons(true);
    props.setChangePassword(false);
    props.resetPasswordUpdate();
  };

  useEffect(() => {
    if (props.passwordUpdated) {
      props.setChangeHasBeenMade(false);
      props.setShowButtons(true);
      props.setChangePassword(false);
      props.resetPasswordUpdate();
    }
  }, [props.passwordUpdated]);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();

        handleSubmit();
      }}
    >
      <div className="input-group">
        <label>
          Παλιός Κωδικός <i className="fas fa-lock-open"></i>
        </label>
        <input
          type="password"
          required={true}
          value={oldPassword}
          onChange={e => {
            if (!props.changeHasBeenMade) {
              props.setChangeHasBeenMade(true);
            }
            if (props.errorOccured) {
              props.removeError();
            }
            setOldPassword(e.target.value);
          }}
          maxLength={100}
          minLength={8}
          readOnly={props.savingChanges}
          className={props.savingChanges ? "read-only" : ""}
        />
      </div>

      <div className="input-group">
        <label>
          Νέος Κωδικός <i className="fas fa-lock"></i>
        </label>
        <input
          type="password"
          required={true}
          value={newPassword}
          onChange={e => {
            if (!props.changeHasBeenMade) {
              props.setChangeHasBeenMade(true);
            }
            if (props.errorOccured) {
              props.removeError();
            }
            setNewPassword(e.target.value);
          }}
          maxLength={100}
          minLength={8}
          readOnly={props.savingChanges}
          className={props.savingChanges ? "read-only" : ""}
        />
      </div>

      <div className="input-group">
        <label>
          Επιβεβαίωσε τον νέο κωδικό <i className="fas fa-lock"></i>
        </label>
        <input
          type="password"
          required={true}
          value={confirmPassword}
          onChange={e => {
            if (!props.changeHasBeenMade) {
              props.setChangeHasBeenMade(true);
            }
            if (props.errorOccured) {
              props.removeError();
            }
            setConfirmPassword(e.target.value);
          }}
          maxLength={100}
          minLength={8}
          readOnly={props.savingChanges}
          className={props.savingChanges ? "read-only" : ""}
        />
      </div>

      {props.changeHasBeenMade && (
        <React.Fragment>
          <button className="btn" type="submit">
            Αποθήκευση
          </button>

          <button className="btn" type="button" onClick={() => cancel()}>
            Ακύρωση
          </button>
        </React.Fragment>
      )}
    </form>
  );
};

const mapStateToProps = (state: State) => ({
  errorOccured: state.formError.errorOccured,
  userId: state.user.user.id,
  token: state.user.token,
  passwordUpdated: state.user.passwordUpdated,
  savingChanges: state.user.savingChanges
});

export default connect(mapStateToProps, {
  updatePassword,
  setError,
  removeError,
  resetPasswordUpdate
})(ChangePasswordForm);
