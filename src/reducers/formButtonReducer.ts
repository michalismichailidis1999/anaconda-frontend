import { FormButtonState } from "../interfaces";
import {
  CANNOT_CLICK_BUTTON,
  CAN_CLICK_BUTTON
} from "../actions/types/formButton";

const initialState: FormButtonState = {
  canClick: true
};

const formButtonReducer = (state = initialState, action: { type: string }) => {
  const { type } = action;

  switch (type) {
    case CAN_CLICK_BUTTON:
      return { ...state, canClick: true };
    case CANNOT_CLICK_BUTTON:
      return { ...state, canClick: false };
    default:
      return state;
  }
};

export default formButtonReducer;
