import React, { useState, useEffect } from "react";
import SignInForm from "./form/SignInForm";
import gsap, { TimelineLite, Power4 } from "gsap";
import { validateEmail } from "../../../helpers";
import { State } from "../../../interfaces";
import { setError } from "../../../actions/formError";
import { connect } from "react-redux";
import { signin } from "../../../actions/user";
import {useHistory} from 'react-router-dom';

gsap.registerPlugin();

const SignIn = (props: {
  setError: Function;
  errorOccured: boolean;
  errorMessage: string;
  signin: Function;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidInput, setInvalidInput] = useState("");
  const [formTl] = useState(new TimelineLite());

  const history = useHistory();

  useEffect(() => {
    formTl.fromTo(
      "form.user-form",
      1,
      {
        x: 100,
        opacity: 0,
        ease: Power4,
      },
      {
        x: 0,
        opacity: 1,
      }
    );

    document.querySelector("footer")!.classList.remove("no-mt-footer");
  }, []);

  const handleSubmit = () => {
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

    props.signin({ email, password });
  };

  return (
    <div className="layout sign-form">
      <div
        className="form-error"
        style={props.errorOccured ? {} : { display: "none" }}
      >
        <p>{props.errorMessage}</p>
      </div>

      <SignInForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        invalidInput={invalidInput}
        setInvalidInput={setInvalidInput}
      />

      <div className="check-order-link">
        <span onClick={() => {
          // redirect
        }}>Μπορείς να ελέγξεις την παραγγελία σου εδώ χωρίς να κάνεις εγγραφή ή σύνδεση.</span>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  errorOccured: state.formError.errorOccured,
  errorMessage: state.formError.errorMessage,
});

export default connect(mapStateToProps, { setError, signin })(SignIn);
