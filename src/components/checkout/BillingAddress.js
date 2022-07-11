import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../services/actions/CheckoutAction";
/*import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";*/

import countries  from "../../utils/countriesList";

import { initialValuesBilling as initialValues } from "../../utils/initialValuesBilling";
import useForm from "../../utils/useForm";
import { validator } from "../../utils/Validator";

import {
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  NativeSelect,
  Autocomplete,
  Box,
} from "@material-ui/core";

const BillingAddress = (props) => {
  // // Have to register the languages you want to use
  // countries.registerLocale(enLocale);

  // // Returns an object not a list
  // const countryObj = countries.getNames("en", { select: "official" });
  // const countryArr = Object.entries(countryObj).map(([key, value]) => {
  //   return {
  //     label: value,
  //     value: key,
  //   };
  const checkout = useSelector((state) => state.checkout);
  const { billingAddress } = checkout;

  const nextSteps = () => {
    console.log(" Submited");
  };

  const { handleChange, handleBlur, handleSubmit, state, errors } = useForm({
    initialValues,
    callback: nextSteps,
    validator,
  });

  const {
    firstName,
    lastName,
    address,
    address2,
    city,
    userState,
    country,
    postalcode,
    phone,
    landMark,
  } = state;
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  /*let isValidForm =
    Object.values(errors).filter((error) => typeof error !== "undefined")
      .length === 0;*/

  // Check if all values are not empty and if there are some errors
  /*const isError = useCallback(() =>
    Object.keys({
      firstName,
      lastName,
      address,
      city,
      userState,
      country,
      postalcode,
      phone,
    }).some(
      (name) =>
        (initialValues[name].required && !initialValues[name].value) ||
        initialValues[name].error
    )
  );*/

  return (
    <>
      <Typography variant="h6">Billing address</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            placeholder="Your first name"
            defaultValue={firstName.value}
            onChange={handleChange}
            error={!!firstName.error}
            helperText={firstName.error}
            required={firstName.required}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            placeholder="Your last name"
            defaultValue={lastName.value}
            onChange={handleChange}
            error={!!lastName.error}
            helperText={lastName.error}
            required={lastName.required}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address1"
            name="address"
            label="Address"
            fullWidth
            placeholder="Enter billing address"
            defaultValue={address.value}
            onChange={handleChange}
            error={!!address.error}
            helperText={address.error}
            required={address.required}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address 2"
            fullWidth
            placeholder="Enter billing address 2"
            defaultValue={address2.value}
            onChange={handleChange}
            helperText={address.error}
            required={address.required}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="city"
            name="city"
            label="City"
            fullWidth
            placeholder="Enter your city name"
            defaultValue={city.value}
            onChange={handleChange}
            error={!!city.error}
            helperText={city.error}
            required={city.required}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="userState"
            name="userState"
            label="State/Province/Region"
            fullWidth
            placeholder="Enter State/Province/Region name"
            defaultValue={userState.value}
            onChange={handleChange}
            error={!!userState.error}
            helperText={userState.error}
            required={userState.required}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="postalcode"
            name="postalcode"
            label="Zip / Postal code"
            type="number"
            fullWidth
            placeholder="Enter valid Zip / Postal code"
            defaultValue={postalcode.value}
            onChange={handleChange}
            error={!!postalcode.error}
            helperText={postalcode.error}
            required={postalcode.required}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="country">Country</InputLabel>
            {/* <NativeSelect
              id="country"
              name="country"
              label="Country"
              defaultValue={country.value}
              error={!!country.error}
              onChange={handleChange}
              onBlur={handleBlur}
              required={country.required}
            >
              {!!countryArr?.length &&
                countryArr.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}

            </NativeSelect> */}
            {/* <Select
              id="country"
              name="country"
              label="Country"
              error={!!country.error}
              defaultValue={country.value ?? ""}
              onChange={handleChange}
              onBlur={handleBlur}
              required={country.required}
            >
              {!!countryArr?.length &&
                countryArr.map(({ label, value }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
            </Select> */}

            <Autocomplete
              id="country-select"
              sx={{ width: 300 }}
              options={countries}
              autoHighlight
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    alt=""
                  />
                  {option.label} ({option.code}) +{option.phone}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose a country"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="landMark"
            name="landMark"
            label="Landmark"
            type="text"
            fullWidth
            placeholder="Landmark"
            defaultValue={landMark.value}
            onChange={handleChange}
            error={!!landMark.error}
            helperText={landMark.error}
            required={landMark.required}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="phone"
            name="phone"
            label="Phone number"
            type="number"
            fullWidth
            placeholder="Enter mobile phone number"
            defaultValue={phone.value}
            onChange={handleChange}
            error={!!phone.error}
            helperText={phone.error}
            required={phone.required}
            onBlur={handleBlur}
          />
        </Grid>
        {/* <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Use this address for shipping as well"
            />
          </Grid> */}
      </Grid>
    </>
  );
};

export default BillingAddress;
