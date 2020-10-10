import React from "react";
import { Link } from "react-router-dom";

// Components
import CartItem from "./CartItem";

const CartLeft = (props: {
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
  totalProducts: number;
}) => {
  return (
    <div className="cart-left">
      <div className="cart-left-heading">
        <div>
          <span>
            Το καλάθι μου <i className="fas fa-shopping-cart"></i>
          </span>
        </div>

        <div>
          <span>{props.totalProducts} {props.totalProducts > 1 ? "Προϊόντα" : "Προϊόν"}</span>
        </div>
      </div>

      <div className="cart-items">
        {props.cartItems.map((cartItem, i) => (
          <CartItem cartItem={cartItem} key={i} />
        ))}
      </div>

      <div className="cart-left-bottom">
        <div>
          <span>Σύνολο</span>
        </div>

        <div>
          <span>{props.totalPrice}€</span>
        </div>
      </div>

      <Link to="/shop" className="continue-shopping">
        <button className="btn">Συνέχεια Αγορών</button>
      </Link>
    </div>
  );
};

export default CartLeft;
