import React, { useState, useEffect } from "react";
import { removeError } from "../../../../actions/formError";
import { connect } from "react-redux";
import { State } from "../../../../interfaces";
import { updateEmail, resetEmailUpdate } from "../../../../actions/user";

const ChangeEmailForm = (props: {
  changeHasBeenMade: boolean;
  setChangeHasBeenMade: Function;
  savingChanges: boolean;
  userId: string;
  token: string;
  email: string;
  errorOccured: boolean;
  removeError: Function;
  setChangeEmail: Function;
  updateEmail: Function;
  emailUpdated: boolean;
  resetEmailUpdate: Function;
  setShowButtons: Function;
}) => {
  const [oldEmail, setOldEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const cancel = () => {
    props.setChangeHasBeenMade(false);
    props.setChangeEmail(false);
    props.setShowButtons(true);
  };

  const handleSubmit = () => {
    props.setChangeHasBeenMade(false);
    setNewEmail("");

    props.updateEmail(props.userId, props.token, newEmail);
  };

  useEffect(() => {
    setOldEmail(props.email);
  }, []);

  useEffect(() => {
    setOldEmail(props.email);
  }, [props.email]);

  useEffect(() => {
    if (props.emailUpdated) {
      props.setChangeEmail(false);
      props.setShowButtons(true);
      props.resetEmailUpdate();
    }
  }, [props.emailUpdated]);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();

        handleSubmit();
      }}
    >
      <div className="input-group">
        <label>
          Παλιό Email <i className="fas fa-envelope"></i>
        </label>
        <input
          type="email"
          required={true}
          value={oldEmail}
          readOnly={true}
          className="read-only"
        />
      </div>

      <div className="input-group">
        <label>
          Νέο Email <i className="fas fa-envelope-open-text"></i>
        </label>
        <input
          type="email"
          required={true}
          value={newEmail}
          maxLength={150}
          onChange={e => {
            if (!props.changeHasBeenMade) {
              props.setChangeHasBeenMade(true);
            }
            if (props.errorOccured) {
              props.removeError();
            }
            setNewEmail(e.target.value);
          }}
          className={props.savingChanges ? "read-only" : ""}
          readOnly={props.savingChanges}
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
  savingChanges: state.user.savingChanges,
  userId: state.user.user.id,
  token: state.user.token,
  email: state.user.user.email,
  errorOccured: state.formError.errorOccured,
  emailUpdated: state.user.emailUpdated
});

export default connect(mapStateToProps, {
  removeError,
  updateEmail,
  resetEmailUpdate
})(ChangeEmailForm);
