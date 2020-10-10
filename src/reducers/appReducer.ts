import { AppState } from "../interfaces";
import {
  SET_INITIAL_QUERY,
  CLICK_ON_PRODUCT_PAGE,
  SET_QUERY_BACK_TO_DEFAULT,
  SET_CATEGORY_NAME_FOR_SHOP,
  SET_IS_ON_ADMIN_AREA,
  SET_ACTIVE_SLIDE,
} from "../actions/types/app";
import { Query } from "../interfaces";

const initialState: AppState = {
  query: {
    page: 1,
    filter: "created_at",
    sortBy: "DESC",
    category: "all",
  },
  productPageClicked: false,
  categoryName: "Όλες",
  isOnAdminArea: false,
  activeSlide: 1,
};
const appReducer = (
  state = initialState,
  action: {
    type: string;
    payload: {
      query: Query;
      rate: number;
      rateChanged: boolean;
      categoryName: string;
      isOnAdminArea: boolean;
      isUnmount: boolean;
      activeSlide: number;
    };
  }
) => {
  const { type, payload } = action;

  switch (type) {
    case SET_INITIAL_QUERY:
      return { ...state, query: payload.query };
    case SET_QUERY_BACK_TO_DEFAULT:
      return { ...state, query: initialState.query };
    case CLICK_ON_PRODUCT_PAGE:
      return { ...state, productPageClicked: true };
    case SET_CATEGORY_NAME_FOR_SHOP:
      return { ...state, categoryName: payload.categoryName };
    case SET_IS_ON_ADMIN_AREA:
      return { ...state, isOnAdminArea: payload.isOnAdminArea };
    case SET_ACTIVE_SLIDE:
      return {
        ...state,
        activeSlide: payload.activeSlide,
      };
    default:
      return state;
  }
};

export default appReducer;
