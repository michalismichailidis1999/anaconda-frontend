import { CartState, CartItem, Category, Product } from "../interfaces";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHANGE_QUANTITY,
  CLEAR_CART,
  SET_LOADING_CART,
} from "../actions/types/cart";

const initialState: CartState = {
  totalItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") + "").length
    : 0,
  totalPrice: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") + "").reduce(
        (acc: number, cartItem: CartItem) =>
          acc + cartItem.price * cartItem.quantity,
        0
      )
    : 0,
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") + "")
    : [],
  loading: false,
};

const cartReducer = (
  state = initialState,
  action: {
    type: string;
    payload: {
      product: Product;
      productId: string;
      category: Category;
      operator: string;
      cart: CartItem[];
      totalPrice: number;
      loading: boolean;
    };
  }
) => {
  const { type, payload } = action;

  let cart = [...state.cart];

  let totalItems = state.totalItems;

  let totalPrice = state.totalPrice;

  switch (type) {
    case ADD_TO_CART:
      let newCartItem: CartItem = {
        id: payload.product.id,
        name: payload.product.name,
        quantity: 1,
        price: payload.product.price,
        category_name: payload.category.name,
        image: payload.product.image,
        category_id: payload.product.category_id,
        code: payload.product.code,
        weight: payload.product.weight,
      };

      cart.push(newCartItem);

      localStorage.setItem("cart", JSON.stringify(cart));

      return {
        ...state,
        cart,
        totalItems: totalItems + 1,
        totalPrice: totalPrice + newCartItem.price,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: payload.cart,
        totalItems: payload.cart.length,
        totalPrice: payload.totalPrice,
      };
    case CHANGE_QUANTITY:
      return {
        ...state,
        cart: payload.cart,
        totalPrice: payload.totalPrice,
      };
    case CLEAR_CART:
      localStorage.removeItem("cart");

      return {
        ...state,
        totalItems: 0,
        totalPrice: 0,
        cart: [],
        loading: false,
      };
    case SET_LOADING_CART:
      return { ...state, loading: payload.loading };
    default:
      return state;
  }
};

export default cartReducer;
