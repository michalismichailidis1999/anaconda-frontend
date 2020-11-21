import React, { useState } from "react";
import { ProductRate as Rate, State } from "../../../../interfaces";
import { connect } from "react-redux";

const Rates = (props: { rates: Rate[] }) => {
  const [star1] = useState(props.rates[0].stars_count);
  const [star2] = useState(props.rates[1].stars_count);
  const [star3] = useState(props.rates[2].stars_count);
  const [star4] = useState(props.rates[3].stars_count);
  const [star5] = useState(props.rates[4].stars_count);
  const [totalStars] = useState(
    star1 + star2 + star3 + star4 + star5 === 0
      ? 1
      : star1 + star2 + star3 + star4 + star5
  );
  return (
    <div className="rates">
      <h4>
        Αξιολογήσεις Προϊόντος <i className="fas fa-percent"></i>
      </h4>

      <div className="board">
        <div className="rate-names">
          <span>Τέλειο</span>
          <span>Καλό</span>
          <span>Μέτριο</span>
          <span>Κακό</span>
          <span>Πολύ Κακό</span>
        </div>

        <div className="percent-lines-box">
          <span
            className="percent-line perfect"
            style={{ width: `${Math.floor(star5 / totalStars) * 100}%` }}
          ></span>
          <span
            className="percent-line good"
            style={{ width: `${Math.floor(star4 / totalStars) * 100}%` }}
          ></span>
          <span
            className="percent-line moderate"
            style={{ width: `${Math.floor(star3 / totalStars) * 100}%` }}
          ></span>
          <span
            className="percent-line bad"
            style={{ width: `${Math.floor(star2 / totalStars) * 100}%` }}
          ></span>
          <span
            className="percent-line very-bad"
            style={{ width: `${Math.floor(star1 / totalStars) * 100}%` }}
          ></span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  rates: state.product.productRates
});

export default connect(mapStateToProps, {})(Rates);
