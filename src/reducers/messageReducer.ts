import { MessageState } from "../interfaces";
import { MESSAGE_SENT, HIDE_POPUP } from "../actions/types/message";

const initialState: MessageState = {
  showPopup: false,
};

const messageReducer = (state = initialState, action: { type: string }) => {
  const { type } = action;

  switch (type) {
    case MESSAGE_SENT:
      return { ...state, showPopup: true };
    case HIDE_POPUP:
      return { ...state, showPopup: false };
    default:
      return state;
  }
};

export default messageReducer;
