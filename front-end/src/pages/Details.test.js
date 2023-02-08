import axios from "axios";

jest.mock("axios");

describe("handleDelete test", () => {
  let navigate;
  let id;
  let mockWindowConfirm;

  beforeEach(() => {
    navigate = jest.fn();
    id = "123";
    mockWindowConfirm = jest.fn(() => true);
    global.window.confirm = mockWindowConfirm;
  });

  const handleDelete = jest.fn(async () => {
    if (window.confirm("are you sure to delete this user?")) {
      await axios.delete(`/customers/${id}`);

      navigate("/");
    }
  });

  it("calls window.confirm with the correct message", async () => {
    await handleDelete();
    expect(mockWindowConfirm).toHaveBeenCalledWith(
      "are you sure to delete this user?"
    );
  });

  it("calls axios.delete with the correct url", async () => {
    const response = { data: "test data" };
    axios.delete.mockResolvedValue(response);

    await handleDelete();

    expect(axios.delete).toHaveBeenCalledWith(`/customers/${id}`);
  });

  it("calls navigate with the correct path", async () => {
    await handleDelete();

    expect(navigate).toHaveBeenCalledWith("/");
  });
});

describe("handleCalculateInsurance test", () => {
  let setInsurancePrice;
  const id = "1";
  const res = { data: 123 };
  axios.get.mockResolvedValue(res);

  beforeEach(() => {
    setInsurancePrice = jest.fn();
  });

  it("should call axios and set insurance price", async () => {
    const handleCalculateInsurance = async () => {
      await axios.get(`/customers/insurance/${id}`).then((res) => {
        setInsurancePrice(res.data);
      });
    };

    await handleCalculateInsurance();

    expect(axios.get).toHaveBeenCalledWith(`/customers/insurance/${id}`);
    expect(setInsurancePrice).toHaveBeenCalledWith(res.data);
  });
});
