import React from "react";

const Item = (props: {
  cartItem: {
    id: string;
    category_name: string;
    quantity: number;
    price: number;
    image: string;
    name: string;
    category_id: string;
  };
}) => {
  return (
    <div className="item">
      <div className="item-details">
        <div>
          <img
            src={props.cartItem.image}
            alt="Product"
          />
        </div>

        <div>
          <span>{props.cartItem.name}</span>
          <span>{props.cartItem.category_name}</span>
        </div>
      </div>

      <div className="item-price">
        <span>{props.cartItem.price * props.cartItem.quantity}€</span>
      </div>
    </div>
  );
};

export default Item;
