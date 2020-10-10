import { Dispatch } from "redux";
import { SET_ERROR, REMOVE_ERROR } from "./types/formError";

export const setError = (message: string) => (dispatch: Dispatch) => {
  dispatch({ type: SET_ERROR, payload: { errorMessage: message } });
};

export const removeError = () => (dispatch: Dispatch) => {
  dispatch({ type: REMOVE_ERROR });
};
