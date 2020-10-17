import React from "react";
import { Product, History, State } from "../../../interfaces";
import { connect } from "react-redux";
import { getRecommendations, getProduct } from "../../../actions/product";
import { addToCart } from "../../../actions/cart";
import { Link } from "react-router-dom";
import { clickOnProductPage } from "../../../actions/app";

const Card = (props: {
  product: Product;
  getRecommendations: Function;
  history: History;
  addToCart: Function;
  getProduct: Function;
  clickOnProductPage: Function;
  userId: string;
}) => {
  return (
    <div className="card">
      <div
        style={props.product.on_sale === 1 ? {} : { display: "none" }}
        className="card-sale"
      >
        <span>
          -
          {Math.floor(
            ((props.product.price - props.product.new_price) /
              props.product.price) *
              100
          )}
          %
        </span>
      </div>

      <div className="card-head">
        <Link
          to={`/product/${props.product.id}`}
          onClick={() => {
            props.clickOnProductPage();
            props.getProduct(props.product.id, props.userId);
          }}
        >
          <img
            src={props.product.image}
            alt={props.product.description}
          />
        </Link>
      </div>

      <div className="card-body">
        <div className="availability">
          <p
            className={
              props.product.quantity > 25
                ? "available"
                : props.product.quantity <= 25 && props.product.quantity > 0
                ? "limited"
                : "non-available"
            }
          >
            {props.product.quantity > 25
              ? "Διαθέσιμο"
              : props.product.quantity <= 25 && props.product.quantity > 0
              ? "Περιορισμένο"
              : "Μη Διαθέσιμο"}
          </p>
        </div>

        <h2>{props.product.name}</h2>

        <p>
          <label>Αξιολόγηση</label>{" "}
          <span>
            {[1, 2, 3, 4, 5].map(rate => (
              <i
                key={rate}
                style={
                  props.product.rate > 0 && props.product.rate >= rate
                    ? { color: "yellow" }
                    : { color: "gray" }
                }
                className="fas fa-star"
              ></i>
            ))}
          </span>
        </p>

        <p>
          <label>Τιμή</label>{" "}
          <span
            style={props.product.on_sale === 1 ? {} : { display: "none" }}
            className="old-price"
          >
            {props.product.price}€
          </span>{" "}
          <span className="price">
            {props.product.on_sale === 0
              ? props.product.price
              : props.product.new_price}
            €
          </span>
        </p>

        <p className="view-details">
          <Link
            className="product-link"
            to={`/product/${props.product.id}`}
            onClick={() => {
              props.clickOnProductPage();
              props.getProduct(props.product.id, props.userId);
            }}
          >
            Λεπτομέρειες Προϊόντος
          </Link>
        </p>

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
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  userId: state.user.user.id
});

export default connect(mapStateToProps, {
  getRecommendations,
  addToCart,
  getProduct,
  clickOnProductPage
})(Card);
