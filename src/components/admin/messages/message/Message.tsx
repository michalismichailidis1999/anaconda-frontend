import React, { useEffect } from "react";
import { connect } from "react-redux";
import { State, Message as MessageObj } from "../../../../interfaces";
import {
  setShowMessages,
  fetchMessage,
} from "../../../../actions/admin/message";
import { useHistory } from "react-router-dom";

// Components
import MessageLeft from "./MessageLeft";
import MessageRight from "./MessageRight";

const Message = (props: {
  setShowMessages: Function;
  message: MessageObj;
  messageFetched: boolean;
  fetchingMessage: boolean;
  messageUpdated: boolean;
  messageDeleted: boolean;
  answerSent: boolean;
  userId: string;
  token: string;
  fetchMessage: Function;
}) => {
  const history = useHistory();

  useEffect(() => {
    if (props.message.id === -9999) {
      let id = window.location.search.split("&")[1].split("=")[1];
      props.fetchMessage(props.userId, props.token, id);
    }
  }, []);

  useEffect(() => {
    if (props.messageUpdated) {
      history.push("/admin/dashboard?view_messages");
      props.setShowMessages(true);
    }
  }, [props.messageUpdated]);

  useEffect(() => {
    if (props.messageDeleted) {
      history.push("/admin/dashboard?view_messages");
      props.setShowMessages(true);
    }
  }, [props.messageDeleted]);

  useEffect(() => {
    if (props.answerSent) {
      history.push("/admin/dashboard?view_messages");
      props.setShowMessages(true);
    }
  }, [props.answerSent]);

  return (
    <div className="message">
      {props.fetchingMessage && (
        <div className="loading-message">
          <p>Φόρτωση...</p>
        </div>
      )}

      {props.messageFetched && (
        <React.Fragment>
          <MessageLeft
            firstName={props.message.first_name}
            lastName={props.message.last_name}
            email={props.message.email}
            checked={props.message.checked}
            messageId={props.message.id}
            userId={props.userId}
            token={props.token}
            created_at={props.message.created_at}
          />

          <MessageRight
            userId={props.userId}
            token={props.token}
            message={props.message.message}
            messageId={props.message.id}
            email={props.message.email}
          />
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  message: state.admin.message.message,
  messageFetched: state.admin.message.messageFetched,
  fetchingMessage: state.admin.message.fetchingMessage,
  userId: state.admin.user.id,
  token: state.admin.user.token,
  messageUpdated: state.admin.message.messageUpdated,
  messageDeleted: state.admin.message.messageDeleted,
  answerSent: state.admin.message.answerSent,
});

export default connect(mapStateToProps, {
  setShowMessages,
  fetchMessage,
})(Message);
