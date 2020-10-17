import React from "react";

const Steps = (props: { currentStep: number }) => {
  return (
    <div className="steps">
      <div className="step">
        <p>ΒΗΜΑ 1 <i className={props.currentStep > 1 ? "far fa-check-circle finished" : "far fa-times-circle unfinished"}></i></p>
        <p>Τα στοιχεία σας</p>
      </div>

      <div className="step">
        <p>ΒΗΜΑ 2 <i className={props.currentStep > 2 ? "far fa-check-circle finished" : "far fa-times-circle unfinished"}></i></p>
        <p>Τρόπος Παραλαβής</p>
      </div>

      <div className="step">
        <p>ΒΗΜΑ 3 <i className={props.currentStep > 3 ? "far fa-check-circle finished" : "far fa-times-circle unfinished"}></i></p>
        <p>Τρόπος Πληρωμής</p>
      </div>

      
    </div>
  );
};

export default Steps;
