import { Dispatch } from "redux";
import {
  SIGN_IN,
  SIGN_UP,
  GET_USER_DETAILS,
  SAVING_CHANGES,
  CHANGES_SAVED,
  DELIVERY_DETAILS_UPDATED,
  USER_FIRST_AND_LAST_NAME_UPDATED,
  USER_PASSWORD_UPDATED,
  USER_EMAIL_UPDATED,
  EMAIL_IS_UPDATING,
  RESET_EMAIL_UPDATE,
  RESET_PASSWORD_UPDATE,
  PASSWORD_UPDATED,
  PASSOWORD_IS_UPDATING,
  LOG_OUT,
} from "./types/user";
import { CAN_CLICK_BUTTON, CANNOT_CLICK_BUTTON } from "./types/formButton";
import { SET_ERROR } from "./types/formError";
import axios from "axios";
import { API } from "../config";

export const signup = (formData: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: CANNOT_CLICK_BUTTON });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    let body = JSON.stringify({ email: formData.email });

    let res = await axios.post(`${API}/email_exists`, body, config);

    if (res.data === true) {
      body = JSON.stringify(formData);

      res = await axios.post(`${API}/user/signup`, body, config);

      dispatch({ type: SIGN_UP, payload: { result: res.data } });
    } else {
      dispatch({
        type: SET_ERROR,
        payload: {
          errorMessage:
            "Το email αυτό δεν υπάρχει. Παρακαλώ εισάγετε το email που χρησιμοποιείτε.",
        },
      });
    }

    dispatch({ type: CAN_CLICK_BUTTON });
  } catch (err) {
    dispatch({ type: CAN_CLICK_BUTTON });
    dispatch({
      type: SET_ERROR,
      payload: { errorMessage: "Το email χρησιμοποιείται ήδη" },
    });
  }
};

export const signin = (formData: { email: string; password: string }) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: CANNOT_CLICK_BUTTON });
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const body = JSON.stringify(formData);
  try {
    const res = await axios.post(`${API}/user/signin`, body, config);

    dispatch({ type: SIGN_IN, payload: { result: res.data } });
    dispatch({ type: CAN_CLICK_BUTTON });
  } catch (err) {
    dispatch({ type: CAN_CLICK_BUTTON });
    dispatch({
      type: SET_ERROR,
      payload: { errorMessage: "Το email ή ο κωδικός πρόσβασης είναι λάθος" },
    });
  }
};

export const getUserDetails = (userId: string, token: string) => async (
  dispatch: Dispatch
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(`${API}/user/${userId}/details`, config);

    dispatch({ type: GET_USER_DETAILS, payload: { details: res.data } });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const updateDeliveryDetails = (
  userId: string,
  token: string,
  detailsId: number,
  details: Object
) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: SAVING_CHANGES });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const body = JSON.stringify(details);

    const res = await axios.put(
      `${API}/user/${userId}/details/${detailsId}/update`,
      body,
      config
    );

    dispatch({
      type: DELIVERY_DETAILS_UPDATED,
      payload: { details: res.data },
    });

    dispatch({ type: CHANGES_SAVED });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const updateUserFirstAndLastNames = (
  userId: string,
  token: string,
  firstName: string,
  lastName: string
) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: SAVING_CHANGES });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const body = JSON.stringify({ firstName, lastName });

    await axios.put(`${API}/user/${userId}/name/update`, body, config);

    dispatch({
      type: USER_FIRST_AND_LAST_NAME_UPDATED,
      payload: { firstName, lastName },
    });

    dispatch({ type: CHANGES_SAVED });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const updateEmail = (
  userId: string,
  token: string,
  email: string
) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: SAVING_CHANGES });
    dispatch({ type: EMAIL_IS_UPDATING });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const body = JSON.stringify({ email });

    await axios.put(`${API}/user/${userId}/email/update`, body, config);

    dispatch({ type: USER_EMAIL_UPDATED, payload: { email } });

    dispatch({ type: CHANGES_SAVED });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: { errorMessage: "Το email αυτό χρησιμοποιείται είδη" },
    });
  }
};

export const updatePassword = (
  userId: string,
  token: string,
  password: string,
  newPassword: string
) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: SAVING_CHANGES });
    dispatch({ type: PASSOWORD_IS_UPDATING });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const body = JSON.stringify({ password, newPassword });

    await axios.put(`${API}/user/${userId}/password/update`, body, config);

    dispatch({ type: USER_PASSWORD_UPDATED });

    dispatch({ type: CHANGES_SAVED });
    dispatch({ type: PASSWORD_UPDATED });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: { errorMessage: "Δεν πληκτρολογήσατε σωστά τον κωδικό σας" },
    });
  }
};

export const resetEmailUpdate = () => (dispatch: Dispatch) => {
  dispatch({ type: RESET_EMAIL_UPDATE });
};

export const resetPasswordUpdate = () => (dispatch: Dispatch) => {
  dispatch({ type: RESET_PASSWORD_UPDATE });
};

export const logOut = () => (dispatch: Dispatch) => {
  dispatch({ type: LOG_OUT });
};
