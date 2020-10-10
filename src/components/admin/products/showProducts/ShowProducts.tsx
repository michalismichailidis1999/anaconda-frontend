import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  setShowCreateProduct,
  setShowProducts,
  setShowUpdateProduct,
  fetchProducts,
} from "../../../../actions/admin/product";
import { State } from "../../../../interfaces";

// Components
import Ticks from "../../orders/Ticks";
import Table from "./Table";

const ShowProducts = (props: {
  setShowCreateProduct: Function;
  setShowProducts: Function;
  setShowUpdateProduct: Function;
  fetchProducts: Function;
  userId: string;
  token: string;
}) => {
  const history = useHistory();

  const [ticksTitle] = useState("Προϊόντα");
  const [ticks, setTicks] = useState([
    { text: "Όλα", choosed: true },
    { text: "Σε Προσφορά", choosed: false },
    { text: "Χωρίς Προσφορά", choosed: false },
    { text: "< 50$", choosed: false },
    { text: "> 50$ & < 100$", choosed: false },
    { text: "> 100$", choosed: false },
  ]);

  const searchValues = ["all", "sale", "without_sale", "ltf", "gtf_lth", "gth"];

  const [tickChanged, setTickChanged] = useState(false);

  const handleTickClick = (tick: { text: string; choosed: boolean }) => {
    let newTicks = ticks.map((t) => {
      if (tick.text === t.text) {
        t.choosed = true;
      } else {
        t.choosed = false;
      }

      return t;
    });

    setTicks(newTicks);

    setTickChanged(true);
  };

  const getProducts = () => {
    let search = ``;

    for (let i = 0; i < ticks.length; i++) {
      if (ticks[i].choosed) {
        search = searchValues[i];
        break;
      }
    }

    props.fetchProducts(props.userId, props.token, search);

    setTickChanged(false);
  };

  useEffect(() => {
    let query = window.location.search;

    if (query.split("&").length === 1) {
      getProducts();
    }
  }, []);

  useEffect(() => {
    if (tickChanged) {
      getProducts();
    }
  }, [tickChanged]);

  return (
    <div className="show-products">
      <div>
        <Ticks
          ticks={ticks}
          ticksTitle={ticksTitle}
          handleTickClick={handleTickClick}
        />

        <button
          className="btn create-btn"
          onClick={() => {
            history.push(`/admin/dashboard?view_products&create`);
            props.setShowProducts(false);
            props.setShowUpdateProduct(false);
            props.setShowCreateProduct(true);
          }}
        >
          Δημιουργία
        </button>
      </div>

      <Table />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  userId: state.admin.user.id,
  token: state.admin.user.token,
});

export default connect(mapStateToProps, {
  setShowCreateProduct,
  setShowProducts,
  setShowUpdateProduct,
  fetchProducts,
})(ShowProducts);
