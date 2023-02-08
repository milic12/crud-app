import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";
import { Alert, Grid, Typography, useMediaQuery } from "@mui/material";
import InputGroup from "../components/InputGroup";
import axios from "axios";
import DataTable from "../components/DataTable";
import CircularProgress from "@mui/material/CircularProgress";

const Home = () => {
  const [customers, setCustomers] = useState<string[]>([]);
  const [form, setForm] = useState<{ [key: string]: string }>({
    Name: "",
    LastName: "",
    Email: "",
    City: "",
    BirthDate: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [message, setMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<string>("");

  //styles
  const matches = useMediaQuery("(max-width:950px)");
  const dataTableGridStyles = {
    ...(matches && { display: "flex", flexDirection: "column" }),
  };

  const inputGroupmarginStyles = {
    ...(matches && { marginTop: "0px" }),
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  } as const;

  const onChangeHandler = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();

    try {
      let res = await axios.post("/customers", form);

      setForm({ Name: "", LastName: "", Email: "", City: "", BirthDate: "" });
      setErrors({});
      setMessage(res.data.message);
      setAlertType("success");
    } catch (err: any) {
      setMessage(
        "Error occurred while updating customer database  :" +
          JSON.stringify(err.response.data)
      );
      setErrors(err.response.data);
      setAlertType("error");
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("/customers/");

        setCustomers(res.data);
      } catch (err: any) {
        console.log(err.message);
        setMessage(
          "Error occurred while updating customer database  :" +
            JSON.stringify(err.response.data)
        );
      }
    };
    getUsers();
  }, [alertType]);

  return (
    <>
      {message && (
        <Alert severity={alertType === "success" ? "success" : "error"}>
          {message}
        </Alert>
      )}
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Typography variant="h4">CRUD application</Typography>
      </Box>
      {Object.keys(customers).length === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress size={60} sx={{ marginTop: "100px" }} />
        </Box>
      ) : (
        <Grid container sx={{ ...dataTableGridStyles }}>
          <Grid item sm={12} md={9}>
            <Container>
              <Box>
                <DataTable customers={customers} />
              </Box>
            </Container>
          </Grid>

          <Grid
            item
            sm={2}
            md={2}
            mt={6}
            mb={3}
            sx={{
              display: "flex",
              alignSelf: "center",
              ...inputGroupmarginStyles,
            }}
          >
            <Container>
              <Box sx={{ textAlign: "center" }}>
                <form onSubmit={handleOnSubmit} style={styles.container}>
                  <InputGroup
                    label="Name"
                    type="text"
                    name="Name"
                    value={form.Name}
                    onChangeHandler={onChangeHandler}
                    errors={errors?.Name}
                  />

                  <InputGroup
                    label="LastName"
                    type="text"
                    name="LastName"
                    value={form.LastName}
                    onChangeHandler={onChangeHandler}
                    errors={errors?.LastName}
                  />

                  <InputGroup
                    label="Email"
                    type="text"
                    name="Email"
                    value={form.Email}
                    onChangeHandler={onChangeHandler}
                    errors={errors?.Email}
                  />

                  <InputGroup
                    label="City"
                    type="text"
                    name="City"
                    value={form.City}
                    onChangeHandler={onChangeHandler}
                    errors={errors?.City}
                  />

                  <InputGroup
                    label="BirthDate"
                    type="text"
                    name="BirthDate"
                    value={form.BirthDate}
                    onChangeHandler={onChangeHandler}
                    errors={errors?.BirthDate}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ marginTop: "15px" }}
                  >
                    Add new Customer
                  </Button>
                </form>
              </Box>
            </Container>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Home;
