import React from "react";
import { connect } from "react-redux";
import { State, Message } from "../../../../interfaces";
import {
  setShowMessages,
  fetchMessage,
} from "../../../../actions/admin/message";
import Moment from "react-moment";
import { useHistory } from "react-router-dom";

const Table = (props: {
  setShowMessages: Function;
  fetchMessage: Function;
  userId: string;
  token: string;
  messages: Message[];
  messagesFetched: boolean;
  fetchingMessages: boolean;
}) => {
  const history = useHistory();

  return (
    <React.Fragment>
      {props.fetchingMessages && (
        <div className="loading-message">
          <p>Φόρτωση...</p>
        </div>
      )}

      {props.messagesFetched && props.messages.length === 0 && (
        <div className="empty-message">
          <p>Δεν υπάρχουν μηνύματα προς το παρόν.</p>
        </div>
      )}

      {props.messagesFetched && props.messages.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Όνομα</th>
              <th>Επίθετο</th>
              <th>Email</th>
              <th>Στάλθηκε</th>
              <th>Μήνυμα</th>
              <th>Διαβάστηκε</th>
            </tr>
          </thead>

          <tbody>
            {props.messages.map((message, i) => (
              <tr key={i}>
                <td>{message.first_name}</td>
                <td>{message.last_name}</td>
                <td>{message.email}</td>
                <td>
                  <Moment format="DD/MM/YYYY hh:mm">
                    {message.created_at}
                  </Moment>
                </td>
                <td
                  className="icon"
                  onClick={() => {
                    props.fetchMessage(props.userId, props.token, message.id);
                    props.setShowMessages(false);
                    history.push(
                      `/admin/dashboard?view_messages&message=${message.id}`
                    );
                  }}
                >
                  <i className="fab fa-readme"></i>
                </td>
                {message.checked === 1 ? (
                  <td className="checked">
                    <i className="far fa-check-circle"></i>
                  </td>
                ) : (
                  <td className="unchecked">
                    <i className="far fa-times-circle"></i>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: State) => ({
  userId: state.admin.user.id,
  token: state.admin.user.token,
  fetchingMessages: state.admin.message.fetchingMessages,
  messagesFetched: state.admin.message.messagesFetched,
  messages: state.admin.message.messages,
});

export default connect(mapStateToProps, { setShowMessages, fetchMessage })(
  Table
);
