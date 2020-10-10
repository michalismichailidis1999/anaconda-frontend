import React from "react";
import { connect } from "react-redux";
import { hidePopup } from "../../../actions/message";

const Popup = (props: { hidePopup: Function }) => {
  return (
    <div className="success-message">
      <div className="box">
        <p>Το μήνυμα σας στάλθηκε επιτυχώς.</p>

        <p>Θα επικοινωνίσουμε σύντομα μαζί σας.</p>

        <p>
          Σας ευχαριστούμε{" "}
          <span role="img" aria-label="face">
            😄
          </span>
        </p>

        <span className="close-popup" onClick={() => props.hidePopup()}>
          <i className="far fa-times-circle"></i>
        </span>
      </div>
    </div>
  );
};

export default connect(null, { hidePopup })(Popup);
