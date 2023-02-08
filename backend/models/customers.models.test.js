const mongoose = require("mongoose");
const Customer = require("./customers.models");

describe("Customer Schema", () => {
  it("should have required fields", () => {
    expect(Customer.schema.path("Name").isRequired).toBeTruthy();
    expect(Customer.schema.path("LastName").isRequired).toBeTruthy();
    expect(Customer.schema.path("Email").isRequired).toBeTruthy();
    expect(Customer.schema.path("City").isRequired).toBeTruthy();
    expect(Customer.schema.path("BirthDate").isRequired).toBeTruthy();
  });

  it("should have proper data types", () => {
    expect(Customer.schema.path("Name").instance).toBe("String");
    expect(Customer.schema.path("LastName").instance).toBe("String");
    expect(Customer.schema.path("Email").instance).toBe("String");
    expect(Customer.schema.path("City").instance).toBe("String");
    expect(Customer.schema.path("BirthDate").instance).toBe("String");
    expect(Customer.schema.path("InsurancePrice").instance).toBe("Number");
  });
});
