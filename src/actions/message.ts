import { Dispatch } from "redux";
import axios from "axios";
import { API } from "../config";
import { MESSAGE_SENT, HIDE_POPUP } from "./types/message";

export const sendMessage = (formData: {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}) => async (dispatch: Dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(formData);

    await axios.post(`${API}/message/send_message`, body, config);

    dispatch({ type: MESSAGE_SENT });
  } catch (err) {
    alert(
      "Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα και να προσπαθήσεις ξανά."
    );
  }
};

export const hidePopup = () => (dispatch: Dispatch) => {
  dispatch({ type: HIDE_POPUP });
};
