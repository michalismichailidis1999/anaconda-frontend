import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  setShowOrders,
  fetchOrderProducts,
  fetchOrderDetails,
  fetchOrderCustomerDetails
} from "../../../../actions/admin/order";
import { State, OrderInAdminArea } from "../../../../interfaces";

const Table = (props: {
  setShowOrders: Function;
  orders: OrderInAdminArea[];
  fetchingOrder: number;
  fetchOrderProducts: Function;
  fetchOrderDetails: Function;
  fetchOrderCustomerDetails: Function;
  userId: string;
  token: string;
}) => {
  const history = useHistory();

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Αριθμός Παραγγελίας</th>
          <th>Προβολή Παραγγελίας</th>
          <th>Ελέχθηκε</th>
        </tr>
      </thead>

      <tbody>
        {props.orders.map((order, i) => (
          <tr key={i}>
            <td>#{order.id}</td>
            <td className="icon">
              <i
                className="fas fa-eye"
                onClick={() => {
                  props.fetchOrderProducts(props.userId, props.token, order.id);
                  props.fetchOrderDetails(props.userId, props.token, order.id);
                  props.fetchOrderCustomerDetails(
                    props.userId,
                    props.token,
                    order.id
                  );
                  history.push(
                    `/admin/dashboard?view_orders&order_id=${order.id}`
                  );
                  props.setShowOrders(false);
                }}
              ></i>
            </td>

            {order.checked ? (
              <td className="checked">
                <i className="far fa-check-circle"></i>
              </td>
            ) : (
              <td className="unchecked">
                <i className="far fa-times-circle"></i>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const mapStateToProps = (state: State) => ({
  orders: state.admin.order.orders,
  fetchingOrder: state.admin.order.fetchingOrder,
  userId: state.admin.user.id,
  token: state.admin.user.token
});

export default connect(mapStateToProps, {
  setShowOrders,
  fetchOrderProducts,
  fetchOrderDetails,
  fetchOrderCustomerDetails
})(Table);
