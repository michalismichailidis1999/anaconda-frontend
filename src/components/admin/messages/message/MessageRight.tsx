import React, { useState } from "react";
import { respondToClient } from "../../../../actions/admin/message";
import { connect } from "react-redux";

const MessageRight = (props: {
  respondToClient: Function;
  message: string;
  messageId: number;
  userId: string;
  token: string;
  email: string;
}) => {
  const [reply, setReply] = useState("");

  return (
    <div className="message-right">
      <h3>Μήνυμα</h3>

      <p>{props.message}</p>

      <h3>Απάντηση</h3>

      <textarea
        placeholder="Γράψε την απάντησή σου εδώ..."
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      ></textarea>

      {reply !== "" && (
        <button
          className="btn create-btn"
          onClick={() => {
            props.respondToClient(
              props.userId,
              props.token,
              props.email,
              reply
            );
            setReply("");
          }}
        >
          Αποστολή
        </button>
      )}
    </div>
  );
};

export default connect(null, { respondToClient })(MessageRight);
