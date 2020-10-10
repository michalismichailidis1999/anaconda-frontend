import React from "react";

const DetailBox = (props: {
  detailBox: { icon: string; detail: string; breakLineString: string };
}) => (
  <div className="detail-box">
    <div className="icon">
      <i className={props.detailBox.icon}></i>
    </div>

    <div className="detail">
      <span>
        {props.detailBox.detail}{" "}
        <span
          className="break-line"
          style={
            props.detailBox.breakLineString === "" ? { display: "none" } : {}
          }
        >
          {props.detailBox.breakLineString}
        </span>
      </span>
    </div>
  </div>
);

export default DetailBox;
