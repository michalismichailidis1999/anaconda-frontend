import React from "react";

const Steps = (props: { currentStep: number }) => {
  return (
    <div className="steps">
      <div className={props.currentStep > 1 ? "step finished" : "step current"}>
        <div
          className={
            props.currentStep === 1
              ? "step-transition-line unfinished"
              : "step-transition-line finished"
          }
        ></div>

        <span>
          <i className="far fa-address-book"></i>
        </span>
      </div>

      <div
        className={
          props.currentStep === 1
            ? "step unfinished"
            : props.currentStep === 2
            ? "step current"
            : "step finished"
        }
      >
        <div
          className={
            props.currentStep <= 2
              ? "step-transition-line unfinished"
              : "step-transition-line finished"
          }
        ></div>

        <span>
          <i className="fas fa-truck"></i>
        </span>
      </div>

      <div
        className={
          props.currentStep <= 2
            ? "step unfinished"
            : props.currentStep === 3
            ? "step current"
            : "step finished"
        }
      >
        <span>
          <i className="fas fa-money-bill-wave"></i>
        </span>
      </div>
    </div>
  );
};

export default Steps;
