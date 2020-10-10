import React from "react";
import { History, ProductRate as Rate } from "../../../../interfaces";

// Components
import Rates from "./Rates";
import RateProduct from "./RateProduct";

const ProductRate = (props: { history: History }) => {
  return (
    <div className="product-rate">
      <Rates />

      <RateProduct history={props.history} />
    </div>
  );
};

export default ProductRate;
