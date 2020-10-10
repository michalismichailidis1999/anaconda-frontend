import { API } from "../../config";
import { Dispatch } from "redux";
import axios from "axios";
import {
  GET_TOTAL_PROFIT,
  GET_ORDERS_TOTAL_COUNT,
  GET_AVG_MONTHLY_PROFIT,
  GET_LINE_CHART_DATA,
  GET_PIE_CHART_DATA,
  SET_SHOW_ORDERS,
  FETCH_ORDERS,
  FETCH_ORDER_CUSTOMER_DETAILS,
  FETCH_ORDER_DETAILS,
  FETCH_ORDER_PRODUCTS,
  FETCHING_ORDERS_ADMIN,
  FETCHING_ORDER_CUSTOMER_DETAILS,
  FETCHING_ORDER_DETAILS,
  FETCHING_ORDER_PRODUCTS,
  ORDER_UPDATED,
  FETCH_ORDER_BY_ID,
} from "../types/admin/order";

export const getOrdersTotalCount = (userId: string, token: string) => async (
  dispatch: Dispatch
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      `${API}/admin/orders_total_count/${userId}`,
      config
    );

    dispatch({ type: GET_ORDERS_TOTAL_COUNT, payload: res.data });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const getTotalProfit = (userId: string, token: string) => async (
  dispatch: Dispatch
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      `${API}/admin/order/total_profit/${userId}`,
      config
    );

    dispatch({ type: GET_TOTAL_PROFIT, payload: res.data });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const getAvgMonthlyProfit = (userId: string, token: string) => async (
  dispatch: Dispatch
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      `${API}/admin/order/avg_monthly_profit/${userId}`,
      config
    );

    dispatch({ type: GET_AVG_MONTHLY_PROFIT, payload: res.data });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const getLineChartData = (userId: string, token: string) => async (
  dispatch: Dispatch
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      `${API}/admin/order/monthly_profits/${userId}`,
      config
    );

    dispatch({
      type: GET_LINE_CHART_DATA,
      payload: { lineChartData: res.data },
    });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const getPieChartData = (userId: string, token: string) => async (
  dispatch: Dispatch
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      `${API}/admin/order/categories_total_sales/${userId}`,
      config
    );

    dispatch({ type: GET_PIE_CHART_DATA, payload: { pieChartData: res.data } });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const setShowOrders = (showOrders: boolean) => (dispatch: Dispatch) => {
  dispatch({ type: SET_SHOW_ORDERS, payload: { showOrders } });
};

export const fetchOrders = (
  userId: string,
  token: string,
  query: string
) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: FETCHING_ORDERS_ADMIN });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      `${API}/admin/orders/${userId}?${query}`,
      config
    );

    dispatch({ type: FETCH_ORDERS, payload: { orders: res.data } });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const fetchOrderProducts = (
  userId: string,
  token: string,
  orderId: string
) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: FETCHING_ORDER_PRODUCTS });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      `${API}/admin/order/${orderId}/products/${userId}`,
      config
    );

    dispatch({
      type: FETCH_ORDER_PRODUCTS,
      payload: { orderProducts: res.data },
    });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const fetchOrderCustomerDetails = (
  userId: string,
  token: string,
  orderId: string
) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: FETCHING_ORDER_CUSTOMER_DETAILS });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      `${API}/admin/order/${orderId}/customer_details/${userId}`,
      config
    );

    dispatch({
      type: FETCH_ORDER_CUSTOMER_DETAILS,
      payload: { orderCustomerDetails: res.data },
    });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const fetchOrderDetails = (
  userId: string,
  token: string,
  orderId: string
) => async (dispatch: Dispatch) => {
  dispatch({ type: FETCHING_ORDER_DETAILS });

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      `${API}/admin/order/${orderId}/details/${userId}`,
      config
    );

    dispatch({
      type: FETCH_ORDER_DETAILS,
      payload: { orderDetails: res.data },
    });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const fetchOrderById = (
  userId: string,
  token: string,
  orderId: string
) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: FETCHING_ORDERS_ADMIN });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      `${API}/admin/order/${orderId}/${userId}`,
      config
    );

    console.log(res.data);

    dispatch({ type: FETCH_ORDER_BY_ID, payload: { orders: res.data } });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const updateOrder = (
  userId: string,
  token: string,
  orderId: string,
  status: string,
  checked: number
) => async (dispatch: Dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const body = JSON.stringify({ status, checked });

    await axios.put(`${API}/admin/order/${orderId}/${userId}`, body, config);

    dispatch({ type: ORDER_UPDATED });
  } catch (err) {
    alert(
      "Κάτι πήγε στραβά και η παραγγελία δεν κατάφερε να επεξεργαστεί. Δοκίμασε να ανανεώσεις την σελίδα και να προσπαθήσεις ξανά."
    );
  }
};
