const Customer = require("../models//customers.models");
const CalculateInsurance = require("./calculateInsurance.controller");

describe("Calculate Insurance", () => {
  let data;
  beforeEach(() => {
    data = {
      _id: "1",
      Name: "Testiljko",
      LastName: "Testic",
      Email: "testiljko.testic@email.com",
      City: "Zagreb",
      BirthDate: "1995-05-20",
    };
  });

  it("calculates insurance price based on city and birth date", async () => {
    jest.spyOn(Customer, "findOne").mockResolvedValue({
      City: "Zagreb",
      BirthDate: "01.01.2000",
    });
    const req = { params: { id: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await CalculateInsurance.CalculateInsurance(req, res, next);

    expect(Customer.findOne).toHaveBeenCalledWith({ _id: "1" });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(900);
  });

  it("returns an error if something goes wrong", async () => {
    jest
      .spyOn(Customer, "findOne")
      .mockRejectedValue(new Error("Something went wrong"));
    const req = { params: { id: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await CalculateInsurance.CalculateInsurance(req, res, next);

    expect(Customer.findOne).toHaveBeenCalledWith({ _id: "1" });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Something went wrong");
    expect(next).toHaveBeenCalledWith(new Error("Something went wrong"));
  });
});
