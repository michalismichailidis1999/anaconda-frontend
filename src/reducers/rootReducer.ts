import { combineReducers } from "redux";
import productReducer from "./productReducer";
import userReducer from "./userReducer";
import formErrorReducer from "./formErrorReducer";
import formButtonReducer from "./formButtonReducer";
import cartReducer from "./cartReducer";
import messageReducer from "./messageReducer";
import appReducer from "./appReducer";
import checkoutReducer from "./checkoutReducer";
import orderReducer from "./orderReducer";
import adminReducer from "./admin/adminReducer";

const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  formError: formErrorReducer,
  formButton: formButtonReducer,
  cart: cartReducer,
  message: messageReducer,
  app: appReducer,
  checkout: checkoutReducer,
  order: orderReducer,
  admin: adminReducer
});

export default rootReducer;
