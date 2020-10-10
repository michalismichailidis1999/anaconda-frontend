import React from "react";
import { connect } from "react-redux";
import { History, Product } from "../../../../interfaces";
import { addToCart } from "../../../../actions/cart";
import { getRecommendations } from "../../../../actions/product";

const DetailsRight = (props: {
  productName: string;
  productCategory: string;
  productDescription: string;
  productOldPrice: number;
  productPrice: number;
  productId: string;
  onSale: boolean;
  productRate: number;
  productQuantity: number;
  history: History;
  addToCart: Function;
  product: Product;
  getRecommendations: Function;
}) => {
  return (
    <div className="details-right">
      <h2 className="product-name">{props.productName}</h2>

      <p className="category-name">{props.productCategory}</p>

      <p className="description">{props.productDescription}</p>

      <div className="availability">
        <span
          className={
            props.productQuantity > 25
              ? "available"
              : props.productQuantity < 25 && props.productQuantity > 0
              ? "limited"
              : "non-available"
          }
        >
          {props.productQuantity > 25
            ? "Διαθέσιμο"
            : props.productQuantity < 25 && props.productQuantity > 0
            ? "Περιορισμένο"
            : "Μη Διαθέσιμο"}
        </span>
      </div>

      <div className="price-rate">
        <div>
          {props.onSale && (
            <span className="old-price">{props.productOldPrice}€</span>
          )}
          <span className="price">{props.productPrice}€</span>
        </div>

        <div>
          {[1, 2, 3, 4, 5].map((rate, i) => (
            <i
              className="fas fa-star"
              key={i}
              style={
                props.productRate >= rate
                  ? { color: "yellow" }
                  : { color: "#999" }
              }
            ></i>
          ))}
        </div>
      </div>

      <button
        className="btn"
        onClick={() => {
          props.addToCart(props.product);
          props.getRecommendations(props.product.category_id);
          setTimeout(() => {
            props.history.push("/cart");
          }, 200);
        }}
      >
        Προσθήκη στο καλάθι <i className="fas fa-shopping-basket"></i>
      </button>
    </div>
  );
};

export default connect(null, { addToCart, getRecommendations })(DetailsRight);
