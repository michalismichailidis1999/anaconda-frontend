import React, { useState } from "react";
import { connect } from "react-redux";
import {
  deleteMessage,
  updateMessage,
} from "../../../../actions/admin/message";
import Moment from "react-moment";

const MessageLeft = (props: {
  deleteMessage: Function;
  updateMessage: Function;
  firstName: string;
  lastName: string;
  email: string;
  messageId: number;
  checked: number;
  userId: string;
  token: string;
  created_at: string;
}) => {
  const [checked, setChecked] = useState(props.checked === 1 ? true : false);
  const [checkedChanged, setCheckedChanged] = useState(false);

  return (
    <div className="message-left">
      <h3>Στοιχεία Αποστολέα</h3>

      <ul>
        <li>
          Όνομα: <span>{props.firstName}</span>
        </li>
        <li>
          Επίθετο: <span>{props.lastName}</span>
        </li>
        <li>
          Email: <span>{props.email}</span>
        </li>
        <li>
          Στάλθηκε:{" "}
          <span>
            <Moment format="DD/MM/YYYY hh:mm">{props.created_at}</Moment>
          </span>
        </li>
      </ul>

      <div className="clickables">
        <div>
          <span
            className={checked ? "tick-box ticked" : "tick-box unticked"}
            onClick={() => {
              if (!checkedChanged) {
                setCheckedChanged(true);
              }

              setChecked(!checked);
            }}
          ></span>{" "}
          Ελέγχθηκε
        </div>

        {checkedChanged && (
          <button
            className="btn save-btn"
            onClick={() => {
              props.updateMessage(
                props.userId,
                props.token,
                props.messageId,
                checked
              );
            }}
          >
            Αποθήκευση
          </button>
        )}

        <button
          className="btn delete-btn"
          onClick={() => {
            if (
              window.confirm(
                "Είστε σίγουρος ότι θέλετε να διαγράψετε αυτό το μήνυμα?"
              )
            ) {
              props.deleteMessage(props.userId, props.token, props.messageId);
            }
          }}
        >
          Διαγραφή
        </button>
      </div>
    </div>
  );
};

export default connect(null, { deleteMessage, updateMessage })(MessageLeft);
