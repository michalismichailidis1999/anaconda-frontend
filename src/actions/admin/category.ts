import { API } from "../../config";
import { Dispatch } from "redux";
import axios from "axios";
import {
  GET_CATEGORIES_TOTAL_COUNT,
  SET_SHOW_CREATE_CATEGORY,
  SET_SHOW_UPDATE_CATEGORY,
  SET_SHOW_CATEGORIES,
  CATEGORY_DELETED,
  CATEGORY_UPDATED,
  CATEGORY_CREATED,
  SET_CATEGORY,
} from "../types/admin/category";
import { Category } from "../../interfaces";

export const getCategoriesTotalCount = (
  userId: string,
  token: string
) => async (dispatch: Dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      `${API}/admin/categories_total_count/${userId}`,
      config
    );

    dispatch({ type: GET_CATEGORIES_TOTAL_COUNT, payload: res.data });
  } catch (err) {
  }
};

export const setShowCategories = (show: boolean) => (dispatch: Dispatch) => {
  dispatch({ type: SET_SHOW_CATEGORIES, payload: { show } });
};

export const setShowCreateCategory = (show: boolean) => (
  dispatch: Dispatch
) => {
  dispatch({ type: SET_SHOW_CREATE_CATEGORY, payload: { show } });
};
export const setShowUpdateCategory = (show: boolean) => (
  dispatch: Dispatch
) => {
  dispatch({ type: SET_SHOW_UPDATE_CATEGORY, payload: { show } });
};

export const createCategory = (
  userId: string,
  token: string,
  name: string
) => async (dispatch: Dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const body = JSON.stringify({ name });

    await axios.post(`${API}/admin/category/${userId}/create`, body, config);

    dispatch({ type: CATEGORY_CREATED });
  } catch (err) {
    alert(
      "Κάτι πήγε στραβά. Το όνομα αυτό έχει είδη καταχωρηθεί. Αν δεν φταίει αυτό κάνε ανανέωση και δοκίμασε ξανά"
    );
  }
};

export const updateCategory = (
  userId: string,
  token: string,
  name: string,
  categoryId: string
) => async (dispatch: Dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const body = JSON.stringify({ name });

    await axios.put(
      `${API}/admin/category/${categoryId}/${userId}/update`,
      body,
      config
    );

    dispatch({ type: CATEGORY_UPDATED });
  } catch (err) {
    alert(
      "Κάτι πήγε στραβά. Το όνομα αυτό έχει είδη καταχωρηθεί. Αν δεν φταίει αυτό κάνε ανανέωση και δοκίμασε ξανά"
    );
  }
};

export const deleteCategory = (
  userId: string,
  token: string,
  categoryId: string
) => async (dispatch: Dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`${API}/admin/category/${categoryId}/${userId}`, config);

    dispatch({ type: CATEGORY_DELETED });
  } catch (err) {
    alert(
      "Κάτι πήγε στραβά. Η κατηγορία δεν κατάφερε να διαγραφεί. Δοκίμασε να κάνεις ανανέωση και δοκίμασε ξανά"
    );
  }
};

export const setCategory = (category: Category) => (dispatch: Dispatch) => {
  dispatch({ type: SET_CATEGORY, payload: { category } });
};
