import React from "react";
import { Link } from "react-router-dom";

const AboveNavbar = () => (
  <div className="above-nav">
    <div className="above-nav-section-1">
      <span>
        <i className="fas fa-mobile-alt"></i> +30 6947031634
      </span>

      <span>
        <i className="fas fa-at"></i> mixalismixailidis857@gmail.com
      </span>
    </div>

    <div className="above-nav-section-2">
      <span>
        <Link to="/user?my_orders" className="above-nav-link">
          Οι παραγγελίες μου
        </Link>
      </span>

      <span>
        <Link to="/signup" className="above-nav-link">
          Εγγραφή
        </Link>{" "}
        <span className="space">|</span>
        <Link to="/signin" className="above-nav-link">
          Σύνδεση
        </Link>
      </span>
    </div>
  </div>
);

export default AboveNavbar;
