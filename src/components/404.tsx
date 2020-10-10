import React from "react";

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <p>
        Error 404 Page Not Found <i className="far fa-frown"></i>
      </p>
      <button onClick={() => {}}>
        <i className="fas fa-long-arrow-alt-left"></i> Πίσω
      </button>
    </div>
  );
};

export default PageNotFound;
