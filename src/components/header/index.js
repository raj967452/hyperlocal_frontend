import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/Header.css";

import { signout } from "../../services/actions/UserAction";

/* Material-ui*/
import {
  AccountCircleOutlined,
  ArrowDropDown,
  SearchRounded,
  ShoppingBasket,
} from "@material-ui/icons";

const Header = (props) => {
  const [dropdown, setDropDown] = useState(false);
  const showDropDown = () => {
    if (dropdown) setDropDown(false);
    else setDropDown(true);
  };
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const logOutHandler = () => {
    dispatch(signout());
  };

  const [query, setQuery] = useState("");
  return (
    <header>
      <div className="container">
        <div className="inner-content">
          <div className="brand">
            <Link to="/">Hyperlocal</Link>
          </div>
          <div className="search-bar">
            <input
              className="search-input"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Products"
              value={query}
            />
            <div className="search-btn">
              <Link to={`/searchresults/${query}`}>
                <SearchRounded />
              </Link>
            </div>
          </div>

          <ul className="nav-links">
            <li>
              <Link to="/cart">
                <ShoppingBasket color="action" />
                {cartItems.length > 0 && (
                  <p className="badge">{cartItems.length}</p>
                )}
              </Link>
            </li>
            <li>
              {userInfo ? (
                <div className="header-dropdown">
                  <p onClick={showDropDown}>
                    {userInfo.name}
                    <ArrowDropDown />
                  </p>

                  <ul
                    className={
                      dropdown ? "dropdown-content show" : "dropdown-content"
                    }
                  >
                    <li>
                      <Link to="/profile">Account</Link>
                    </li>
                    <li>
                      <Link to="/orderhistory">Order History</Link>
                    </li>
                    <li>
                      <Link to="/" onClick={logOutHandler}>
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/signin">
                  <AccountCircleOutlined />
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
