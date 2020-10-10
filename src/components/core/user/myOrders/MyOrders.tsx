import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { State, Order } from "../../../../interfaces";
import { getOrders, getOrder } from "../../../../actions/order";
import Moment from "react-moment";
import { useHistory } from "react-router-dom";

const MyOrders = (props: {
  orders: Order[];
  userId: string;
  token: string;
  ordersFetched: boolean;
  fetchingOrders: boolean;
  getOrders: Function;
  totalPages: number;
  getOrder: Function;
}) => {
  const [page, setPage] = useState(1);
  const history = useHistory();

  useEffect(() => {
    props.getOrders(props.userId, props.token, page);
  }, []);

  useEffect(() => {
    if (!props.fetchingOrders && props.ordersFetched) {
      props.getOrders(props.userId, props.token, page);
    }
  }, [page]);

  return (
    <div className="my-orders">
      {props.fetchingOrders && !props.ordersFetched && (
        <div className="loading-products">Φόρτωση...</div>
      )}

      {!props.fetchingOrders && props.ordersFetched && (
        <React.Fragment>
          <table>
            <thead>
              <tr>
                <th>Αριρμός Παραγγελίας</th>
                <th>Ποσό</th>
                <th>Δημιουργία</th>
                <th>Κατάσταση</th>
                <th>
                  <i className="fas fa-file-invoice"></i>
                </th>
              </tr>
            </thead>

            <tbody>
              {props.orders.map((order, i) => (
                <tr key={i}>
                  <td>
                    <span className="full-id">#{order.id}</span>{" "}
                    <span className="cutted-id">
                      #
                      {order.id
                        .split("")
                        .filter((_unused, i) => i <= 7)
                        .join("")}
                      ...
                    </span>
                  </td>
                  <td>{order.total_price}€</td>
                  <td>
                    <Moment format="DD/MM/YYYY hh:mm">
                      {order.created_at}
                    </Moment>
                  </td>
                  <td>
                    {order.status === "Created"
                      ? "Δημιουργήθηκε"
                      : order.status === "Pending"
                      ? "Σε Εξέλιξη"
                      : order.status === "Delivered"
                      ? "Παραδόθηκε"
                      : "Ακυρώθηκε"}
                  </td>
                  <td
                    onClick={() => {
                      props.getOrder(props.userId, props.token, order.id);
                      history.push(`/order/${order.id}`);
                    }}
                  >
                    Λεπτομέρειες
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {props.totalPages > 1 && (
            <div className="arrows">
              <span
                style={page > 1 ? {} : { opacity: 0, pointerEvents: "none" }}
                onClick={() => setPage(page - 1)}
              >
                <i className="fas fa-arrow-circle-left"></i>
              </span>

              <span className="page">
                Σελίδα {page} από {props.totalPages}
              </span>

              <span
                style={
                  page === props.totalPages
                    ? { opacity: 0, pointerEvents: "none" }
                    : {}
                }
                onClick={() => setPage(page + 1)}
              >
                <i className="fas fa-arrow-circle-right"></i>
              </span>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  userId: state.user.user.id,
  token: state.user.token,
  orders: state.order.myOrders,
  fetchingOrders: state.order.fetchingOrders,
  ordersFetched: state.order.ordersFetched,
  totalPages: state.order.totalPages
});

export default connect(mapStateToProps, { getOrders, getOrder })(MyOrders);
