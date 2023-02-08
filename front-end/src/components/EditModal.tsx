import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import InputGroup from "./InputGroup";
import axios from "axios";
import { Alert } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface EditModalProps {
  open: boolean;
  setOpen: any;
  id: string | undefined;
}

const EditModal = ({ open, setOpen, id }: EditModalProps) => {
  const [form, setForm] = useState<any>({
    Name: "",
    LastName: "",
    Email: "",
    City: "",
    BirthDate: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [message, setMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<string>("");

  const handleClose = () => setOpen(false);

  const onChangeHandler = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    try {
      let res = await axios.put(`/customers/${id}`, form);
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

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {message && (
            <Alert severity={alertType === "success" ? "success" : "error"}>
              {message}
            </Alert>
          )}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleClose}>Close</Button>
          </Box>
          <Box>
            <Box sx={{ textAlign: "center" }}>
              <form onSubmit={handleOnSubmit}>
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

                <Button variant="contained" color="primary" type="submit">
                  Save
                </Button>
              </form>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default EditModal;
