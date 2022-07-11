import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import { InputBase } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { DeleteRounded } from "@material-ui/icons";

import NoImage from "../../assets/images/no_image.png";

const BootstrapInput = withStyles((theme) => ({
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: 15,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 200,
    margin: "1rem",
    backgroundSize: "inherit",
    backgroundPosition: "top center",
  },
}));

const CartItems = React.memo(function CartItems({
  item,
  updateQty,
  removeItem,
}) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.cover} image={NoImage} title={item.name} />
      <CardContent className={classes.content}>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Category Name...
        </Typography>
        <Typography variant="h5" component="h2" color="secondary">
          {item.name}
        </Typography>
        <hr />
        <Box
          sx={{ display: "flex", flexDirection: "row" }}
          style={{ margin: "1rem 0" }}
        >
          <Grid container spacing={2} mt={2}>
            <Grid item xs={10} sx={{ display: "flex" }}>
              <Grid container spacing={2} mb={2} sx={{ display: "flex" }}>
                <Grid item xs={7}>
                  <Typography variant="body1" component="span">
                    Weight (Gms)
                  </Typography>
                </Grid>
                <Grid item xs={5} style={{ textAlign: "right" }}>
                  <Typography variant="body1" component="span">
                    {item.weightInGms} (gm)
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={7}>
                  <Typography
                    variant="body1"
                    component="span"
                    style={{ fontWeight: "bold" }}
                  >
                    Price
                  </Typography>
                </Grid>
                <Grid item xs={5} style={{ textAlign: "right" }}>
                  {item.discountedSellingPrice ? (
                    <>
                      <Typography
                        variant="body1"
                        component="span"
                        color="primary"
                        style={{ textDecoration: "line-through" }}
                      >
                        Rs. {item.mrp}/Kg
                      </Typography>
                      <br />
                      <Typography
                        variant="body1"
                        component="span"
                        color="secondary"
                        style={{ textDecoration: "none" }}
                      >
                        Rs. {item.discountedSellingPrice}/Kg
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="h6" component="span" color="primary">
                      Rs. {item.mrp}/Kg
                    </Typography>
                  )}
                </Grid>
              </Grid>

              <Grid container spacing={2} mt={2}>
                <Grid item xs={7}>
                  <InputLabel id={item._id}>Quantity</InputLabel>
                </Grid>
                <Grid item xs={5} style={{ textAlign: "right" }}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      native
                      inputProps={{
                        name: item._id,
                        id: "pQty_" + item._id,
                      }}
                      value={item.qty}
                      onChange={(e) =>
                        updateQty(item._id, Number(e.target.value))
                      }
                      label="Quantity"
                      input={
                        <BootstrapInput
                          name={item._id}
                          id={"pQty_" + item._id}
                        />
                      }
                    >
                      {[...Array(parseInt(item.availableQuantity)).keys()].map(
                        (x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2} style={{ textAlign: "right" }}>
              <IconButton
                aria-label="delete"
                onClick={() => removeItem(item._id)}
              >
                <DeleteRounded />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
});

export default CartItems;
