import { Box, Button, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SingleCustomerTable from "../components/SingleCustomerTable";
import CircularProgress from "@mui/material/CircularProgress";
import EditModal from "../components/EditModal";
import { Link } from "react-router-dom";

const Details = () => {
  const [customers, setCustomers] = useState<string[]>([]);
  const { id } = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [insurancePrice, setInsurancePrice] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`/customers/${id}`);
        setCustomers(res.data);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getUsers();
  }, [open, id]);

  const handleEdit = (e: any) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleDelete = async () => {
    if (window.confirm("are you sure to delete this user?")) {
      await axios.delete(`/customers/${id}`);
      navigate("/");
    }
  };

  const handleCalculateInsurance = async () => {
    try {
      const res = await axios.get(`/customers/insurance/${id}`);
      setInsurancePrice(res.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4">Customer Details</Typography>
        <Link to="/">Return to Homepage</Link>
      </Box>
      {Object.keys(customers).length === 0 ? (
        <CircularProgress />
      ) : (
        <Grid item xs={6}>
          <Container>
            <Box>
              <SingleCustomerTable
                customers={customers}
                insurancePrice={insurancePrice}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginLeft: "15px" }}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCalculateInsurance}
              >
                Calculate insurance price
              </Button>
            </Box>
            <EditModal open={open} setOpen={setOpen} id={id} />
          </Container>
        </Grid>
      )}
    </>
  );
};

export default Details;
