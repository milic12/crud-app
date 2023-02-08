import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface InputGroupProps {
  label: string;
  type: any;
  name: string;
  onChangeHandler: any;
  errors: any;
  value: any;
}

const InputGroup = ({
  label,
  type,
  name,
  onChangeHandler,
  errors,
  value,
}: InputGroupProps) => {
  return (
    <Box className="mb-3">
      <TextField
        style={{ width: "200px", margin: "5px" }}
        type={type}
        value={value}
        label={label}
        variant="outlined"
        name={name}
        onChange={onChangeHandler}
      />
      {errors && <Typography color="red">{errors}</Typography>}
    </Box>
  );
};

export default InputGroup;
