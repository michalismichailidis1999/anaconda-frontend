import { API } from "../../config";
import { Dispatch } from "redux";
import axios from "axios";
import {
  GET_MESSAGES_TOTAL_COUNT,
  MESSAGE_DELETED,
  MESSAGE_UPDATED,
  SET_SHOW_MESSAGES,
  ANSWER_SENT,
  FETCHING_MESSAGES,
  MESSAGES_FETCHED,
  FETCHING_MESSAGE,
  MESSAGE_FETCHED,
} from "../types/admin/message";

export const getMessagesTotalCount = (userId: string, token: string) => async (
  dispatch: Dispatch
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      `${API}/admin/messages_total_count/${userId}`,
      config
    );

    dispatch({ type: GET_MESSAGES_TOTAL_COUNT, payload: res.data });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const setShowMessages = (show: boolean) => (dispatch: Dispatch) => {
  dispatch({ type: SET_SHOW_MESSAGES, payload: { show } });
};

export const fetchMessages = (
  userId: string,
  token: string,
  query: string
) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: FETCHING_MESSAGES });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      `${API}/admin/messages/${userId}?${query}`,
      config
    );

    dispatch({ type: MESSAGES_FETCHED, payload: { messages: res.data } });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const fetchMessage = (
  userId: string,
  token: string,
  messageId: string
) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: FETCHING_MESSAGE });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      `${API}/admin/message/${messageId}/${userId}`,
      config
    );

    dispatch({ type: MESSAGE_FETCHED, payload: { message: res.data } });
  } catch (err) {
    alert("Κάτι πήγε στραβά. Δοκίμασε να ανανεώσεις την σελίδα.");
  }
};

export const updateMessage = (
  userId: string,
  token: string,
  messageId: string,
  checked: boolean
) => async (dispatch: Dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const body = JSON.stringify({ checked });

    await axios.put(
      `${API}/admin/message/${messageId}/${userId}`,
      body,
      config
    );

    dispatch({ type: MESSAGE_UPDATED });
  } catch (err) {
    alert(
      "Κάτι πήγε στραβά και το μήνυμα δεν κατάφερε να επεξεργαστεί. Δοκίμασε να ανανεώσεις την σελίδα και να προσπαθήσεις ξανά."
    );
  }
};

export const deleteMessage = (
  userId: string,
  token: string,
  messageId: string
) => async (dispatch: Dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`${API}/admin/message/${messageId}/${userId}`, config);

    dispatch({ type: MESSAGE_DELETED });
  } catch (err) {
    alert(
      "Κάτι πήγε στραβά και το μήνυμα δεν κατάφερε να διαγραφεί. Δοκίμασε να ανανεώσεις την σελίδα και να προσπαθήσεις ξανά."
    );
  }
};

export const respondToClient = (
  userId: string,
  token: string,
  email: string,
  reply: string
) => async (dispatch: Dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    let body = JSON.stringify({ email });

    const res = await axios.post(`${API}/email_exists`, body, config);

    if (res.data === true) {
      body = JSON.stringify({ reply, email });

      await axios.post(
        `${API}/admin/message/respond_to_client/${userId}`,
        body,
        config
      );

      dispatch({ type: ANSWER_SENT });
    } else {
      alert(
        "Το email αυτό δεν υπάρχει. Ο πελάτης πιθανότατα πληκτρολόγησε λανθασμένα το email του."
      );
    }
  } catch (err) {
    alert(
      "Κάτι πήγε στραβά και το μήνυμα δεν κατάφερε να σταλθεί. Δοκίμασε να ανανεώσεις την σελίδα και να προσπαθήσεις ξανά."
    );
  }
};
