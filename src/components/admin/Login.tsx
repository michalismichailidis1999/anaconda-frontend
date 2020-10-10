import React, { useState } from "react";
import { connect } from "react-redux";
import { State } from "../../interfaces";
import { login } from "../../actions/admin/user";
import { validateEmail } from "../../helpers";
import { setError, removeError } from "../../actions/formError";

const Login = (props: {
  userId: string;
  canClickButton: boolean;
  setError: Function;
  removeError: Function;
  login: Function;
  errorOccured: boolean;
  email: string;
  setEmail: Function;
}) => {
  const [password, setPassword] = useState("");

  const [errorInEmail, setErrorInEmail] = useState(false);
  const [errorInPassword, setErrorInPassword] = useState(false);

  const handleSubmit = () => {
    if (props.email === "") {
      setErrorInEmail(true);
      props.setError("Παρακαλώ εισάγετε το email σας.");
      return;
    }

    if (!validateEmail(props.email)) {
      setErrorInEmail(true);
      props.setError("Παρακαλώ εισάγετε έγκυρο email.");
      return;
    }

    if (password === "") {
      setErrorInPassword(true);
      props.setError("Παρακαλώ εισάγετε τον κωδικό σας.");
      return;
    }

    props.login(props.email, password);
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();

        handleSubmit();
      }}
    >
      <h3>
        Σύνδεση Admin <i className="fas fa-user-shield"></i>
      </h3>

      <div className={!errorInEmail ? "input-group" : "input-group has-error"}>
        <input
          type="text"
          placeholder="Εισάγετε το email σας..."
          value={props.email}
          onChange={e => {
            if (props.errorOccured) {
              props.removeError();
              setErrorInEmail(false);
            }
            props.setEmail(e.target.value);
          }}
        />

        <span>
          <i className="fas fa-envelope"></i>
        </span>
      </div>

      <div
        className={!errorInPassword ? "input-group" : "input-group has-error"}
      >
        <input
          type="password"
          placeholder="Εισάγετε τον κωδικό σας..."
          value={password}
          onChange={e => {
            if (props.errorOccured) {
              props.removeError();
              setErrorInPassword(false);
            }
            setPassword(e.target.value);
          }}
        />

        <span>
          <i className="fas fa-key"></i>
        </span>
      </div>

      <div className="form-btn">
        <button
          className={props.canClickButton ? "btn" : "btn disabled"}
          disabled={!props.canClickButton}
        >
          Σύνδεση {!props.canClickButton && <span className="loading"></span>}
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = (state: State) => ({
  userId: state.admin.user.id,
  canClickButton: state.formButton.canClick,
  errorOccured: state.formError.errorOccured
});

export default connect(mapStateToProps, { login, setError, removeError })(
  Login
);
