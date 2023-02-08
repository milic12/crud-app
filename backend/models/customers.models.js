const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    City: {
      type: String,
      required: true,
    },
    BirthDate: {
      type: String,
      required: true,
    },
    InsurancePrice: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("customers", CustomerSchema);
