import React, { useState, useEffect } from "react";
import {
  State,
  Product,
  History,
  CartItem,
  CartState
} from "../../../interfaces";
import { connect } from "react-redux";
import { getRecommendations } from "../../../actions/product";
import { scrollOnTopOfThePage } from "../../../helpers";

// Components
import CartLeft from "./CartLeft";
import CartRight from "./CartRight";
import ProductsGrid from "../product/ProductsGrid";

const Cart = (props: {
  recommendations: Product[];
  history: History;
  cart: CartState;
  getRecommendations: Function;
}) => {
  const [grid] = useState({
    title: "Προτεινόμενα",
    titleIcon: "fas fa-cart-arrow-down",
    paragraph: "Δείτε επίσης παρόμοια προϊόντα που μπορεί να σας αρέσουν."
  });

  const [cartItems, setCartItems] = useState([] as CartItem[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    scrollOnTopOfThePage();

    setCartItems(props.cart.cart);
    setLoading(false);

    if (props.cart.cart.length > 0) {
      props.getRecommendations(props.cart.cart[0].category_id);
    }

    document.querySelector("footer")!.classList.remove("no-mt-footer");
  }, []);

  useEffect(() => {
    setCartItems(props.cart.cart);
  }, [props.cart]);

  return (
    <div className="layout cart">
      {props.cart.loading ||
        (loading && (
          <div className="container">
            <div className="loading-cart">
              <p>Φόρτωση...</p>
            </div>
          </div>
        ))}

      {!props.cart.loading && !loading && cartItems.length > 0 && (
        <React.Fragment>
          <div className="cart-container">
            <CartLeft
              cartItems={cartItems}
              totalPrice={props.cart.totalPrice}
              totalProducts={props.cart.totalItems}
            />

            <CartRight
              totalPrice={props.cart.totalPrice}
              cartItems={cartItems}
            />
          </div>

          <div className="container">
            <ProductsGrid
              products={props.recommendations}
              title={grid.title}
              titleIcon={grid.titleIcon}
              paragraph={grid.paragraph}
              history={props.history}
            />
          </div>
        </React.Fragment>
      )}

      {!props.cart.loading && !loading && cartItems.length === 0 && (
        <div className="empty-cart">
          <p>Το καλάθι σας είναι άδειο αυτή τη στιγμή.</p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  recommendations: state.product.recommended_products,
  cart: state.cart
});

export default connect(mapStateToProps, { getRecommendations })(Cart);
