const isText = RegExp(/^[A-Z ]+$/i);
const isEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
const isPhone = RegExp(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4,6})$/); // us
const isZip = RegExp(/^[0-9]{5}([- /]?[0-9]{4})?$/); // us
const isNumber = RegExp(/^\d+$/);

// ************* Validator ***************** //

export const validator = (type, value) => {
  let errors = {};
  switch (type) {
    case "email":
      validateEmail(value, errors);
      break;
    case "password":
      validatePassword(value, errors);
      break;
    case "text":
      validateTextFeild(value, errors);
      break;
    /*case "phone":
      validatePhoneNumber(values.phone, errors);
      break;*/
    default:
  }
  return errors;
};

// ************** Validate Email **************** //
function validateEmail(email, errors) {
  let result = true;
  if (!email) {
    errors.email = "Email is Required";
    result = false;
  } else {
    result = isEmail.test(String(email).toLowerCase());
    if (!result) errors.email = "Invalid Email address";
  }
  return result;
}

// ************** Validate Email **************** //
function validatePassword(pass, errors) {
  let result = true;
  if (!pass) {
    errors.password = "Password is Required";
    result = false;
  } else {
    let lower = /(?=.*[a-z])/;
    result = lower.test(pass);
    if (!result) {
      errors.password = "Password must contain at least one lower case letter.";
      result = false;
    } else if (pass.length < 6) {
      errors.password = "Your password has less than 6 characters.";
      result = false;
    }
  }
  return result;
}

// ************** Validate Email **************** //
function validateTextFeild(value, errors) {
  let result = true;

  if (value && !isText.test(value)) {
    result = false;
    //errors = helperText || "This field accepts text only.";
  }
  return result;
}

// ************** Validate Email **************** //
/*function validatePhoneNumber(phone, errors) {
    let result = true;
    const phoneObj = parsePhoneNumber()
}*/
