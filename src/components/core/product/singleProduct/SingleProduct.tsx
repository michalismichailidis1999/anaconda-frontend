import React, { useEffect } from "react";
import {
  State,
  Product,
  ProductComment,
  ProductRate as Rate,
  History
} from "../../../../interfaces";
import { connect } from "react-redux";
import { getProduct } from "../../../../actions/product";
import { scrollOnTopOfThePage } from "../../../../helpers";

// Components
import SingleProductDetails from "./SingleProductDetails";
import ProductRate from "./ProdutRate";
import Comments from "./Comments";

const SingleProduct = (props: {
  productFetched: boolean;
  getProduct: Function;
  productPageClicked: boolean;
  history: History;
  userId: string;
}) => {
  useEffect(() => {
    scrollOnTopOfThePage();

    document.querySelector("footer")!.classList.add("no-mt-footer");

    if (!props.productPageClicked) {
      props.getProduct(window.location.pathname.split("/")[2], props.userId);
    }
  }, []);

  return (
    <div className="layout single-product">
      {props.productFetched ? (
        <React.Fragment>
          <SingleProductDetails history={props.history} />

          <ProductRate history={props.history} />

          <Comments history={props.history} />
        </React.Fragment>
      ) : (
        <div className="container">
          <div className="loading-products">Φόρτωση...</div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  productFetched: state.product.productFetched,
  productPageClicked: state.app.productPageClicked,
  userId: state.user.user.id
});

export default connect(mapStateToProps, { getProduct })(SingleProduct);
