import axios from "../ApiCallHelper";

import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
} from "../constants/ProductConstant";

export const listProduct = () => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });
  try {
    const { data } = await axios.get("/api/products");
    if (data) {
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: "No Product in the list...",
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const detailsProduct = (productID) => async (dispatch) => {
  console.log(productID);
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productID });
  try {
    const { data } = await axios.get(`/api/products/${productID}`);
    console.log(productID);
    if (data) {
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: "Product Details is not available...",
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.message,
    });
  }
};
