import React from "react";
import { Query, History } from "../../../../interfaces";
import { setInitialQuery } from "../../../../actions/app";
import { connect } from "react-redux";

const HomeTag = (props: {
  title: string;
  paragraph: string;
  icon: string;
  url: string;
  setQueryTo: Query;
  history: History;
  setInitialQuery: Function;
}) => {
  return (
    <div className="home-tag">
      <div className="icon">
        <i className={props.icon}></i>
      </div>

      <h2>{props.title}</h2>

      <p>{props.paragraph}</p>

      <div className="btn-center">
        <button
          className="btn"
          onClick={() => {
            props.setInitialQuery(props.setQueryTo);

            props.history.push(props.url);
          }}
        >
          Δείτε Εδώ <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default connect(null, { setInitialQuery })(HomeTag);
