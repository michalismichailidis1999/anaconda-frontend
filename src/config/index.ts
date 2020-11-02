import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers/rootReducer";

const middleware = [thunk];

export const store = createStore(
  rootReducer,
  {},
  // composeWithDevTools(applyMiddleware(...middleware))
  applyMiddleware(...middleware)
);

export const API = process.env.REACT_APP_API_URL;
