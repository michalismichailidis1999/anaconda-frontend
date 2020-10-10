import React from "react";
import { Product, State, History } from "../../../../interfaces";
import { connect } from "react-redux";

// Components
import DetailsLeft from "./DetailsLeft";
import DetailsRight from "./DetailsRight";

const SingleProductDetails = (props: {
  product: Product;
  productCategory: string;
  history: History;
}) => {
  return (
    <div className="single-product-details">
      <DetailsLeft
        productImages={[
          props.product.image,
          props.product.image2 ? props.product.image2 : "",
          props.product.image3 ? props.product.image3 : "",
          props.product.image4 ? props.product.image4 : ""
        ]}
        onSale={props.product.on_sale === 1 ? true : false}
        oldPrice={props.product.price}
        newPrice={props.product.new_price}
      />

      <DetailsRight
        productCategory={props.productCategory}
        productDescription={props.product.description}
        productName={props.product.name}
        productId={props.product.id}
        productOldPrice={props.product.price}
        productPrice={
          props.product.on_sale === 1
            ? props.product.new_price
            : props.product.price
        }
        onSale={props.product.on_sale === 1 ? true : false}
        productRate={props.product.rate}
        productQuantity={props.product.quantity}
        history={props.history}
        product={props.product}
      />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  product: state.product.product,
  productCategory: state.product.productCategory
});

export default connect(mapStateToProps, {})(SingleProductDetails);
