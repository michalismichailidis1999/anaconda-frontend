import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchOrders, fetchOrderById } from "../../../../actions/admin/order";
import { State } from "../../../../interfaces";

// Components
import Ticks from "../Ticks";
import Table from "./Table";

const ShowOrders = (props: {
  fetchingOrders: boolean;
  ordersFetched: boolean;
  userId: string;
  token: string;
  fetchOrderById: Function;
  fetchOrders: Function;
}) => {
  const [ticksTitle] = useState("Παραγγελίες");
  const [ticks, setTicks] = useState([
    { text: "Όλες", choosed: true },
    { text: "Καινούργιες", choosed: false },
    { text: "Πληρωμένες", choosed: false },
    { text: "Απλήρωτες", choosed: false },
    { text: "Ελέχθηκαν", choosed: false },
    { text: "Δεν Ελέχθηκαν", choosed: false }
  ]);
  const [tickChanged, setTickChanged] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleTickClick = (tick: { text: string; choosed: boolean }) => {
    let newTicks = ticks.map(t => {
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

  const getOrders = () => {
    let query: string;

    if (ticks[0].choosed) {
      query = "all";
    } else if (ticks[1].choosed) {
      query = "new";
    } else if (ticks[2].choosed) {
      query = "paid";
    } else if (ticks[3].choosed) {
      query = "unpaid";
    } else if (ticks[4].choosed) {
      query = "checked";
    } else {
      query = "unchecked";
    }

    props.fetchOrders(props.userId, props.token, query);

    setTickChanged(false);
  };

  const searchOrder = () => {
    props.fetchOrderById(props.userId, props.token, orderId);
    setOrderId("");
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    if (tickChanged) {
      getOrders();
    }
  }, [tickChanged]);

  return (
    <div className="show-orders">
      <Ticks
        ticksTitle={ticksTitle}
        ticks={ticks}
        handleTickClick={handleTickClick}
      />

      {!props.fetchingOrders && props.ordersFetched ? (
        <div>
          <div className="search-order">
            <label>Αριθμός Παραγγελίας</label>
            <input
              type="text"
              value={orderId}
              onChange={e => setOrderId(e.target.value)}
            />
            <button className="btn" onClick={() => searchOrder()}>
              Αναζήτηση
            </button>
          </div>

          <Table />
        </div>
      ) : (
        <div className="loading-message">
          <p>Φόρτωση...</p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  fetchingOrders: state.admin.order.fetchingOrders,
  ordersFetched: state.admin.order.ordersFetched,
  userId: state.admin.user.id,
  token: state.admin.user.token
});

export default connect(mapStateToProps, { fetchOrders, fetchOrderById })(
  ShowOrders
);
