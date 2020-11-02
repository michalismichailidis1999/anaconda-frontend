import React, { useEffect } from "react";
import { connect } from "react-redux";
import { resetCheckout } from "../../../actions/checkout";
import { Link } from "react-router-dom";
import { clearCart } from "../../../actions/cart";
import { State, CartItem } from "../../../interfaces";
import {
  createOrder,
  notifyBothAdminAndUserAboutTheOrder,
} from "../../../actions/order";
import { scrollOnTopOfThePage } from "../../../helpers";

const OrderCompletedMessage = (props: {
  resetCheckout: Function;
  clearCart: Function;
  orderPrice: number;
  extraPrice: number;
  orderDone: boolean;
  county: string;
  city: string;
  address: string;
  phone: string;
  zipcode: string;
  email: string;
  paymentEnd: boolean;
  paymentBegin: boolean;
  createOrder: Function;
  cart: CartItem[];
  paymentMethod: string;
  notifyBothAdminAndUserAboutTheOrder: Function;
  customerName: string;
  orderCreated: boolean;
  orderId: string;
}) => {
  const createOrder = () => {
    const payOnDeliveryExtraPrice = props.paymentMethod !== "card" ? 2 : 0;

    const userDetails = {
      county: props.county,
      city: props.city,
      address: props.address,
      phone: props.phone,
      zipcode: props.zipcode,
    };

    props.createOrder(
      props.orderId,
      props.orderPrice + payOnDeliveryExtraPrice,
      props.email,
      props.cart,
      userDetails,
      props.paymentMethod,
      props.paymentMethod === "card" ? 1 : 0,
      props.customerName,
      Number(props.extraPrice.toFixed(2))
    );

    props.notifyBothAdminAndUserAboutTheOrder(
      props.orderId,
      props.orderPrice + payOnDeliveryExtraPrice,
      Number(props.extraPrice.toFixed(2)),
      props.email,
      props.cart,
      userDetails,
      props.customerName,
      props.paymentMethod
    );
  };

  useEffect(() => {
    scrollOnTopOfThePage();

    createOrder();

    props.clearCart();
  }, []);

  return (
    <div className="success-message">
      {!props.orderCreated && (
        <div className="wait-message">
          <p>Παρακαλώ περιμένετε να ολοκληρωθεί η παραγγελία σας...</p>
        </div>
      )}

      {props.orderCreated && (
        <React.Fragment>
          <p>Η παραγγελία σας ολοκληρώθηκε με επιτυχία!</p>
          <p>
            Ευχαριστούμε που μας προτιμήσατε{" "}
            <span role="img" aria-label="face">
              😄
            </span>
          </p>

        <div className="important-message">
          <p>Ο κωδικός της παραγγελίας σας είναι #{props.orderId}</p>
          <p>Παρακαλώ σημειώστε τον ώστε να μπορείτε να ελέγξετε την παραγγελία σας αν δεν έχετε κάνει εγγραφή στην ιστοσελίδα μας.</p>
        </div>

          <button>
            <Link to="/" onClick={() => props.resetCheckout()}>
              Συνέχεια Αγορών
            </Link>
          </button>
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  orderPrice: state.cart.totalPrice,
  extraPrice: state.checkout.extraPrice,
  firstName: state.user.user.first_name,
  lastName: state.user.user.last_name,
  email: state.user.user.email,
  paymentEnd: state.checkout.paymentEnd,
  paymentBegin: state.checkout.paymentBegin,
  cart: state.cart.cart,
  orderDone: state.checkout.done,
  paymentMethod: state.checkout.paymentMethod,
  orderCreated: state.checkout.orderCreated,
  orderId: state.checkout.orderId,
});

export default connect(mapStateToProps, {
  resetCheckout,
  clearCart,
  createOrder,
  notifyBothAdminAndUserAboutTheOrder,
})(OrderCompletedMessage);
