import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface CustomersData {
  customers: any;
  insurancePrice: number | undefined;
}

const SingleCustomerTable = ({ customers, insurancePrice }: CustomersData) => {
  const { Name, LastName, Email, City, BirthDate } = customers;
  return (
    <TableContainer component={Paper} sx={{ margin: "50px 0 50px 0" }}>
      <Table
        sx={{ minWidth: 650, overflow: "visible" }}
        size="medium"
        aria-label="simple table"
      >
        <TableHead sx={{ background: "#d3d3d3" }}>
          <TableRow sx={{ th: { color: "black" } }}>
            <TableCell variant="head">Name</TableCell>
            <TableCell align="right">LastName</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">BirthDate</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Insurance Price</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row" variant="head">
              {Name}
            </TableCell>
            <TableCell align="right">{LastName}</TableCell>
            <TableCell align="right">{Email}</TableCell>
            <TableCell align="right">{BirthDate}</TableCell>
            <TableCell align="right">{City}</TableCell>
            <TableCell align="right">{insurancePrice}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SingleCustomerTable;
