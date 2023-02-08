const Customers = require("../models/customers.models");
const customerController = require("../controllers/customers.controller");

jest.mock("../models/customers.models");

describe("Customers Controller", () => {
  describe("AddCustomer", () => {
    it("should return an error if the input is not valid", async () => {
      const req = {
        body: {
          Name: "",
          Email: "",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await customerController.AddCustomer(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        BirthDate: "Enter Valid Date! e.g. MM.DD.YYYY",
        City: "Required City",
        Email: "Required Email",
        LastName: "Required LastName",
        Name: "Required Name",
      });
    });

    it("should return an error if the email already exists", async () => {
      Customers.findOne.mockResolvedValue({});
      const req = {
        body: {
          Name: "Testiljko",
          Email: "testiljko@testic.com",
          BirthDate: "01.01.1990",
          City: "Split",
          LastName: "Testic",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await customerController.AddCustomer(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        Email: "User with this email already exists",
      });
    });

    it("should create a new customer if the input is valid", async () => {
      Customers.findOne.mockResolvedValue(null);
      Customers.create.mockResolvedValue();
      const req = {
        body: {
          Name: "Testiljko",
          Email: "testiljko@testic.com",
          BirthDate: "01.01.1990",
          City: "Split",
          LastName: "Testic",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await customerController.AddCustomer(req, res);
      expect(Customers.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Customer added successfully",
      });
    });
  });

  describe("FindAllCustomers", () => {
    it("should return all customers", async () => {
      Customers.find.mockResolvedValue([{ Name: "Testiljko" }]);
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await customerController.FindAllCustomers(req, res);
      expect(Customers.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith([{ Name: "Testiljko" }]);
    });
  });

  const {
    FindSingleCustomer,
    DeleteCustomer,
  } = require("./customers.controller");

  jest.mock("../models/customers.models", () => {
    return {
      findOne: jest.fn().mockReturnValue({ name: "Testiljko" }),
      findOneAndUpdate: jest.fn().mockReturnValue({ name: "Testic" }),
      deleteOne: jest.fn().mockReturnValue({ n: 1 }),
    };
  });

  describe("Find Single Customer Controller", () => {
    it("should return a single customer", async () => {
      const req = {
        params: {
          id: "123",
        },
      };
      const res = {
        status: jest.fn().mockReturnValue({ json: jest.fn() }),
      };

      await FindSingleCustomer(req, res);
      expect(Customers.findOne).toHaveBeenCalledWith({ _id: "123" });
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe("Delete Customer Controller", () => {
    it("should delete a customer", async () => {
      const req = {
        params: {
          id: "123",
        },
      };
      const res = {
        status: jest.fn().mockReturnValue({ json: jest.fn() }),
      };

      await DeleteCustomer(req, res);
      expect(Customers.deleteOne).toHaveBeenCalledWith({ _id: "123" });
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });
});
