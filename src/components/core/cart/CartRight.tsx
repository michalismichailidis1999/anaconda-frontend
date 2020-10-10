import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startCheckout } from "../../../actions/checkout";

// Components
import Item from "./Item";

const CartRight = (props: {
  cartItems: {
    id: string;
    category_name: string;
    quantity: number;
    price: number;
    image: string;
    name: string;
    category_id: string;
  }[];
  totalPrice: number;
  startCheckout: Function;
}) => {
  return (
    <div className="cart-right">
      <div className="cart-right-heading">
        <h4>Σύνολο Αγορών</h4>
      </div>

      <div className="total-cart-items">
        {props.cartItems.map((item, i) => (
          <Item cartItem={item} key={i} />
        ))}
      </div>

      <div className="cart-right-bottom">
        <div className="total">
          <span>Σύνολο</span>
          <span>{props.totalPrice}€</span>
        </div>

        <div className="checkout-btn">
          <Link to="/checkout" onClick={() => props.startCheckout()}>
            <button className="btn">Ολοκλήρωση</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { startCheckout })(CartRight);
