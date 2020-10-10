import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { State } from "../../../interfaces";
import { setShowMessages } from "../../../actions/admin/message";

// Components
import ShowMessages from "./showMessages/ShowMessages";
import Message from "./message/Message";

const Messages = (props: {
  setShowMessages: Function;
  showMessages: boolean;
}) => {
  const [showMessages, setShowMessages] = useState(props.showMessages);

  useEffect(() => {
    let query = window.location.search;

    if (query.split("&").length > 1) {
      props.setShowMessages(false);
    } else {
      if (!showMessages) {
        setShowMessages(true);
      }
    }
  }, []);

  useEffect(() => {
    if (props.showMessages !== showMessages) {
      setShowMessages(props.showMessages);
    }
  }, [props.showMessages]);

  return (
    <div className="messages">
      <h2>
        Μηνύματα <i className="fas fa-envelope"></i>
      </h2>

      {showMessages && <ShowMessages />}

      {!showMessages && <Message />}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  showMessages: state.admin.message.showMessages,
});

export default connect(mapStateToProps, { setShowMessages })(Messages);
