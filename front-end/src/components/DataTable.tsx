import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

const DataTable = (customers: any) => {
  return (
    <TableContainer component={Paper} sx={{ margin: "50px 0 50px 0" }}>
      <Table
        sx={{ minWidth: 650, overflow: "visible" }}
        size="medium"
        aria-label="simple table"
      >
        <TableHead sx={{ background: "#d3d3d3" }}>
          <TableRow sx={{ th: { color: "black" } }}>
            <TableCell>Name</TableCell>
            <TableCell align="right">LastName</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">BirthDate</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Details</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {customers?.customers.map((row: any) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Name}
              </TableCell>
              <TableCell align="right">{row.LastName}</TableCell>
              <TableCell align="right">{row.Email}</TableCell>
              <TableCell align="right">{row.BirthDate}</TableCell>
              <TableCell align="right">{row.City}</TableCell>

              <TableCell align="right">
                <Link to={`customer/${row._id}`}>Details </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
