import React from "react";
import { Link } from "react-router-dom";

const SideNavbar = (props: { cartItems: number }) => (
  <div className="side-nav">
    <ul>
      <li>
        <Link to="/" className="nav-link">
          Αρχική <i className="fas fa-home"></i>
        </Link>
      </li>
      <li>
        <Link to="/shop" className="nav-link">
          Προϊόντα <i className="fas fa-tags"></i>
        </Link>
      </li>
      <li>
        <Link to="/user" className="nav-link">
          Χρήστης <i className="fas fa-user"></i>
        </Link>
      </li>
      <li>
        <Link to="/contact" className="nav-link">
          Επικοινωνία <i className="fas fa-envelope"></i>
        </Link>
      </li>
      <li>
        <Link to="/cart" className="nav-link">
          Καλάθι{" "}
          <i className="fas fa-shopping-cart">
            <div>
              <span>{props.cartItems}</span>
            </div>
          </i>
        </Link>
      </li>
    </ul>
  </div>
);

export default SideNavbar;
