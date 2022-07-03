import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../services/actions/CartAction";
import { Link } from "react-router-dom";
import MessageBox from "../components/alert/MessageBox";
import "../styles/Cart.css";
import { CancelIcon } from "@material-ui/icons";

import {
  Grid,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  Box,
  CardContent,
  CardMedia,
  IconButton,
} from "@material-ui/core";
import { RemoveCircle } from "@material-ui/icons";
import NoImage from "../assets/images/no_image.png";

const Cart = (props) => {
  const productID = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty));
    }
  }, [dispatch, productID, qty]);

  const removeProduct = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOut = () => {
    props.history.push("/shipping");
  };

  return (
    <>
      <Container>
        <Link to="/" className="back-res">
          Back to home
        </Link>
        <Grid container spacing={5}>
          <Grid item xs={12} md={8}>
            <Typography gutterBottom variant="h2" component="h1">
              Shopping Cart
            </Typography>
            {cartItems.length === 0 ? (
              <MessageBox>
                Cart is empty. <Link to="/">Go Shopping</Link>
              </MessageBox>
            ) : (
              <ul>
                {cartItems.map((item) => (
                  <li key={item._id}>
                    <Card sx={{ display: "flex" }}>
                      <Box sx={{ display: "flex" }}>
                        <CardContent sx={{ flex: "1 0 auto" }}>
                          <Typography component="h2" variant="h5">
                            <Link to={`/products/product/${item._id}`}>
                              {item.name}
                            </Link>
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="secondary"
                            component="div"
                          >
                            Mac Miller
                          </Typography>
                          <FormControl
                            variant="standard"
                            sx={{ m: 1, minWidth: 120 }}
                          >
                            <InputLabel id="product-qty">Quantity</InputLabel>
                            <Select
                              labelId="product-qty"
                              id="product-qty-standard"
                              value={item.qty}
                              onChange={(e) =>
                                dispatch(
                                  addToCart(item._id, Number(e.target.value))
                                )
                              }
                              label="Quantity"
                            >
                              {[
                                ...Array(
                                  parseInt(item.availableQuantity)
                                ).keys(),
                              ].map((x) => (
                                <MenuItem key={x + 1} value={x + 1}>
                                  {x + 1}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            pl: 1,
                            pb: 1,
                          }}
                        >
                          <IconButton
                            aria-label="remove item"
                            onClick={() => removeProduct(item._id)}
                          >
                            <RemoveCircle sx={{ height: 38, width: 38 }} />
                          </IconButton>
                        </Box>
                      </Box>
                      <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        image={NoImage}
                        alt={item.name}
                      />
                    </Card>
                  </li>
                ))}
              </ul>
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="card card-body">
              <ul>
                <li>
                  <p>
                    Subtotal (
                    {cartItems.reduce((a, c) => {
                      return a + c.qty;
                    }, 0)}{" "}
                    items) :
                  </p>
                  <p className="price">
                    Rs.{" "}
                    {cartItems.reduce(
                      (a, c) => a + c.discountedSellingPrice * c.qty,
                      0
                    )}
                  </p>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={checkOut}
                    className="checkout-btn"
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </li>
              </ul>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Cart;
