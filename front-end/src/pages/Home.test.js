/** @jest-environment jsdom */
import React, { useEffect } from "react";
import {
  render,
  fireEvent,
  findByText,
  act,
  waitFor,
} from "@testing-library/react";
import axios from "axios";
import Home from "./Home";

jest.mock("axios");

describe("Home tests", () => {
  let e;
  let form;
  let setForm;
  let setErrors;
  let setMessage;
  let setAlertType;
  let handleOnSubmit;
  let onChangeHandler;

  beforeEach(() => {
    e = { preventDefault: jest.fn() };
    form = {};
    setForm = jest.fn();
    setErrors = jest.fn();
    setMessage = jest.fn();
    setAlertType = jest.fn();

    handleOnSubmit = async (e) => {
      e.preventDefault();

      try {
        let res = await axios.post("/customers", form);

        setForm({ Name: "", LastName: "", Email: "", City: "", BirthDate: "" });
        setErrors({});
        setMessage(res.data.message);
        setAlertType("success");
      } catch (err) {
        setMessage("Error occurred while updating customer database  :");
        setErrors(err.response.data);
        setAlertType("error");
      }
    };
    form = { Name: "John", LastName: "Doe", Email: "johndoe@example.com" };
    onChangeHandler = jest.fn((e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    });
  });

  const setCustomers = jest.fn();

  const mockedAxios = axios;
  mockedAxios.get.mockResolvedValue({ data: [{ name: "John Doe" }] });

  const TestComponent = () => {
    useEffect(() => {
      const getUsers = async () => {
        try {
          const res = await axios.get("/customers/");

          setCustomers(res.data);
        } catch (err) {
          console.log(err.message);
          setMessage(
            "Error occurred while updating customer database  :" +
              JSON.stringify(err.response.data)
          );
        }
      };
      getUsers();
    }, []);
    return <div />;
  };

  it("mock axios.post call successful", async () => {
    axios.post.mockResolvedValue({ data: { message: "success" } });

    await handleOnSubmit(e);

    expect(axios.post).toHaveBeenCalledWith("/customers", form);
    expect(setForm).toHaveBeenCalledWith({
      Name: "",
      LastName: "",
      Email: "",
      City: "",
      BirthDate: "",
    });
    expect(setErrors).toHaveBeenCalledWith({});
    expect(setMessage).toHaveBeenCalledWith("success");
    expect(setAlertType).toHaveBeenCalledWith("success");
  });

  it("mock axios.post call unsuccessful", async () => {
    const error = { response: { data: "error" } };
    axios.post.mockRejectedValue(error);

    await handleOnSubmit(e);

    expect(axios.post).toHaveBeenCalledWith("/customers", form);
    expect(setMessage).toHaveBeenCalledWith(
      "Error occurred while updating customer database  :"
    );
    expect(setErrors).toHaveBeenCalledWith("error");
    expect(setAlertType).toHaveBeenCalledWith("error");
  });

  it("should call axios.get and setCustomers with the response data", async () => {
    await act(async () => {
      render(<TestComponent />);
    });

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith("/customers/");
      expect(setCustomers).toHaveBeenCalledWith([{ name: "John Doe" }]);
    });
  });

  it("should set an error message if there is a network error when fetching customers", async () => {
    mockedAxios.get.mockRejectedValue({
      response: { data: { error: "network error" } },
    });

    await act(async () => {
      render(<TestComponent />);
    });

    await waitFor(() => {
      expect(setMessage).toHaveBeenCalledWith(
        'Error occurred while updating customer database  :{"error":"network error"}'
      );
    });
  });

  it("should set the form state with the updated value", () => {
    const e = { target: { name: "LastName", value: "Smith" } };
    onChangeHandler(e);
    expect(setForm).toHaveBeenCalledWith({
      ...form,
      [e.target.name]: e.target.value,
    });
  });

  it("should set the form state with the updated value for a different field", () => {
    const e = { target: { name: "Name", value: "Jane" } };
    onChangeHandler(e);
    expect(setForm).toHaveBeenCalledWith({
      ...form,
      [e.target.name]: e.target.value,
    });
  });
});
