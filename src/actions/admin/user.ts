import {
  ADMIN_LOGIN,
  VALIDATE_ADMIN_LOGIN,
  GET_USERS_TOTAL_COUNT,
  ADMIN_LOG_OUT,
} from "../types/admin/user";
import { SET_ERROR } from "../types/formError";
import { CANNOT_CLICK_BUTTON, CAN_CLICK_BUTTON } from "../types/formButton";
import { API } from "../../config";
import { Dispatch } from "redux";
import axios from "axios";

export const login = (email: string, password: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({ type: CANNOT_CLICK_BUTTON });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    const res = await axios.post(`${API}/admin/login`, body, config);

    if (!res.data) {
      dispatch({
        type: SET_ERROR,
        payload: {
          errorMessage: "Περιοχή Admin! Παρακαλώ γυρίστε πίσω στην αρχική.",
        },
      });
    } else {
      dispatch({ type: ADMIN_LOGIN, payload: res.data });
    }

    dispatch({ type: CAN_CLICK_BUTTON });
  } catch (err) {
    dispatch({ type: CAN_CLICK_BUTTON });
    dispatch({
      type: SET_ERROR,
      payload: {
        errorMessage:
          "Λάθος κωδικός ή email! Παρακαλώ αν δεν είστε ο admin γυρίστε πίσω στην αρχική.",
      },
    });
  }
};

export const validateLogin = (email: string, password: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({ type: CANNOT_CLICK_BUTTON });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    const res = await axios.post(`${API}/admin/validate_login`, body, config);

    if (!res.data) {
      await axios.post(`${API}/message/notify_admin`);

      dispatch({
        type: SET_ERROR,
        payload: {
          errorMessage:
            "Λάθος Κωδικός! Ο admin ειδοποιήθηκε για την παραβίαση αυτή παρακαλώ αν δεν είστε ο admin γυρίστε πίσω στην αρχική.",
        },
      });
    } else {
      dispatch({ type: VALIDATE_ADMIN_LOGIN });
    }
    dispatch({ type: CAN_CLICK_BUTTON });
  } catch (err) {
    dispatch({ type: CAN_CLICK_BUTTON });
    alert(
      "Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα και να προσπαθήσεις ξανά."
    );
  }
};

export const getUsersTotalCount = (userId: string, token: string) => async (
  dispatch: Dispatch
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      `${API}/admin/users_total_count/${userId}`,
      config
    );

    dispatch({ type: GET_USERS_TOTAL_COUNT, payload: res.data });
  } catch (err) {
  }
};

export const logOut = () => (dispatch: Dispatch) => {
  dispatch({ type: ADMIN_LOG_OUT });
};
