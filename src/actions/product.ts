import { Dispatch } from "redux";
import {
  GET_BEST_SELLERS,
  GET_NEW_PRODUCTS,
  GET_SALES,
  GET_FILTERED_PRODUCTS,
  GET_RECOMMENDED_PRODUCTS,
  LOADING_PRODUCTS,
  GET_PRODUCT,
  SET_PRODUCT_FETCHED_TO_FALSE,
  RATE_PRODUCT,
  COMMENT_ON_PRODUCT,
  DELETE_COMMENT,
  GET_CATEGORIES,
} from "./types/product";
import axios from "axios";
import { API } from "../config";

export const getNewProducts = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get(`${API}/products?sortBy=DESC&limit=8`);

    dispatch({ type: GET_NEW_PRODUCTS, payload: res.data });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const getBestSellers = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get(
      `${API}/products?filter=sold&sortBy=DESC&limit=8`
    );

    dispatch({ type: GET_BEST_SELLERS, payload: res.data });
  } catch (err) {
  }
};

export const getSales = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get(`${API}/products?filter=sale&limit=8`);

    dispatch({ type: GET_SALES, payload: res.data });
  } catch (err) {
  }
};

export const getFilteredProducts = (query: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({ type: LOADING_PRODUCTS });

    const res = await axios.get(`${API}/products${query}`);

    dispatch({ type: GET_FILTERED_PRODUCTS, payload: res.data });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const searchProduct = (query: string, search: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({ type: LOADING_PRODUCTS });

    if (search === "") {
      search = "empty";
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ search });

    const res = await axios.post(`${API}/product/search${query}`, body, config);

    dispatch({ type: GET_FILTERED_PRODUCTS, payload: { products: res.data } });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const getRecommendations = (categoryId: string) => async (
  dispatch: Dispatch
) => {
  try {
    const res = await axios.get(
      `${API}/products/recommendations?category=${categoryId}`
    );

    dispatch({
      type: GET_RECOMMENDED_PRODUCTS,
      payload: { products: res.data },
    });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const getProduct = (productId: string, userId: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({ type: SET_PRODUCT_FETCHED_TO_FALSE });

    let extraQuery = userId !== "" ? `?userId=${userId}` : "";

    const res = await axios.get(`${API}/product/${productId}` + extraQuery);

    dispatch({ type: GET_PRODUCT, payload: res.data });
  } catch (err) {
    console.log(err);
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const rateProduct = (
  userId: string,
  token: string,
  productId: string,
  stars: number,
  updateRate: boolean = false
) => async (dispatch: Dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const body = JSON.stringify({ stars });

    if (!updateRate) {
      await axios.post(
        `${API}/product/${userId}/${productId}/rate`,
        body,
        config
      );
    } else {
      await axios.put(
        `${API}/product/${userId}/${productId}/rate`,
        body,
        config
      );
    }

    dispatch({ type: RATE_PRODUCT });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const commentOnProduct = (
  userId: string,
  token: string,
  productId: string,
  comment: string
) => async (dispatch: Dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const body = JSON.stringify({ comment });

    await axios.post(
      `${API}/product/${userId}/${productId}/comment`,
      body,
      config
    );

    const res = await axios.get(`${API}/product/${productId}/comments`);

    dispatch({ type: COMMENT_ON_PRODUCT, payload: { comments: res.data } });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const deleteComment = (
  userId: string,
  token: string,
  commentId: number
) => async (dispatch: Dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`${API}/product/${userId}/comment/${commentId}`, config);

    dispatch({ type: DELETE_COMMENT, payload: { commentId: commentId } });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const getCategories = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get(`${API}/categories`);

    dispatch({ type: GET_CATEGORIES, payload: { categories: res.data } });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};
