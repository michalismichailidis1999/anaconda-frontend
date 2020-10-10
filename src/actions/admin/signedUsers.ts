import { Dispatch } from "redux";
import { API } from "../../config";
import {
  FETCHING_SINGED_USERS,
  SINGED_USERS_FETCHED,
} from "../types/admin/signedUsers";
import axios from "axios";

export const fetchSignedUsers = (userId: string, token: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({ type: FETCHING_SINGED_USERS });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(`${API}/admin/users/${userId}`, config);

    dispatch({ type: SINGED_USERS_FETCHED, payload: { users: res.data } });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};
