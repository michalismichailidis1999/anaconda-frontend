import React from "react";
import {useHistory} from 'react-router-dom';

const PageNotFound = () => {
  const history = useHistory();
  return (
    <div className="page-not-found">
      <p>
        Error 404 Page Not Found <i className="far fa-frown"></i>
      </p>
      <button onClick={() => history.push("/")}>
        <i className="fas fa-long-arrow-alt-left"></i> Πίσω
      </button>
    </div>
  );
};

export default PageNotFound;
