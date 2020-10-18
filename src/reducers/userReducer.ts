import { UserState, FormResult, UserDetails, SearchedOrder } from "../interfaces";
import {
  SIGN_IN,
  SIGN_UP,
  GET_USER_DETAILS,
  SAVING_CHANGES,
  CHANGES_SAVED,
  DELIVERY_DETAILS_UPDATED,
  USER_FIRST_AND_LAST_NAME_UPDATED,
  USER_EMAIL_UPDATED,
  EMAIL_IS_UPDATING,
  RESET_EMAIL_UPDATE,
  PASSOWORD_IS_UPDATING,
  RESET_PASSWORD_UPDATE,
  PASSWORD_UPDATED,
  LOG_OUT,
  ORDER_NOT_FOUND,
  SEARCH_ORDER,
  SEARCHING_FOR_MY_ORDER
} from "../actions/types/user";

const initialState: UserState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") + "").user
    : {
        id: "",
        first_name: "",
        last_name: "",
        email: "",
      },
  details:
    localStorage.getItem("userDetails") &&
    JSON.parse(localStorage.getItem("userDetails") + "") !== ""
      ? JSON.parse(localStorage.getItem("userDetails") + "")
      : {
          id: -9999,
          county: "",
          address: "",
          phone: "",
          zipcode: "",
          city: "",
        },
  isAuthenticated: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") + "").isAuthenticated
    : false,
  token: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") + "").token
    : "",
  savingChanges: false,
  emailIsUpdating: false,
  emailUpdated: false,
  passwordUpdated: false,
  passwordIsUpdating: false,
  searchedOrder: {
    orderDetails: {
      status: "",
      total_price: 0,
      extra_price: 0,
      payment_method: ""
    },
    orderProducts: []
  },
  orderNotFound: false
};

const userReducer = (
  state = initialState,
  action: {
    type: string;
    payload: {
      result: FormResult;
      details: UserDetails;
      firstName: string;
      lastName: string;
      email: string;
      searchedOrder: SearchedOrder
    };
  }
) => {
  const { type, payload } = action;
  switch (type) {
    case SIGN_UP:
    case SIGN_IN:
      const { token, user } = payload.result;

      localStorage.setItem(
        "user",
        JSON.stringify({
          token,
          user,
          isAuthenticated: true,
        })
      );

      return {
        ...state,
        user,
        token,
        isAuthenticated: true,
      };
    case GET_USER_DETAILS:
    case DELIVERY_DETAILS_UPDATED:
      localStorage.setItem("userDetails", JSON.stringify(payload.details));
      return { ...state, details: payload.details };
    case SAVING_CHANGES:
      return { ...state, savingChanges: true };
    case CHANGES_SAVED:
      return {
        ...state,
        savingChanges: false,
      };
    case USER_EMAIL_UPDATED:
      let updatedUser = JSON.parse("" + localStorage.getItem("user"));

      updatedUser.user.email = payload.email;

      localStorage.setItem("user", JSON.stringify(updatedUser));

      return {
        ...state,
        user: updatedUser.user,
        emailIsUpdating: false,
        emailUpdated: true,
      };
    case USER_FIRST_AND_LAST_NAME_UPDATED:
      let updatedUser2 = JSON.parse("" + localStorage.getItem("user"));

      updatedUser2.user.first_name = payload.firstName;
      updatedUser2.user.last_name = payload.lastName;

      localStorage.setItem("user", JSON.stringify(updatedUser2));

      return { ...state, user: updatedUser2.user };
    case EMAIL_IS_UPDATING:
      return { ...state, emailIsUpdating: true };
    case RESET_EMAIL_UPDATE:
      return { ...state, emailIsUpdating: false, emailUpdated: false };
    case PASSOWORD_IS_UPDATING:
      return { ...state, passwordIsUpdating: true };
    case RESET_PASSWORD_UPDATE:
      return { ...state, passwordIsUpdating: false, passwordUpdated: false };
    case PASSWORD_UPDATED:
      return { ...state, passwordIsUpdating: false, passwordUpdated: true };
    case LOG_OUT:
      localStorage.removeItem("user");
      localStorage.removeItem("userDetails");

      let defaultUser = {
        id: "",
        first_name: "",
        last_name: "",
        email: "",
      };
      let defaultDetails = {
        id: -9999,
        county: "",
        address: "",
        phone: "",
        zipcode: "",
        city: "",
      };

      return {
        ...state,
        isAuthenticated: false,
        token: "",
        user: defaultUser,
        details: defaultDetails,
        savingChanges: false,
        emailIsUpdating: false,
        emailUpdated: false,
        passwordIsUpdating: false,
        passwordUpdated: false,
      };
    case SEARCH_ORDER:
      return {...state, searchedOrder: payload.searchedOrder};
      case SEARCHING_FOR_MY_ORDER:
        return {...state, searchedOrder: initialState.searchedOrder, orderNotFound: false}
    case ORDER_NOT_FOUND:
      return {...state, orderNotFound: true};
    default:
      return state;
  }
};

export default userReducer;
