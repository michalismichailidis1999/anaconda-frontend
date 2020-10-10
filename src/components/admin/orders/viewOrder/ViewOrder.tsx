import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { State, OrderDetails } from "../../../../interfaces";
import { setShowOrders, updateOrder } from "../../../../actions/admin/order";

// Components
import Table from "./Table";
import DetailsAboutOrder from "./DetailsAboutOrder";
import OrderStatus from "./OrderStatus";

const ViewOrder = (props: {
  setChoosed: Function;
  fetchOrder: number;
  orderDetails: OrderDetails;
  setShowOrders: Function;
  updateOrder: Function;
  userId: string;
  token: string;
}) => {
  const history = useHistory();
  const [orderId, setOrderId] = useState("");

  const values = ["Δημιουργήθηκε", "Σε Εξέλιξη", "Παραδόθηκε", "Ακυρώθηκε"];

  const [selectedStatus, setSelectedStatus] = useState({
    value: "",
    text: ""
  });

  const [options] = useState([
    { value: "Created", text: "Δημιουργήθηκε" },
    { value: "Pending", text: "Σε Εξέλιξη" },
    { value: "Delivered", text: "Παραδόθηκε" },
    { value: "Canceled", text: "Ακυρώθηκε" }
  ]);

  const [orderChecked, setOrderChecked] = useState(
    props.orderDetails.checked === 1 ? true : false
  );

  const [orderChanged, setOrderChanged] = useState(false);

  const handleSelectChange = (value: string) => {
    if (!orderChanged) {
      setOrderChanged(true);
    }

    if (value === "Created") {
      setSelectedStatus(options[0]);
    } else if (value === "Pending") {
      setSelectedStatus(options[1]);
    } else if (value === "Delivered") {
      setSelectedStatus(options[2]);
    } else {
      setSelectedStatus(options[3]);
    }
  };

  useEffect(() => {
    let id = window.location.search.split("&")[1].split("=")[1];

    setOrderId(id);
  }, []);

  useEffect(() => {
    if (props.orderDetails.status !== "") {
      let status = props.orderDetails.status;
      let text =
        status === "Created"
          ? values[0]
          : status === "Pending"
          ? values[1]
          : status === "Delivered"
          ? values[2]
          : values[3];

      setSelectedStatus({ value: status, text });
    }
  }, [props.orderDetails]);

  return (
    <div className="view-order">
      {props.fetchOrder < 3 && (
        <div className="loading-message">
          <p>Φόρτωση...</p>
        </div>
      )}

      {props.fetchOrder === 3 && (
        <React.Fragment>
          <h4>Αριθμός Παραγγελίας #{orderId}</h4>

          <h4 className="table-heading">Προϊόντα</h4>

          <Table />

          <OrderStatus
            defaultOption={selectedStatus}
            options={options}
            handleSelectChange={handleSelectChange}
          />

          <DetailsAboutOrder />

          <div className="order-checked">
            <span
              className={orderChecked ? "tick-box ticked" : "tick-box unticked"}
              onClick={() => {
                if (!orderChanged) {
                  setOrderChanged(true);
                }

                setOrderChecked(!orderChecked);
              }}
            ></span>{" "}
            Ελέγχθηκε
          </div>

          {orderChanged && (
            <div className="save-changes">
              <button
                className="btn"
                onClick={() => {
                  props.updateOrder(
                    props.userId,
                    props.token,
                    orderId,
                    selectedStatus.value,
                    orderChecked ? 1 : 0
                  );
                  setShowOrders(true);
                  props.setChoosed("dashboard");
                  history.push("/admin/dashboard");
                }}
              >
                Αποθήκευση
              </button>{" "}
              <button
                className="btn"
                onClick={() => {
                  props.setShowOrders(true);
                  props.setChoosed("dashboard");
                  history.push("/admin/dashboard");
                }}
              >
                Ακύρωση
              </button>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  fetchOrder: state.admin.order.fetchingOrder,
  orderDetails: state.admin.order.orderDetails,
  userId: state.admin.user.id,
  token: state.admin.user.token
});

export default connect(mapStateToProps, { setShowOrders, updateOrder })(
  ViewOrder
);
