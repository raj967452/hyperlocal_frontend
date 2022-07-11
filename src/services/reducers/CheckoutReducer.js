import {
  NEXT_STEP,
  PREVIOUS_STEP,
  FORM_ERRORS,
  FORM_VALUES,
  SHIPPING_ADDRESS,
  BILLING_ADDRESS,
} from "../constants/CheckoutConstant";

export const checkoutReducer = (state = {}, action) => {
  switch (action.type) {
    case NEXT_STEP:
      return {
        ...state,
        activeStep: state.activeStep + 1,
      };

    case PREVIOUS_STEP:
      return {
        ...state,
        activeStep: state.activeStep - 1,
      };

    // case FORM_VALUES:
    //   return {
    //     ...state,
    //     shippingAddress: action.payload,
    //   };

    // case FORM_ERRORS:
    //   return {
    //     ...state,
    //     paymentMethod: action.payload,
    //   };
    case SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case BILLING_ADDRESS:
      return {
        ...state,
        billingAddress: action.payload,
      };
    default:
      return state;
  }
};
