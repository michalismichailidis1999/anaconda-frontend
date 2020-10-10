import { FormErrorState } from "../interfaces";
import { SET_ERROR, REMOVE_ERROR } from "../actions/types/formError";

const initialState: FormErrorState = {
  errorMessage: "",
  errorOccured: false
};

const formErrorReducer = (
  state = initialState,
  action: { type: string; payload: { errorMessage: string } }
) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ERROR:
      return {
        ...state,
        errorMessage: payload.errorMessage,
        errorOccured: true
      };
    case REMOVE_ERROR:
      return { ...state, errorMessage: "", errorOccured: false };
    default:
      return state;
  }
};

export default formErrorReducer;
