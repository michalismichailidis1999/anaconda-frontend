import { API } from "../../config";
import { Dispatch } from "redux";
import axios from "axios";
import {
  GET_PRODUCTS_TOTAL_COUNT,
  SET_SHOW_CREATE_PRODUCT,
  SET_SHOW_PRODUCTS,
  SET_SHOW_UPDATE_PRODUCT,
  FETCHING_PRODUCTS,
  PRODUCTS_FETCHED,
  FETCHING_PRODUCT,
  PRODUCT_FETCHED,
  PRODUCT_UPDATED,
  IMAGE_UPLOADED,
  PRODUCT_CREATED,
  PRODUCT_DELETED,
  GET_PRODUCT_IMAGES
} from "../types/admin/product";

export const getProductsTotalCount = (userId: string, token: string) => async (
  dispatch: Dispatch
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      `${API}/admin/products_total_count/${userId}`,
      config
    );

    dispatch({ type: GET_PRODUCTS_TOTAL_COUNT, payload: res.data });
  } catch (err) {
  }
};

export const setShowProducts = (show: boolean) => (dispatch: Dispatch) => {
  dispatch({ type: SET_SHOW_PRODUCTS, payload: { show } });
};

export const setShowCreateProduct = (show: boolean) => (dispatch: Dispatch) => {
  dispatch({ type: SET_SHOW_CREATE_PRODUCT, payload: { show } });
};

export const setShowUpdateProduct = (show: boolean) => (dispatch: Dispatch) => {
  dispatch({ type: SET_SHOW_UPDATE_PRODUCT, payload: { show } });
};

export const fetchProducts = (
  userId: string,
  token: string,
  search: string
) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: FETCHING_PRODUCTS });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      `${API}/admin/products/${userId}?${search}`,
      config
    );

    dispatch({ type: PRODUCTS_FETCHED, payload: { products: res.data } });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const fetchProduct = (
  userId: string,
  token: string,
  productId: string
) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: FETCHING_PRODUCT });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      `${API}/admin/product/${productId}/${userId}`,
      config
    );

    dispatch({ type: PRODUCT_FETCHED, payload: { product: res.data } });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const uploadImage = (
  userId: string,
  token: string,
  formData: FormData
) => async (dispatch: Dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const body = formData;

    await axios.post(
      `${API}/admin/product/${userId}/upload_image`,
      body,
      config
    );

    dispatch({ type: IMAGE_UPLOADED });
  } catch (err) {
    alert(
      "Κάτι πήγε στραβά. Η φωτογραφία δεν μπόρεσε να ανέβει. Κάνε ανανέωση και δοκίμασε ξάνα ή επεξεργάσου το προϊόν."
    );
  }
};

export const updateProduct = (
  userId: string,
  token: string,
  productId: string,
  formData: Object
) => async (dispatch: Dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': "application/json"
      },
    };

    const body = JSON.stringify(formData)

    await axios.put(
      `${API}/admin/product/${userId}/${productId}/update?update=true`,
      body,
      config
    );

    dispatch({ type: PRODUCT_UPDATED });
  } catch (err) {
    alert(
      "Κάτι πήγε στραβά. Πιθανότατα αυτό το όνομα προϊόντος είναι είδη καταχωρημένο. Αν δεν φταίει αυτό δοκίμασε να ανανεώσεις την σελίδα και προσπάθήησε ξανά."
    );
  }
};

export const createProduct = (
  userId: string,
  token: string,
  formData: Object
) => async (dispatch: Dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': "application/json"
      },
    };

    const body = JSON.stringify(formData)

    await axios.post(`${API}/admin/product/${userId}/create`, body, config);

    dispatch({ type: PRODUCT_CREATED });
  } catch (err) {
    alert(
      "Κάτι πήγε στραβά. Πιθανότατα αυτό το όνομα προϊόντος είναι είδη καταχωρημένο. Αν δεν φταίει αυτό δοκίμασε να ανανεώσεις την σελίδα και προσπάθήησε ξανά."
    );
  }
};

export const deleteProduct = (
  userId: string,
  token: string,
  productId: string
) => async (dispatch: Dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`${API}/admin/product/${userId}/${productId}`, config);

    dispatch({ type: PRODUCT_DELETED });
  } catch (err) {
    alert(
      "Κάτι πήγε στραβά. Το προϊόν δεν κατάφερε να διαγραφεί. Κάνε ανανέωση και δοκίμασε ξάνα ή επεξεργάσου το προϊόν."
    );
  }
};


export const getProductImages = (userId: string, token:string) => async (dispatch:Dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const res = await axios.get(`${API}/admin/product_images/${userId}`, config);

    dispatch({type: GET_PRODUCT_IMAGES, payload: {productImages: res.data}});
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
}