import React from "react";
import { Link } from "react-router-dom";
import { changeQuantity, removeFromCart } from "../../../actions/cart";
import { connect } from "react-redux";

const CartItem = (props: {
  cartItem: {
    id: string;
    category_name: string;
    quantity: number;
    price: number;
    image: string;
    name: string;
    category_id: string;
  };
  changeQuantity: Function;
  removeFromCart: Function;
}) => {
  return (
    <div className="cart-item">
      <div className="item-details">
        <div className="item-img">
          <Link className="link-img" to={`/product/${props.cartItem.id}`}>
            <img
              src={props.cartItem.image}
              alt="Product"
            />
          </Link>
        </div>

        <div className="item-name">
          <span>{props.cartItem.name}</span>
          <span>{props.cartItem.category_name}</span>
          <span>{props.cartItem.price}€</span>
        </div>
      </div>

      <div className="item-quantity">
        <span onClick={() => props.changeQuantity(props.cartItem.id, "+")}>
          <i className="fas fa-plus"></i>
        </span>

        <span>{props.cartItem.quantity}</span>

        <span onClick={() => props.changeQuantity(props.cartItem.id, "-")}>
          <i className="fas fa-minus"></i>
        </span>
      </div>

      <div className="remove-item-button">
        <span onClick={() => props.removeFromCart(props.cartItem.id)}>
          <i className="fas fa-trash-alt"></i>
        </span>
      </div>
    </div>
  );
};

export default connect(null, { changeQuantity, removeFromCart })(CartItem);
