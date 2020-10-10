import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TimelineLite, Power4 } from "gsap";
import { connect } from "react-redux";
import { State, CartState } from "../../interfaces";

// components
import SideNavbar from "./SideNavbar";

export interface Props {
  cart: CartState;
  paymentBegin: boolean;
  paymentEnd: boolean;
}

const Navbar = (props: {
  cart: CartState;
  paymentBegin: boolean;
  paymentEnd: boolean;
}) => {
  const [sideNavTl] = useState(new TimelineLite({ paused: true }));
  const [showSideNav, setShowSideNav] = useState(false);
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    setCartItems(props.cart.totalItems);

    sideNavTl.fromTo(
      ".side-nav",
      0.7,
      { right: -180, ease: Power4 },
      { right: 0 }
    );
  }, []);

  useEffect(() => {
    setCartItems(props.cart.totalItems);
  }, [props.cart]);

  const handleClick = () => {
    if (showSideNav) {
      if (!sideNavTl.isActive()) {
        sideNavTl.reverse();
        setShowSideNav(false);
      }
    } else {
      if (!sideNavTl.isActive()) {
        sideNavTl.play();
        setShowSideNav(true);
      }
    }
  };
  return (
    <nav data-testid="navbar">
      <div className="logo">
        <h1>Anakonta</h1>
      </div>

      <div className="nav-links">
        <ul>
          <li className="hamburger" onClick={() => handleClick()}>
            <i className={!showSideNav ? "fas fa-bars" : "fas fa-times"}></i>
          </li>
          <li className="if-sidebar-display-none">
            <Link to="/" className="nav-link">
              Αρχική <i className="fas fa-home"></i>
            </Link>
          </li>
          <li className="if-sidebar-display-none">
            <Link to="/shop" className="nav-link">
              Προϊόντα <i className="fas fa-tags"></i>
            </Link>
          </li>
          <li className="if-sidebar-display-none">
            <Link to="/user" className="nav-link">
              Χρήστης <i className="fas fa-user"></i>
            </Link>
          </li>
          <li className="if-sidebar-display-none">
            <Link to="/contact" className="nav-link">
              Επικοινωνία <i className="fas fa-envelope"></i>
            </Link>
          </li>
          <li className="if-sidebar-display-none">
            <Link to="/cart" className="nav-link">
              Καλάθι{" "}
              <i className="fas fa-shopping-cart">
                <div>
                  <span>{cartItems}</span>
                </div>
              </i>
            </Link>
          </li>
        </ul>
      </div>

      <SideNavbar cartItems={cartItems} />
    </nav>
  );
};

const mapStateToProps = (state: State) => ({
  cart: state.cart,
  paymentBegin: state.checkout.paymentBegin,
  paymentEnd: state.checkout.paymentEnd
});

export default connect(mapStateToProps)(Navbar);
