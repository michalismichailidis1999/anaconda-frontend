import React, { useState } from "react";
import { History, AppState, State } from "../../../../interfaces";
import { connect } from "react-redux";
import { rateProduct } from "../../../../actions/product";

const RateProduct = (props: {
  isAuthenticated: boolean;
  userId: string;
  token: string;
  productId: string;
  history: History;
  myRate: number;
  rateProduct: Function;
  helper: AppState;
}) => {
  const [rate, setRate] = useState(props.myRate);

  return (
    <div className="rate-product">
      <h4>Αξιολογήστε το προϊόν</h4>

      <div className="stars">
        {[1, 2, 3, 4, 5].map((r, i) => (
          <i
            className="fas fa-star"
            key={i}
            style={rate >= r ? { color: "yellow" } : { color: "#ccc" }}
            onClick={() => {
              if (props.isAuthenticated) {
                let updateRate = true;

                if (rate === 0) {
                  updateRate = false;
                }

                setRate(r);
                props.rateProduct(
                  props.userId,
                  props.token,
                  props.productId,
                  r,
                  updateRate
                );
              } else {
                props.history.push("/signin");
              }
            }}
          ></i>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  helper: state.app,
  isAuthenticated: state.user.isAuthenticated,
  token: state.user.token,
  userId: state.user.user.id,
  productId: state.product.product.id,
  myRate: state.product.myProductRate,
});

export default connect(mapStateToProps, {
  rateProduct,
})(RateProduct);
