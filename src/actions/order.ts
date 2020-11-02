import {
  CREATE_ORDER,
  NOTIFICATIONS_SENT,
  GET_ORDERS,
  FETCHING_ORDERS,
  GET_TOTAL_PAGES,
  GET_ORDER,
  GETTING_ORDER
} from "./types/order";
import axios from "axios";
import { Dispatch } from "redux";
import { API } from "../config";

export const createOrder = (
  orderId: string,
  totalPrice: number,
  email: string,
  products: Object,
  userDetails: Object,
  paymentMethod: string,
  isPaid: number,
  customerName: string,
  extraPrice: number
) => async (dispatch: Dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      orderId,
      totalPrice,
      email,
      products,
      userDetails,
      isPaid,
      paymentMethod,
      customerName,
      extraPrice,
    });

    await axios.post(`${API}/order/create`, body, config);

    dispatch({ type: CREATE_ORDER });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const notifyBothAdminAndUserAboutTheOrder = (
  orderId: string,
  totalPrice: number,
  extraPrice: number,
  email: string,
  products: Object,
  userDetails: Object,
  customerName: string,
  paymentMethod:string
) => async (dispatch: Dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      orderId,
      totalPrice,
      extraPrice,
      email,
      products,
      userDetails,
      customerName,
      paymentMethod
    });

    await axios.post(`${API}/order/send_notification`, body, config);

    dispatch({ type: NOTIFICATIONS_SENT });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const getOrders = (
  userId: string,
  token: string,
  page: number
) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: FETCHING_ORDERS });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(`${API}/order/${userId}?page=${page}`, config);

    dispatch({ type: GET_ORDERS, payload: { orders: res.data } });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const getTotalPages = (userId: string, token: string) => async (
  dispatch: Dispatch
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(`${API}/order/total_pages/${userId}`, config);

    dispatch({ type: GET_TOTAL_PAGES, payload: { totalPages: res.data } });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const getOrder = (
  userId: string,
  token: string,
  orderId: string
) => async (dispatch: Dispatch) => {
  try {
    dispatch({type: GETTING_ORDER});
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(`${API}/order/${orderId}/${userId}`, config);

    dispatch({ type: GET_ORDER, payload: res.data });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};
