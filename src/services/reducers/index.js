import { combineReducers } from "redux";
import { productDetailsReducers, productListReducers } from "./ProductReducer";
import {
  userDetailsReducer,
  userRegisterReducer,
  userSigninReducer,
} from "./UserReducer";
import { cartReducer } from "./CartReducer";
import { checkoutReducer } from "./CheckoutReducer";

export default combineReducers({
  productDetails: productDetailsReducers,
  productList: productListReducers,
  userDetails: userDetailsReducer,
  userRegister: userRegisterReducer,
  userSignin: userSigninReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
});
