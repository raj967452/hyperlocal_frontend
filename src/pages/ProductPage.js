import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../styles/ProductPage.css";
import LoadingBox from "../components/alert/LoadingBox";
import MessageBox from "../components/alert/MessageBox";
import { detailsProduct } from "../services/actions/ProductActions";
import { addToCart } from "../services/actions/CartAction";
import {
  Grid,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

import NoImage from "../assets/images/no_image.png";

const ProductPage = (props) => {
  const dispatch = useDispatch();
  const productID = props.match.params.id;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(detailsProduct(productID));
  }, [dispatch, productID, qty]);

  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty));
    }
  }, [dispatch, productID, qty]);

  const addToCartItem = () => {
    props.history.push(`/cart`);
  };

  return (
    <Container>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Link to="/" className="back-res">
            Back to Products
          </Link>
          <Grid container spacing={5}>
            <Grid item xs={12} md={5}>
              <img className="large" src={NoImage} alt={product.name} />
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography gutterBottom variant="h2" component="h2">
                {product.name}
              </Typography>
              <Typography gutterBottom variant="h5" component="p">
                MRP: Rs. {product.mrp}/Kg
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="p"
                color="secondary"
              >
                Our Price: Rs. {product.discountedSellingPrice}/Kg
              </Typography>

              <div className="card card-body">
                <ul>
                  <li>
                    <p>Total amount</p>
                    <div className="price">
                      Rs.{" "}
                      {product.discountedSellingPrice
                        ? product.discountedSellingPrice * qty
                        : product.mrp * qty}
                    </div>
                  </li>
                  <li>
                    <p>Stock</p>
                    {product.quantity > 10 ? (
                      <span className="success">In stock</span>
                    ) : product.quantity < 10 && product.quantity > 0 ? (
                      <span className="m-success">Hurry! Few in stock</span>
                    ) : (
                      <span className="error">Out of stock</span>
                    )}
                  </li>

                  {product.availableQuantity > 0 && (
                    <>
                      <li>
                        <p>Qty</p>
                        <div className="qty-select">
                          <FormControl
                            variant="standard"
                            sx={{ m: 1, minWidth: 120 }}
                          >
                            <InputLabel id="product-qty">Quantity</InputLabel>
                            <Select
                              labelId="product-qty"
                              id="product-qty-standard"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                              label="Quantity"
                            >
                              {[
                                ...Array(
                                  parseInt(product.availableQuantity)
                                ).keys(),
                              ].map((x) => (
                                <MenuItem key={x + 1} value={x + 1}>
                                  {x + 1}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </li>
                      <li>
                        <button className="add-to-cart" onClick={addToCartItem}>
                          Add to cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default ProductPage;
