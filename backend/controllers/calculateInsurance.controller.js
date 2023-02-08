const Customers = require("../models/customers.models");

const CalculateInsurance = async (req, res, next) => {
  try {
    const data = await Customers.findOne({ _id: req.params.id });
    let amount = 0;

    if (data.City) {
      switch (data.City.toUpperCase()) {
        case "ZAGREB":
          amount = 1000;
          break;
        case "SPLIT":
          amount = 950;
          break;

        case "RIJEKA":
          amount = 900;
          break;

        case "OSIJEK":
          amount = 900;
          break;

        case "ZADAR":
          amount = 800;
          break;

        case "OTHER":
          amount = 700;
          break;

        default:
          break;
      }
    }

    const getAge = () => {
      const today = new Date();
      const birthDate = new Date(data.BirthDate);
      const age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };

    const calculatedAge = getAge();

    let discount = 0;
    switch (true) {
      case calculatedAge >= 0 && calculatedAge <= 20:
        discount = 0.2;
        break;
      case calculatedAge >= 20 && calculatedAge <= 30:
        discount = 0.1;
        break;

      case calculatedAge >= 30 && calculatedAge <= 40:
        discount = 0.05;
        break;

      case calculatedAge >= 40 && calculatedAge <= 60:
        discount = 0.02;
        break;

      case calculatedAge >= 60 && calculatedAge <= 200:
        discount = 0;
        break;
      default:
        break;
    }

    const insurancePrice = amount - amount * discount;

    res.status(201).json(insurancePrice);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
    next(error);
  }
};

module.exports = {
  CalculateInsurance,
};
