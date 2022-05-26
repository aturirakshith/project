import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import tempData from "./Data";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9)
// ];dat

export default function BasicTable(props) {
  console.log(props);
  const [keys, setKeys] = useState(Object.keys(tempData));
  const [values, setValues] = useState(Object.values(tempData));
  const [array, setArray] = useState([]);

  const styles = {
    border: "none",
    outline: "none",
    background: "none",
    textDecoration: "underline",
    curor: "pointer",
  };

  const newObj = (data, array) => {
    let obj = tempData;
    for (const item of array) {
      obj = obj[item]["contents"];
    }
    return obj;
  };
  const handleClick = (value) => {
    const newArray = [...array, value];
    const obj = newObj(keys, newArray);

    setValues(Object.values(obj));
    setKeys(Object.keys(obj));
    setArray(newArray);
  };
  const handleBreadClick = (index) => {
    const newArray = array.slice(0, index + 1);
    const obj = newObj(keys, newArray);
    setValues(Object.values(obj));
    setKeys(Object.keys(obj));
    setArray(newArray);
  };
  const handleHome = (index) => {
    const newArray = array.slice(0, index);

    const obj = newObj(keys, newArray);
    setValues(Object.values(obj));
    setKeys(Object.keys(obj));
    setArray(newArray);
  };
  //   console.log(values);
  //   console.log(keys);
  return (
    <>
      <span>
        <button
          className="breadcrumb-home-button"
          style={styles}
          onClick={() => handleHome(0)}
        >
          Home
        </button>
        <span> &gt; </span>
      </span>
      {array.map((item, index) => {
        return (
          <span key={index}>
            <button
              className="breadcrumb-location-button"
              style={styles}
              disabled={index === array.length - 1}
              onClick={() => handleBreadClick(index)}
            >
              {item}
            </button>
            {index !== array.length - 1 && <span> &gt; </span>}
          </span>
        );
      })}
      <TableContainer component={Paper}>
        <Table sx={{}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{row.type}</TableCell>
                {row.type !== "folder" ? (
                  <TableCell align="right">{keys[index]}</TableCell>
                ) : (
                  <TableCell align="right">
                    <button
                      className="breadcrumb-folder-button"
                      style={styles}
                      onClick={() => handleClick(keys[index])}
                    >
                      {keys[index]}
                    </button>
                  </TableCell>
                )}
                <TableCell align="right">{row.fat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
