import { CheckoutState } from "../interfaces";
import {
  GO_TO_NEXT_STEP,
  START_CHECKOUT,
  ORDER_DONE,
  CARD_PAYMENT_BEGIN,
  CARD_PAYMENT_DONE,
  RESET_CHECKOUT,
  ADD_EXTRA_PRICE,
  CARD_PAYMENT_ERROR,
  SET_PAYMENT_METHOD,
  SET_ORDER_ID
} from "../actions/types/checkout";
import { CREATE_ORDER } from "../actions/types/order";

const initialState: CheckoutState = {
  startOrderCheckout: false,
  currentStep: 1,
  done: false,
  paymentBegin: false,
  paymentEnd: false,
  extraPrice: 0,
  paymentMethod: "pay on delivery",
  orderCreated: false,
  orderId: ""
};

const checkoutReducer = (
  state = initialState,
  action: {
    type: string;
    payload: { paymentMethod: string; extraPrice: number; orderId: string; };
  }
) => {
  const { type, payload } = action;

  switch (type) {
    case GO_TO_NEXT_STEP:
      let next = state.currentStep + 1;
      return { ...state, currentStep: next };
    case START_CHECKOUT:
      return { ...state, startOrderCheckout: true };
    case ORDER_DONE:
      return { ...state, done: true };
    case CARD_PAYMENT_DONE:
      return { ...state, paymentBegin: false, paymentEnd: true, done: true };
    case CARD_PAYMENT_BEGIN:
      return { ...state, paymentBegin: true, paymentEnd: false };
    case CARD_PAYMENT_ERROR:
      return { ...state, paymentBegin: false, paymentEnd: false };
    case RESET_CHECKOUT:
      return initialState;
    case ADD_EXTRA_PRICE:
      return { ...state, extraPrice: payload.extraPrice };
    case SET_PAYMENT_METHOD:
      return { ...state, paymentMethod: payload.paymentMethod };
    case CREATE_ORDER:
      return { ...state, orderCreated: true };
    case SET_ORDER_ID:
      return {...state, orderId: payload.orderId};
    default:
      return state;
  }
};

export default checkoutReducer;
