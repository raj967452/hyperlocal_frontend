import {
  NEXT_STEP,
  PREVIOUS_STEP,
  FORM_ERRORS,
  FORM_VALUES,
  SHIPPING_ADDRESS,
  BILLING_ADDRESS,
} from "../constants/CheckoutConstant";

export const nextSteps = (data) => (dispatch) => {
  dispatch({
    type: NEXT_STEP,
    payload: data,
  });
};

export const previousSteps = (data) => (dispatch) => {
  dispatch({
    type: PREVIOUS_STEP,
    payload: data,
  });
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const saveBillingAddress = (data) => (dispatch) => {
  dispatch({
    type: BILLING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("billingAddress", JSON.stringify(data));
};
