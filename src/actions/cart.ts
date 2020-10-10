import { Dispatch } from "redux";
import { Product, CartItem } from "../interfaces";
import {
  ADD_TO_CART,
  CHANGE_QUANTITY,
  REMOVE_FROM_CART,
  SET_LOADING_CART,
  CLEAR_CART,
} from "./types/cart";
import axios from "axios";
import { API } from "../config";

export const addToCart = (product: Product) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: SET_LOADING_CART, payload: { loading: true } });

    const cart = JSON.parse(localStorage.getItem("cart") + "");

    if (cart) {
      const existingItem = cart.find(
        (item: CartItem) => item.id === product.id
      );

      if (!existingItem) {
        const res = await axios.get(`${API}/category/${product.category_id}`);

        dispatch({
          type: ADD_TO_CART,
          payload: { product, category: res.data },
        });
      }
    } else {
      const res = await axios.get(`${API}/category/${product.category_id}`);

      dispatch({ type: ADD_TO_CART, payload: { product, category: res.data } });
    }

    dispatch({ type: SET_LOADING_CART, payload: { loading: false } });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const removeFromCart = (productId: string) => (dispatch: Dispatch) => {
  let totalPrice = 0;

  let cart = JSON.parse(localStorage.getItem("cart") + "").filter(
    (item: CartItem) => {
      if (item.id !== productId) {
        totalPrice += item.quantity * item.price;
        return item;
      }

      return false;
    }
  );

  localStorage.setItem("cart", JSON.stringify(cart));

  dispatch({ type: REMOVE_FROM_CART, payload: { cart, totalPrice } });
};

export const changeQuantity = (productId: string, operator: string) => (
  dispatch: Dispatch
) => {
  let cart = JSON.parse(localStorage.getItem("cart") + "");

  let totalPrice = 0;

  cart = cart.map((item: CartItem) => {
    if (productId === item.id) {
      if (operator === "+") {
        item.quantity += 1;
      } else if (operator === "-") {
        if (item.quantity > 1) {
          item.quantity -= 1;
        }
      }
    }

    totalPrice += item.quantity * item.price;

    return item;
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  dispatch({ type: CHANGE_QUANTITY, payload: { cart, totalPrice } });
};

export const clearCart = () => (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_CART });
};
