const express = require("express");
const {
  AddCustomer,
  FindAllCustomers,
  FindSingleCustomer,
  UpdateCustomer,
  DeleteCustomer,
} = require("../controllers/customers.controller");
const {
  CalculateInsurance,
} = require("../controllers/calculateInsurance.controller");
const router = express.Router();

// add customer
router.post("/customers", AddCustomer);

// get all customers
router.get("/customers", FindAllCustomers);

// get specific customer
router.get("/customers/:id", FindSingleCustomer);

// get specific customer
router.put("/customers/:id", UpdateCustomer);

// delete specific customer
router.delete("/customers/:id", DeleteCustomer);

// calculate insurance for customer
router.get("/customers/insurance/:id", CalculateInsurance);

module.exports = router;
