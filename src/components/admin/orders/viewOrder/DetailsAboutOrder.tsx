import React from "react";
import {
  State,
  OrderDetails,
  OrderCustomerDetails
} from "../../../../interfaces";
import { connect } from "react-redux";
import Moment from "react-moment";

const DetailsAboutOrder = (props: {
  orderDetails: OrderDetails;
  orderCustomerDetails: OrderCustomerDetails;
}) => {
  return (
    <div className="details-about-order">
      <div className="details">
        <h5>Στοιχεία Πελάτη</h5>

        <ul>
          <li>
            -Όνομα:{" "}
            <span className="info">
              {props.orderCustomerDetails.customer_name.split(" ")[0]}
            </span>
          </li>
          <li>
            -Επίθετο:{" "}
            <span className="info">
              {props.orderCustomerDetails.customer_name.split(" ")[1]}
            </span>
          </li>
          <li>
            -Νομός:{" "}
            <span className="info">{props.orderCustomerDetails.county}</span>
          </li>
          <li>
            -Πόλη:{" "}
            <span className="info">{props.orderCustomerDetails.city}</span>
          </li>
          <li>
            -Διεύθυνση:{" "}
            <span className="info">{props.orderCustomerDetails.address}</span>
          </li>
          <li>
            -Αριθμός Επικοινωνίας:{" "}
            <span className="info">{props.orderCustomerDetails.phone}</span>
          </li>
          <li>
            -Ταχυδρομικός Κώδικας:{" "}
            <span className="info">{props.orderCustomerDetails.zipcode}</span>
          </li>
        </ul>
      </div>

      <div className="details">
        <h5>Λεπτομέρειες Παραγγελίας</h5>

        <ul>
          <li>
            -Συνολικό Ποσό:{" "}
            <span className="info">{props.orderDetails.total_price}$</span>
          </li>
          <li>
            -Μεταφορικά:{" "}
            <span className="info">{props.orderDetails.extra_price}$</span>
          </li>
          <li>
            -Συνολικό Βάρος:{" "}
            <span className="info">{props.orderDetails.total_weight}kg</span>
          </li>
          <li>
            -Τρόπος Πληρωμής:{" "}
            <span className="info">
              {props.orderDetails.payment_method === "card"
                ? "Κάρτα"
                : "Αντικαταβολή"}
            </span>
          </li>
          <li>
            -Πληρώθηκε:{" "}
            <span className="info">
              {props.orderDetails.paid === 1 ? "Ναι" : "'Οχι"}
            </span>
          </li>
          <li>
            -Δημιουργήθηκε:{" "}
            <span className="info">
              <Moment format="DD/MM/YYYY hh:mm">
                {props.orderDetails.created_at}
              </Moment>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  orderDetails: state.admin.order.orderDetails,
  orderCustomerDetails: state.admin.order.orderCustomerDetails
});

export default connect(mapStateToProps, {})(DetailsAboutOrder);
