import { useState, useEffect } from "react";
//import { getCountryCode } from "./Validator";
const useForm = ({ initialValues, callback, validator }) => {
  const [state, setState] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmited, setIsSubmited] = useState(false);
  const [countryCode, setCountryCode] = useState("");

  //   const fieldName = initialValues[name];
  //   if (!fieldName) return;

  //   const { required, validate, minLength, maxLength, helperText } = fieldName;

  useEffect(() => {
    const isValidErrors = () =>
      Object.values(errors).filter((error) => typeof error !== "undefined")
        .length > 0;
    if (isSubmited && !isValidErrors()) callback();
  }, [callback, errors, isSubmited]);

  // ************** Handle Change Event ****************//
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setState(() => ({ ...state, [name]: value }));
    // if (name === "mobileNumber") {
    //   const country = getCountryCode(value);
    //   setCountryCode(() => country);
    // }
  };

  // ************** Handle Blur Event ****************//
  const handleBlur = (e) => {
    const { type, name, value } = e.target;

    const failedFields = validator(state, name);
    setErrors(() => ({
      ...errors,
      [name]: Object.values(failedFields)[0],
    }));
  };

  // ************** Handle Submit Event ****************//
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name: fieldName } = e.target;
    const failedFields = validator(state, fieldName);
    setErrors(() => ({
      ...errors,
      [fieldName]: Object.values(failedFields)[0],
    }));
    setIsSubmited(true);
  };
  return {
    handleChange,
    handleBlur,
    handleSubmit,
    state,
    errors,
    countryCode,
  };
};

export default useForm;
