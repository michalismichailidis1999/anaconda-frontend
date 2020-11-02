import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { State, FormButtonState } from "../../../../interfaces";
import { removeError } from "../../../../actions/formError";

const SignInForm = (props: {
  email: string;
  password: string;
  setEmail: Function;
  setPassword: Function;
  handleSubmit: Function;
  invalidInput: string;
  errorOccured: boolean;
  removeError: Function;
  setInvalidInput: Function;
  formButton: FormButtonState;
}) => (
  <form
    className="user-form sign-in-form"
    onSubmit={e => {
      e.preventDefault();
      props.handleSubmit();
    }}
    id="signin"
  >
    <h1>
      Σύνδεση Χρήστη <i className="fas fa-user"></i>
    </h1>

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

    <div className="form-link">
      <Link to="/signup">Δεν έχεις λογαργιασμό;</Link>
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
      Σύνδεση {!props.formButton.canClick && <span className="loading"></span>}
    </button>
  </form>
);

const mapStateToProps = (state: State) => ({
  errorOccured: state.formError.errorOccured,
  formButton: state.formButton
});

export default connect(mapStateToProps, { removeError })(SignInForm);
