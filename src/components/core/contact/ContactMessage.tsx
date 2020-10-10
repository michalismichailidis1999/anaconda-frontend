import React, { useState } from "react";
import { connect } from "react-redux";
import { sendMessage } from "../../../actions/message";

const ContactMessage = (props: { sendMessage: Function }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const resetValues = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");
  };

  const handleSubmit = () => {
    props.sendMessage({ firstName, lastName, email, message });
    resetValues();
  };

  return (
    <div className="contact-message">
      <form
        onSubmit={e => {
          e.preventDefault();

          handleSubmit();
        }}
      >
        <div className="input-group">
          <input
            type="text"
            placeholder="Όνομα..."
            required={true}
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Επίθετο..."
            required={true}
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type="email"
            placeholder="Email..."
            required={true}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <textarea
            placeholder="Μήνυμα..."
            required={true}
            value={message}
            onChange={e => setMessage(e.target.value)}
          ></textarea>
        </div>

        <button className="btn">Αποστολή</button>
      </form>
    </div>
  );
};

export default connect(null, { sendMessage })(ContactMessage);
