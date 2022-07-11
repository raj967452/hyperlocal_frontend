import React from "react";
import "../../styles/Product.css";
import NoImage from "../../assets/images/no_image.png";

import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CardActions,
  Link,
} from "@material-ui/core";

const Product = ({ product }) => {
  return (
    <Grid item xs={1} md={3}>
      <Card sx={{ maxWidth: 320 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={NoImage}
            alt={product.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {product.name}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  component="span"
                  color="primary"
                  style={
                    product.discountedSellingPrice
                      ? { textDecoration: "line-through" }
                      : ""
                  }
                >
                  {product.mrp}/Kg
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Typography variant="h6" component="span" color="secondary">
                  {product.discountedSellingPrice}/Kg
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link href={`products/product/${product._id}`}>Product Details</Link>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Product;
