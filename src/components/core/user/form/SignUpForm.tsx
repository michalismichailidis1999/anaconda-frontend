import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { State, FormButtonState } from "../../../../interfaces";
import { removeError } from "../../../../actions/formError";

const SignUpForm = (props: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  setFirstName: Function;
  setLastName: Function;
  setEmail: Function;
  setPassword: Function;
  setConfirmPassword: Function;
  errorOccured: boolean;
  removeError: Function;
  handleSubmit: Function;
  invalidInput: string;
  setInvalidInput: Function;
  formButton: FormButtonState;
}) => (
  <form
    className="user-form sign-up-form"
    onSubmit={e => {
      e.preventDefault();
      props.handleSubmit();
    }}
  >
    <h1>
      Εγγραφή Χρήστη <i className="fas fa-file-signature"></i>
    </h1>

    <div
      className={
        props.invalidInput === "firstName" && props.errorOccured
          ? "input-group has-error"
          : "input-group"
      }
    >
      <span className="input-icon">
        <i className="fas fa-user"></i>
      </span>

      <input
        type="text"
        value={props.firstName}
        placeholder="Όνομα..."
        onChange={e => {
          if (props.errorOccured) {
            props.removeError();
            props.setInvalidInput("");
          }

          props.setFirstName(e.target.value);
        }}
        maxLength={100}
      />
    </div>

    <div
      className={
        props.invalidInput === "lastName" && props.errorOccured
          ? "input-group has-error"
          : "input-group"
      }
    >
      <span className="input-icon">
        <i className="fas fa-user"></i>
      </span>

      <input
        type="text"
        value={props.lastName}
        placeholder="Επίθετο..."
        onChange={e => {
          if (props.errorOccured) {
            props.removeError();
            props.setInvalidInput("");
          }

          props.setLastName(e.target.value);
        }}
        maxLength={100}
      />
    </div>

    <div
      className={
        props.invalidInput === "email" && props.errorOccured
          ? "input-group has-error"
          : "input-group"
      }
    >
      <span className="input-icon email-icon">
        <i className="fas fa-envelope"></i>
      </span>

      <input
        type="text"
        value={props.email}
        placeholder="Email..."
        onChange={e => {
          if (props.errorOccured) {
            props.removeError();
            props.setInvalidInput("");
          }

          props.setEmail(e.target.value);
        }}
        maxLength={150}
      />
    </div>

    <div
      className={
        props.invalidInput === "password" && props.errorOccured
          ? "input-group has-error"
          : "input-group"
      }
    >
      <span className="input-icon">
        <i className="fas fa-key"></i>
      </span>

      <input
        type="password"
        value={props.password}
        placeholder="Κωδικός..."
        onChange={e => {
          if (props.errorOccured) {
            props.removeError();
            props.setInvalidInput("");
          }
          props.setPassword(e.target.value);
        }}
        maxLength={100}
      />
    </div>

    <div
      className={
        props.invalidInput === "confirmPassword" && props.errorOccured
          ? "input-group has-error"
          : "input-group"
      }
    >
      <span className="input-icon">
        <i className="fas fa-key"></i>
      </span>

      <input
        type="password"
        value={props.confirmPassword}
        placeholder="Επιβεβαίωση Κωδικού..."
        onChange={e => {
          if (props.errorOccured) {
            props.removeError();
            props.setInvalidInput("");
          }
          props.setConfirmPassword(e.target.value);
        }}
        maxLength={100}
      />
    </div>

    <div className="form-link">
      <Link to="/signin">Έχεις λογαργιασμό;</Link>
    </div>

    <button
      type="submit"
      className="btn"
      style={
        props.formButton.canClick
          ? {}
          : { cursor: "not-allowed", background: "white" }
      }
      disabled={!props.formButton.canClick}
    >
      Εγγραφή {!props.formButton.canClick && <span className="loading"></span>}
    </button>
  </form>
);

const mapStateToProps = (state: State) => ({
  errorOccured: state.formError.errorOccured,
  formButton: state.formButton
});

export default connect(mapStateToProps, { removeError })(SignUpForm);
