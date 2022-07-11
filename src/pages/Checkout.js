import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import "../styles/Checkout.css";

import { Grid, Typography, Container } from "@material-ui/core";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import OrderSummaryItem from "../components/checkout/OrderSummaryItem";
import BillingAddress from "../components/checkout/BillingAddress";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
    },
    button: {
      marginTop: "0.5rem",
      marginRight: "0.5rem",
    },
    actionsContainer: {
      marginBottom: "1rem",
    },
    resetContainer: {
      padding: "1.5rem",
    },
    step_label_root: {
      fontSize: "1.5rem",
    },
  })
);

const stepsHeadings = [
  "Billing address",
  "Shipping address",
  "Payment details",
  "Review your order",
];

/*function getSteps() {
  return [
    <b style={{ color: "purple" }}>Shipping address</b>,
    <b style={{ color: "purple" }}>Billing address</b>,
    <b style={{ color: "purple" }}>Payment details</b>,
    <b style={{ color: "purple" }}>Review your order</b>,
  ];
}*/

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BillingAddress />;
    // case 1:
    //   return <AddressForm />;
    // case 2:
    //   return <PaymentForm />;
    // case 3:
    //   return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

const Checkout = (props) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  if (!userInfo) {
    props.history.push("/signin");
  }

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const dispatch = useDispatch();

  return (
    <>
      <Container>
        <Typography gutterBottom variant="h3" component="h1" color="primary">
          CheckOut
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} md={8}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {stepsHeadings.map((label, index) => (
                <Step key={label}>
                  <StepLabel classes={{ label: classes.step_label_root }}>
                    {label}
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2">
                      Please enter your valid address for billing...
                    </Typography>
                    {getStepContent(activeStep)}
                    <Grid container spacing={5}>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          disabled={activeStep === 0}
                          color="primary"
                          onClick={handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={handleNext}
                          className={classes.button}
                        >
                          {activeStep === stepsHeadings.length - 1
                            ? "Finish"
                            : "Continue"}
                        </Button>
                      </Grid>
                    </Grid>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === stepsHeadings.length && (
              <Paper square elevation={0} className={classes.resetContainer}>
                <Typography>Form is submitted</Typography>
                <Button onClick={handleReset} className={classes.button}>
                  Reset
                </Button>
              </Paper>
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <OrderSummaryItem />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Checkout;
