import React from "react";

const Box = (props: {
  extraClass: string;
  icon: string;
  text: string;
  total: number;
}) => {
  return (
    <div className={`box ${props.extraClass}`}>
      <div className="box-icon">
        <i className={props.icon}></i>
      </div>

      <div className="box-text">
        <span>{props.text}</span>
        <span>Σύνολο: {props.total}</span>
      </div>
    </div>
  );
};

export default Box;
