import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import {
  productDetailsReducers,
  productListReducers,
} from "./reducers/ProductReducer";
import {
  userDetailsReducer,
  userRegisterReducer,
  userSigninReducer,
} from "./reducers/UserReducer";
import { cartReducer } from "./reducers/CartReducer";

const initalState = {
  userSignIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

const rootReducer = combineReducers({
  productDetails: productDetailsReducers,
  productList: productListReducers,
  userDetails: userDetailsReducer,
  userRegister: userRegisterReducer,
  userSignin: userSigninReducer,
  cart: cartReducer,
});

export default function configureStore() {
  const middlewares = [thunk];
  const middlewareEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  );

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, initalState, composedEnhancers);

  return store;
}
