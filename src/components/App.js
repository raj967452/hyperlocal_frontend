import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./header";

/*Pages */
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";
//import SearchResults from "../pages/SearchResults";

//const SignIn = React.lazy(() => import("../pages/SignIn"));
//const Register = React.lazy(() => import("../pages/Register"));
const ProductPage = React.lazy(() => import("../pages/ProductPage"));
const Checkout = React.lazy(() => import("../pages/Checkout"));

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route exact path="/cart" component={Cart}></Route>

          <Route exact path="/signin" component={SignIn}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route path="/products/product/:id" component={ProductPage}></Route>
          <Route path="/checkout" component={Checkout}></Route>
          {/* <Route
            path="/searchresults/:query"
            component={SearchResults}
            exact
          ></Route> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
