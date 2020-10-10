import React, { useState } from "react";
import { connect } from "react-redux";
import { State } from "../../interfaces";
import { validateLogin } from "../../actions/admin/user";
import { setError, removeError } from "../../actions/formError";

const ValidateLogin = (props: {
  canClickButton: boolean;
  setError: Function;
  removeError: Function;
  validateLogin: Function;
  email: string;
  errorOccured: boolean;
}) => {
  const [extraPassword, setExtraPassword] = useState("");
  const [errorInExtraPassword, setErrorInExtraPassword] = useState(false);

  const handleSubmit = () => {
    if (extraPassword === "") {
      setErrorInExtraPassword(true);
      props.setError("");
      return;
    }

    props.validateLogin(props.email, extraPassword);
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();

        handleSubmit();
      }}
    >
      <h3>
        Επιβεβαίωση Admin <i className="fas fa-user-shield"></i>
      </h3>

      <div
        className={
          !errorInExtraPassword ? "input-group" : "input-group has-error"
        }
      >
        <input
          type="text"
          placeholder="Εισάγετε τον κωδικό που στάλθηκε στο κινητό σας..."
          value={extraPassword}
          onChange={e => {
            if (props.errorOccured) {
              props.removeError();
              setErrorInExtraPassword(false);
            }
            setExtraPassword(e.target.value);
          }}
        />

        <span>
          <i className="fas fa-lock"></i>
        </span>
      </div>

      <div className="form-btn">
        <button
          className={props.canClickButton ? "btn" : "btn disabled"}
          disabled={!props.canClickButton}
        >
          Επιβεβαίωση{" "}
          {!props.canClickButton && <span className="loading"></span>}
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = (state: State) => ({
  canClickButton: state.formButton.canClick,
  errorOccured: state.formError.errorOccured
});

export default connect(mapStateToProps, {
  setError,
  removeError,
  validateLogin
})(ValidateLogin);
