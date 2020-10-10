import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { goToNextStep, addExtraPrice } from "../../../actions/checkout";
import { scrollOnTopOfThePage } from "../../../helpers";

const Delivery = (props: {
  goToNextStep: Function;
  addExtraPrice: Function;
}) => {
  const [choosedWay, setChoosedWay] = useState(1);

  useEffect(() => {
    scrollOnTopOfThePage();
  }, []);

  return (
    <div className="ways-to-choose">
      <h4>Επιλέξτε πως θέλετε να παραλάβετε την παραγγελία σας.</h4>

      <div className="radio-cards">
        <div className="radio-card">
          <span
            className="radio"
            onClick={() => {
              if (choosedWay !== 1) {
                setChoosedWay(1);
              }
            }}
          >
            {choosedWay === 1 && <span className="checked"></span>}
          </span>

          <span className="text">Κατ'οίκον παράδοση</span>

          <span className="icon">
            <i className="fas fa-truck"></i>
          </span>
        </div>

        <div className="radio-card">
          <span
            className="radio"
            onClick={() => {
              if (choosedWay !== 2) {
                setChoosedWay(2);
              }
            }}
          >
            {choosedWay === 2 && <span className="checked"></span>}
          </span>

          <span className="text">
            Παραλαβή από <br /> κατάστημα
          </span>

          <span className="icon">
            <i className="fas fa-store"></i>
          </span>
        </div>
      </div>

      <button
        className="btn"
        onClick={() => {
          if (choosedWay === 1) {
            props.addExtraPrice();
          }
          props.goToNextStep();
        }}
      >
        Συνέχεια
      </button>
    </div>
  );
};

export default connect(null, { goToNextStep, addExtraPrice })(Delivery);
