const Customers = require("../models/customers.models");
const validateCustomer = require("../validation/Customers.validation");

const AddCustomer = async (req, res) => {
  const { errors, isValid } = validateCustomer(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      await Customers.findOne({ Email: req.body.Email }).then(
        async (exists) => {
          if (exists) {
            errors.Email = "User with this email already exists";
            res.status(404).json(errors);
          } else {
            await Customers.create(req.body);
            res.status(201).json({ message: "Customer added successfully" });
          }
        }
      );
    }
  } catch (error) {
    console.log(error.message);
  }
};

const FindAllCustomers = async (req, res) => {
  try {
    const data = await Customers.find();
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

const FindSingleCustomer = async (req, res) => {
  try {
    const data = await Customers.findOne({ _id: req.params.id });
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

const UpdateCustomer = async (req, res) => {
  const { errors, isValid } = validateCustomer(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      const data = await Customers.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(201).json({ message: "Customer updated successfully" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const DeleteCustomer = async (req, res) => {
  try {
    await Customers.deleteOne({ _id: req.params.id });
    res.status(201).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  AddCustomer,
  FindAllCustomers,
  FindSingleCustomer,
  UpdateCustomer,
  DeleteCustomer,
};
