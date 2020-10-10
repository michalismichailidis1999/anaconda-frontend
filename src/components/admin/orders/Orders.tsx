import React, { useEffect, useState } from "react";
import { State, AdminOrdersState } from "../../../interfaces";
import { connect } from "react-redux";
import { setShowOrders } from "../../../actions/admin/order";
import {
  fetchOrderProducts,
  fetchOrderDetails,
  fetchOrderCustomerDetails
} from "../../../actions/admin/order";

// Components
import ShowOrders from "./showOrders/ShowOrders";
import ViewOrder from "./viewOrder/ViewOrder";

const Orders = (props: {
  setChoosed: Function;
  orderState: AdminOrdersState;
  setShowOrders: Function;
  fetchingOrder: number;
  fetchOrderProducts: Function;
  fetchOrderDetails: Function;
  fetchOrderCustomerDetails: Function;
  userId: string;
  token: string;
}) => {
  const [showOrders, setShowOrders] = useState(props.orderState.showOrders);

  useEffect(() => {
    let query = window.location.search;

    if (query.split("&").length > 1) {
      props.setShowOrders(false);

      if (props.fetchingOrder === 0) {
        let orderId = query.split("&")[1].split("=")[1];

        props.fetchOrderProducts(props.userId, props.token, orderId);
        props.fetchOrderDetails(props.userId, props.token, orderId);
        props.fetchOrderCustomerDetails(props.userId, props.token, orderId);
      }
    }
  }, []);

  useEffect(() => {
    setShowOrders(props.orderState.showOrders);
  }, [props.orderState]);

  return (
    <div className="orders">
      <h2>
        Παραγγελίες <i className="fas fa-truck-loading"></i>
      </h2>

      {showOrders && <ShowOrders />}

      {!showOrders && <ViewOrder setChoosed={props.setChoosed} />}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  orderState: state.admin.order,
  fetchingOrder: state.admin.order.fetchingOrder,
  userId: state.admin.user.id,
  token: state.admin.user.token
});

export default connect(mapStateToProps, {
  setShowOrders,
  fetchOrderProducts,
  fetchOrderDetails,
  fetchOrderCustomerDetails
})(Orders);
