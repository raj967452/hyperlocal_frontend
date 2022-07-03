import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/ProductList.css";
import { listProduct } from "../../services/actions/ProductActions";
import { Grid } from "@material-ui/core";

import Product from "../Product";
import LoadingBox from "../alert/LoadingBox";
import MessageBox from "../alert/MessageBox";

const ProductList = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);
  return (
    <div className="home-product-container">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <h2 className="sec-title">Products</h2>
          <div className="product-container">
            <Grid container spacing={2}>              
            {products.map((product) => {
              return <Product key={product._id} product={product} />;
            })}
            </Grid>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
