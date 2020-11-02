import React, { useState, useEffect } from "react";
import { signup } from "../../../actions/user";
import { connect } from "react-redux";
import SignUpForm from "./form/SignUpForm";
import { validateEmail } from "../../../helpers";
import { State } from "../../../interfaces";
import { setError, removeError } from "../../../actions/formError";
import gsap, { TimelineLite, Power4 } from "gsap";

gsap.registerPlugin();

const SignUp = (props: {
  signup: Function;
  errorOccured: boolean;
  errorMessage: string;
  setError: Function;
  removeError:Function;
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [invalidInput, setInvalidInput] = useState("");
  const [formTl] = useState(new TimelineLite());

  useEffect(() => {
    formTl.fromTo(
      ".user-form",
      1,
      {
        x: 200,
        opacity: 0,
        ease: Power4,
      },
      {
        x: 0,
        opacity: 1,
      }
    );

    document.querySelector("footer")!.classList.remove("no-mt-footer");

    return () =>  props.removeError()
  }, []);

  const handleSubmit = () => {
    if (firstName === "") {
      setInvalidInput("firstName");
      props.setError("Παρακαλώ εισάγετε το όνομα σας");
      return;
    }

    if (firstName.length < 2) {
      setInvalidInput("firstName");
      props.setError("Το όνομα πρέπει να είναι τουλάχιστον 2 χαρακτήρες.");
      return;
    }

    if (lastName === "") {
      setInvalidInput("lastName");
      props.setError("Παρακαλώ εισάγετε το επίθετο σας");
      return;
    }

    if (lastName.length < 2) {
      setInvalidInput("lastName");
      props.setError("Το επίθετο πρέπει να είναι τουλάχιστον 2 χαρακτήρες.");
      return;
    }

    if (email === "") {
      setInvalidInput("email");
      props.setError("Παρακαλώ εισάγετε το email σας");
      return;
    }

    if (!validateEmail(email)) {
      setInvalidInput("email");
      props.setError("Παρακαλώ εισάγετε έγκυρο email");
      return;
    }

    if (password === "") {
      setInvalidInput("password");
      props.setError("Παρακαλώ εισάγετε κωδικό πρόσβασης");
      return;
    }

    if (password.length < 8) {
      setInvalidInput("password");
      props.setError(
        "Ο κωδικός πρόσβασης πρέπει να είναι τουλάχιστον 8 χαρακτήρες"
      );
      return;
    }

    if (password !== confirmPassword) {
      setInvalidInput("confirmPassword");
      props.setError("Οι κωδικοί δεν ταιριάζουν");
      return;
    }

    props.signup({ firstName, lastName, email, password });
  };

  return (
    <div className="layout sign-form">
      <div className="centered-everything">
        <div className="container-centered">
          <div
          className="form-error"
          style={props.errorOccured ? {} : { display: "none" }}
          >
            <p>{props.errorMessage}</p>
          </div>

          <SignUpForm
            firstName={firstName}
            lastName={lastName}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setEmail={setEmail}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            handleSubmit={handleSubmit}
            invalidInput={invalidInput}
            setInvalidInput={setInvalidInput}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  errorOccured: state.formError.errorOccured,
  errorMessage: state.formError.errorMessage,
});

export default connect(mapStateToProps, { signup, setError, removeError })(SignUp);
