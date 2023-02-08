const isEmpty = require("./validationCheck");
const validator = require("validator");
const moment = require("moment");

const validateCustomer = (data) => {
  let errors = {};
  data.Name = !isEmpty(data.Name) ? data.Name : "";
  data.LastName = !isEmpty(data.LastName) ? data.LastName : "";
  data.Email = !isEmpty(data.Email) ? data.Email : "";
  data.City = !isEmpty(data.City) ? data.City : "";
  data.BirthDate = !isEmpty(data.BirthDate) ? data.BirthDate : "";

  if (validator.isEmpty(data.Name)) {
    errors.Name = "Required Name";
  }

  if (validator.isEmpty(data.LastName)) {
    errors.LastName = "Required LastName";
  }

  if (!validator.isEmail(data.Email)) {
    errors.Email = "Wrong Email format";
  }

  if (validator.isEmpty(data.Email)) {
    errors.Email = "Required Email";
  }

  if (validator.isEmpty(data.City)) {
    errors.City = "Required City";
  }

  if (validator.isEmpty(data.BirthDate)) {
    errors.BirthDate = "Required BirthDate";
  }

  if (validator.isEmpty(data.BirthDate)) {
    errors.BirthDate = "Required BirthDate";
  }

  if (!moment(data.BirthDate, "MM.DD.YYYY", true).isValid()) {
    errors.BirthDate = "Enter Valid Date! e.g. MM.DD.YYYY";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateCustomer;
