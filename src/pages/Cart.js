import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../services/actions/CartAction";
import { Link } from "react-router-dom";
import MessageBox from "../components/alert/MessageBox";
import "../styles/Cart.css";

import { Grid, Typography, Container, Button } from "@material-ui/core";
import CartItems from "../components/cart/CartItems";
import OrderSummaryItem from "../components/checkout/OrderSummaryItem";

const Cart = (props) => {
  const productID = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty));
    }
  }, [dispatch, productID, qty]);

  const removeProduct = (id) => {
    console.log(id);
    return dispatch(removeFromCart(id));
  };

  const checkOut = () => {
    props.history.push("/checkout");
  };
  const handelQtyChange = useCallback(
    (id, value) => dispatch(addToCart(id, value)),
    [dispatch]
  );

  return (
    <>
      <Container>
        <Link to="/" className="back-res">
          Back to home
        </Link>
        <Typography gutterBottom variant="h3" component="h1" color="primary">
          Shopping Cart
        </Typography>

        <Grid container spacing={5}>
          <Grid item xs={12} md={8}>
            {cartItems.length === 0 ? (
              <MessageBox>
                Cart is empty. <Link to="/">Go Shopping</Link>
              </MessageBox>
            ) : (
              <ul>
                {cartItems.map((item) => (
                  <CartItems
                    key={item._id}
                    item={item}
                    updateQty={handelQtyChange}
                    removeItem={removeProduct}
                  />
                  //   <li key={item._id}>
                  //     <Paper
                  //       sx={{
                  //         p: 2,
                  //         margin: "auto",
                  //         maxWidth: 500,
                  //         flexGrow: 1,
                  //         backgroundColor: (theme) =>
                  //           theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  //       }}
                  //     >
                  //       <Grid container spacing={2}>
                  //         <Grid item>
                  //           <ButtonBase sx={{ width: 128, height: 128 }}>
                  //             <Img alt="complex" src={NoImage} />
                  //           </ButtonBase>
                  //         </Grid>
                  //         <Grid item xs={12} sm container>
                  //           <Grid
                  //             item
                  //             xs
                  //             container
                  //             direction="column"
                  //             spacing={2}
                  //           >
                  //             <Grid item xs>
                  //               <Typography
                  //                 component="h2"
                  //                 variant="h5"
                  //                 color="primary"
                  //               >
                  //                 <Link to={`/products/product/${item._id}`}>
                  //                   {item.name}
                  //                 </Link>
                  //               </Typography>
                  //               <Grid
                  //                 item
                  //                 xs
                  //                 container
                  //                 direction="row"
                  //                 spacing={2}
                  //               >
                  //                 <Typography
                  //                   component="h6"
                  //                   variant="span"
                  //                   color="primary"
                  //                 ></Typography>
                  //               </Grid>
                  //             </Grid>
                  //             <Grid item>
                  //               <IconButton
                  //                 aria-label="remove item"
                  //                 onClick={() => removeProduct(item._id)}
                  //               >
                  //                 <RemoveCircle sx={{ height: 38, width: 38 }} />
                  //               </IconButton>
                  //             </Grid>
                  //           </Grid>
                  //         </Grid>
                  //       </Grid>
                  //     </Paper>

                  //     <Card xs={{ display: "flex", flexDirection: "row" }}>
                  //       <Box xs={{ display: "flex", flexDirection: "column" }}>
                  //         <CardContent sx={{ flex: "1 0 auto" }}>
                  //           <Typography component="h2" variant="h5">
                  //             <Link to={`/products/product/${item._id}`}>
                  //               {item.name}
                  //             </Link>
                  //           </Typography>
                  //           <Typography
                  //             variant="subtitle1"
                  //             color="primary"
                  //             component="div"
                  //           ></Typography>
                  //           <FormControl
                  //             variant="standard"
                  //             sx={{ m: 1, minWidth: 120 }}
                  //           >
                  //             <InputLabel id="product-qty">Quantity</InputLabel>
                  //             <Select
                  //               labelId="product-qty"
                  //               id="product-qty-standard"
                  //               value={item.qty}
                  //               onChange={(e) =>
                  //                 dispatch(
                  //                   addToCart(item._id, Number(e.target.value))
                  //                 )
                  //               }
                  //               label="Quantity"
                  //             >
                  //               {[
                  //                 ...Array(
                  //                   parseInt(item.availableQuantity)
                  //                 ).keys(),
                  //               ].map((x) => (
                  //                 <MenuItem key={x + 1} value={x + 1}>
                  //                   {x + 1}
                  //                 </MenuItem>
                  //               ))}
                  //             </Select>
                  //           </FormControl>
                  //         </CardContent>
                  //         <Box
                  //           sx={{
                  //             display: "flex",
                  //             alignItems: "center",
                  //             pl: 1,
                  //             pb: 1,
                  //           }}
                  //         >
                  //           <IconButton
                  //             aria-label="remove item"
                  //             onClick={() => removeProduct(item._id)}
                  //           >
                  //             <RemoveCircle sx={{ height: 38, width: 38 }} />
                  //           </IconButton>
                  //         </Box>
                  //       </Box>
                  //       <CardMedia
                  //         component="img"
                  //         sx={{ width: 151 }}
                  //         image={NoImage}
                  //         alt={item.name}
                  //       />
                  //     </Card>
                  //   </li>
                ))}
              </ul>
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <OrderSummaryItem />
            <Grid container style={{ margin: "2rem 0" }}>
              <Grid item xs={12}>
                <Button
                  style={{ width: "100%" }}
                  size="large"
                  variant="contained"
                  color="secondary"
                  onClick={checkOut}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Cart;
