import { Dispatch } from "redux";
import {
  SET_INITIAL_QUERY,
  CLICK_ON_PRODUCT_PAGE,
  SET_QUERY_BACK_TO_DEFAULT,
  SET_CATEGORY_NAME_FOR_SHOP,
  SET_IS_ON_ADMIN_AREA,
  SET_ACTIVE_SLIDE,
} from "./types/app";
import { Query } from "../interfaces";

export const setInitialQuery = (query: Query) => (dispatch: Dispatch) => {
  dispatch({ type: SET_INITIAL_QUERY, payload: { query } });
};

export const setQueryBackToDefault = () => (dispatch: Dispatch) => {
  dispatch({ type: SET_QUERY_BACK_TO_DEFAULT });
};

export const clickOnProductPage = () => (dispatch: Dispatch) => {
  dispatch({ type: CLICK_ON_PRODUCT_PAGE });
};

export const setCategoryName = (categoryName: string) => (
  dispatch: Dispatch
) => {
  dispatch({ type: SET_CATEGORY_NAME_FOR_SHOP, payload: { categoryName } });
};

export const setIsOnAdminArea = (isOnAdminArea: boolean) => (
  dispatch: Dispatch
) => {
  dispatch({ type: SET_IS_ON_ADMIN_AREA, payload: { isOnAdminArea } });
};

export const setActiveSlide = (activeSlide: number) => (dispatch: Dispatch) => {
  dispatch({ type: SET_ACTIVE_SLIDE, payload: { activeSlide } });
};
