import React, { useEffect } from "react";
import { connect } from "react-redux";
import { State, MessageState } from "../../../interfaces";
import { scrollOnTopOfThePage } from "../../../helpers";

// Components
import ContectDetails from "./ContactDetails";
import ContactMessage from "./ContactMessage";
import Popup from "./Popup";

const Contact = (props: { message: MessageState }) => {
  useEffect(() => {
    scrollOnTopOfThePage();

    document.querySelector("footer")!.classList.remove("no-mt-footer");
  }, []);

  return (
    <div className="layout contact">
      <div className="centered-everything">
        <div className="container-centered">
          <h1>Επικοινωνίστε μαζί μας</h1>

          <div className="contact-container">
            <ContectDetails />

            <ContactMessage />
          </div>

          {props.message.showPopup && <Popup />}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  message: state.message
});

export default connect(mapStateToProps, {})(Contact);
