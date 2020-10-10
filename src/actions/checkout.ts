import axios from "axios";
import { Dispatch } from "redux";
import {
  GO_TO_NEXT_STEP,
  ORDER_DONE,
  CARD_PAYMENT_DONE,
  CARD_PAYMENT_ERROR,
  START_CHECKOUT,
  RESET_CHECKOUT,
  CARD_PAYMENT_BEGIN,
  ADD_EXTRA_PRICE,
  SET_PAYMENT_METHOD,
  SET_ORDER_ID,
} from "./types/checkout";
import { API } from "../config";
import { getExtraPrice } from "../helpers";

export const startCheckout = () => (dispatch: Dispatch) => {
  dispatch({ type: START_CHECKOUT });
};

export const goToNextStep = () => (dispatch: Dispatch) => {
  dispatch({ type: GO_TO_NEXT_STEP });
};

export const orderDone = () => (dispatch: Dispatch) => {
  dispatch({ type: ORDER_DONE });
};

export const resetCheckout = () => (dispatch: Dispatch) => {
  dispatch({ type: RESET_CHECKOUT });
};

export const cardPaymentBegin = () => (dispatch: Dispatch) => {
  dispatch({ type: CARD_PAYMENT_BEGIN });
};

export const cardPaymentError = () => (dispatch: Dispatch) => {
  dispatch({ type: CARD_PAYMENT_ERROR });
};

export const payWithCard = (
  client_secret: string,
  paymentMethod: string
) => async (dispatch: Dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ client_secret, paymentMethod });

    await axios.post(`${API}/payment/charge`, body, config);

    dispatch({ type: CARD_PAYMENT_DONE });
  } catch (err) {
    dispatch({ type: CARD_PAYMENT_ERROR });
    alert(
      "Κάτι πήγε στραβά. Επιλέξτε την αντικαταβολή ή κάντε ανανέωση την σελίδα."
    );
  }
};

export const addExtraPrice = () => (dispatch: Dispatch) => {
  dispatch({ type: ADD_EXTRA_PRICE, payload: { extraPrice: getExtraPrice() } });
};

export const setPaymentMethod = (paymentMethod: string) => (
  dispatch: Dispatch
) => {
  dispatch({ type: SET_PAYMENT_METHOD, payload: { paymentMethod } });
};

export const setOrderId = (id: string) => (dispatch: Dispatch) => {
  dispatch({ type: SET_ORDER_ID, payload: { orderId: id } });
};
