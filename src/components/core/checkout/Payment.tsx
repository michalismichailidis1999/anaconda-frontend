import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElementChangeEvent } from "@stripe/stripe-js";
import { connect } from "react-redux";
import { State, CartItem } from "../../../interfaces";
import {
  orderDone,
  goToNextStep,
  payWithCard,
  cardPaymentBegin,
  cardPaymentError,
  setPaymentMethod,
  setOrderId
} from "../../../actions/checkout";
import { API } from "../../../config";
import axios from "axios";
import { scrollOnTopOfThePage, shuffle } from "../../../helpers";

const Payment = (props: {
  orderPrice: number;
  extraPrice: number;
  orderDone: Function;
  goToNextStep: Function;
  county: string;
  city: string;
  address: string;
  phone: string;
  zipcode: string;
  email: string;
  payWithCard: Function;
  paymentEnd: boolean;
  paymentBegin: boolean;
  cardPaymentBegin: Function;
  cardPaymentError: Function;
  setPaymentMethod: Function;
  customerName: string;
  setOrderId:Function;
  orderId:string;
  paymentMethod: string;
  payOnDeliveryExtraPrice: number;
}) => {
  const [choosedWay, setChoosedWay] = useState(1);
  const [cardElementOptions] = useState({
    hidePostalCode: true
  });
  const [orderId, setOrderId] = useState(props.orderId);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  
  const elements = useElements();
  const stripe = useStripe();

  const handleCardElementChange = (element: StripeCardElementChangeEvent) => {
    if (!element.empty && element.complete) {
      setButtonIsDisabled(false);
    } else {
      if (!buttonIsDisabled) {
        setButtonIsDisabled(true);
      }
    }
  };

  const handleCardPayment = async () => {
    setButtonIsDisabled(true);
    props.cardPaymentBegin();

    try {
      if (elements && stripe) {
        const cardElement = elements.getElement(CardElement);

        if (cardElement) {
          const amount = props.orderPrice + Number((props.extraPrice).toFixed(2));

          const config = {
            headers: {
              "Content-Type": "application/json"
            }
          };

          const body = JSON.stringify({ amount, orderId });

          const res = await axios.post(
            `${API}/payment/client_secret`,
            body,
            config
          );

          const name = props.customerName;

          const address = {
            state: props.county,
            city: props.city,
            line1: props.address,
            postal_code: props.zipcode
          };

          const billingDetails = {
            name,
            phone: props.phone,
            address
          }



          if(props.email !== ""){
            
            const billingDetailsWithEmail = {
              name,
              phone: props.phone,
              email: props.email,
              address
            }

            const paymentMethod = await stripe.createPaymentMethod({
              type: "card",
              card: cardElement,
              billing_details:  billingDetailsWithEmail
            });


            if (paymentMethod.paymentMethod) {
              setClientSecret(res.data);
              setPaymentMethodId(paymentMethod.paymentMethod.id);
              setShowPopup(true);
            }
          }else{
            const paymentMethod = await stripe.createPaymentMethod({
              type: "card",
              card: cardElement,
              billing_details:  billingDetails
            });


            if (paymentMethod.paymentMethod) {
              setClientSecret(res.data);
              setPaymentMethodId(paymentMethod.paymentMethod.id);
              setShowPopup(true);
            }
          }
          
        } else {
          alert(
            "Κάτι πήγε στραβά. Επιλέξτε την αντικαταβολή ή κάντε ανανέωση την σελίδα."
          );
          setButtonIsDisabled(false);
          props.cardPaymentError();
        }
      }
    } catch (err) {
      console.log(err);

      alert(
        "Κάτι πήγε στραβά. Επιλέξτε την αντικαταβολή ή κάντε ανανέωση την σελίδα και προσπαθήστε ξανά."
      );

      setButtonIsDisabled(false);
      props.cardPaymentError();
    }
  };

  const pay = () => {
    setShowPopup(false);
    props.payWithCard(clientSecret, paymentMethodId);
  }

  const cancelCardPayment = () => {
    setShowPopup(false);
    setButtonIsDisabled(false);
    props.cardPaymentError();
  }

  const handleOnPaymentWithoutCardChoice = () => {
    props.orderDone();
    props.goToNextStep();
  };

  useEffect(() => {
    scrollOnTopOfThePage();

    let date = new Date(Date.now());
    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let milSecs = date.getMilliseconds();

    let id = shuffle(("" + day + month + year + hours + minutes + seconds + milSecs).split("")).join("");

    setOrderId(id)
    props.setOrderId(id);
  }, []);

  useEffect(() => {
    if (props.paymentEnd) {
      props.orderDone();
      props.goToNextStep();
    }
  }, [props.paymentEnd]);

  return (
    <div className="ways-to-choose">
      <div className="order-total-price">
        <div>
          <span className="price-from">Κόστος Παραγγελίας</span>
          <span className="price"> {props.orderPrice}€</span>
        </div>

        <div>
          <span className="price-from">+ Μεταφορικά</span>
          <span className="price">{props.extraPrice.toFixed(2)}€</span>
        </div>

        {props.paymentMethod === "pay on delivery" && <div>
          <span className="price-from">+ Αντικαταβολή</span>
          <span className="price">{props.payOnDeliveryExtraPrice}€</span>
        </div>}

        <div>
          <span className="price-from">Σύνολο</span>
          <span className="price">{props.orderPrice + Number(props.extraPrice.toFixed(2)) + props.payOnDeliveryExtraPrice}€</span>
        </div>
      </div>

      <h4>Επιλέξτε πως θέλετε να πληρώσετε την παραγγελία σας.</h4>

      <div className="radio-cards">
        <div className="radio-card">
          <span
            className="radio"
            onClick={() => {
              if (choosedWay !== 1 && !props.paymentBegin) {
                setChoosedWay(1);
                setButtonIsDisabled(false);
                props.setPaymentMethod("pay on delivery");
              }
            }}
          >
            {choosedWay === 1 && <span className="checked"></span>}
          </span>

          <span className="text">Αντικαταβολή</span>

          <span className="icon">
            <i className="fas fa-money-bill-wave"></i>
          </span>
        </div>

        <div className="radio-card">
          <span
            className="radio"
            onClick={() => {
              if (choosedWay !== 2) {
                setChoosedWay(2);
                setButtonIsDisabled(true);
                props.setPaymentMethod("card");
              }
            }}
          >
            {choosedWay === 2 && <span className="checked"></span>}
          </span>

          <span className="text">Κάρτα</span>

          <span className="icon">
            <i className="far fa-credit-card"></i>
          </span>
        </div>

        {choosedWay === 2 && (
          <div className="card-element-container">
            <CardElement
              options={cardElementOptions}
              onChange={element => handleCardElementChange(element)}
            ></CardElement>
          </div>
        )}
      </div>

      {showPopup && <div className="confirm-payment-popup">
        <div className="popup-container">
          <p>Για να ολοκληρώσετε την πληρωμή πατήστε το κουμπί</p>

          <div className="popup-buttons">
            <button onClick={() => pay()}>Πληρωμή</button>
            <button onClick={() => cancelCardPayment()}>Ακύρωση</button>
          </div>
        </div>
      </div>}

      <button
        className={buttonIsDisabled ? "btn is-disabled" : "btn"}
        disabled={buttonIsDisabled}
        onClick={() => {
          if (choosedWay === 1) {
            handleOnPaymentWithoutCardChoice();
          } else {
            handleCardPayment();
          }
        }}
      >
        Ολοκλήρωση
      </button>

      {props.paymentBegin && !props.paymentEnd && (
        <div className="loading-message">
          <p>Παρακαλώ Περιμένετε...</p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  orderPrice: state.cart.totalPrice,
  extraPrice: state.checkout.extraPrice,
  orderId: state.checkout.orderId,
  email: state.user.user.email,
  paymentEnd: state.checkout.paymentEnd,
  paymentBegin: state.checkout.paymentBegin,
  paymentMethod: state.checkout.paymentMethod,
  payOnDeliveryExtraPrice: state.checkout.payOnDeliveryExtraPrice
});

export default connect(mapStateToProps, {
  orderDone,
  goToNextStep,
  payWithCard,
  cardPaymentBegin,
  cardPaymentError,
  setPaymentMethod,
  setOrderId
})(Payment);
