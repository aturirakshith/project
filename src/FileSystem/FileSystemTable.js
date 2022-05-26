import getResultObj from "./FolderObject";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import tempData from "../Data";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export default function BasicTable(props) {
  let data2 = [
    {
      size: "1101",
      name: "src/folder1/folder2/20220413-16-28-15/correctcsv.csv",
      dlp_status: "scan-good1",
      created_date: "2022 04 13 16:28:16",
      type: null,
      last_modified: "2022 04 13 16:28:12",
    },
    {
      size: "1102",
      name: "src/folder1/folder2/20220413-16-28-15/correctcsv2.csv",
      dlp_status: "scan-good2",
      created_date: "2022 04 13 16:28:17",
      type: null,
      last_modified: "2022 04 13 16:28:13",
    },
    {
      size: "1103",
      name: "src/folder1/folder2/20220413-16-28-15/correctcsv3.csv",
      dlp_status: "scan-good3",
      created_date: "2022 04 13 16:28:18",
      type: null,
      last_modified: "2022 04 13 16:28:14",
    },
    {
      size: "1104",
      name: "src/folder1/folder2/20220413-16-28-15/correctcsv4.csv",
      dlp_status: "scan-good4",
      created_date: "2022 04 13 16:28:19",
      type: null,
      last_modified: "2022 04 13 16:28:15",
    },
    {
      size: "1105",
      name: "src/folder1/folder3/20220413-16-28-15/correctcsv.csv",
      dlp_status: "scan-good5",
      created_date: "2022 04 13 16:28:15",
      type: null,
      last_modified: "2022 04 13 16:28:16",
    },
    {
      size: "1106",
      name: "src/folder1/folder3/20220413-16-28-15/correctcsv2.csv",
      dlp_status: "scan-good6",
      created_date: "2022 04 13 16:28:16",
      type: null,
      last_modified: "2022 04 13 16:28:17",
    },
    {
      size: "1107",
      name: "src/folder1/20220413-16-28-15/correctcsv.csv",
      dlp_status: "scan-good7",
      created_date: "2022 04 13 16:28:17",
      type: null,
      last_modified: "2022 04 13 16:28:18",
    },
  ];

  const {
    details,
    datasetsList,
    statusClicked,
    uploadedfileType,
    uploadOrDownloadProgress,
  } = props;
  let data;
  if (datasetsList) {
    data = getResultObj(
      datasetsList,
      details,
      uploadedfileType,
      uploadOrDownloadProgress
    );
  } else {
    // will be removing this logic once the API starts sending proper data, for now using hardcoded for demo purposes.
    data = getResultObj(
      data2,
      details,
      uploadedfileType,
      uploadOrDownloadProgress
    );
  }
  const [keys, setKeys] = useState(Object.keys(data));
  const [values, setValues] = useState(Object.values(data));
  const [array, setArray] = useState([]);
  const headerdata = [
    {
      title: "Name",
      width: 20,
    },
    {
      title: "Type",
      width: 15,
    },
    {
      title: "Size",
      width: 15,
    },
    {
      title: "Creation Date",
      width: 20,
    },
    {
      title: "Last Modified",
      width: 20,
    },
    {
      title: "Status",
      width: 20,
    },
  ];

  const linkStyle = {
    border: "none",
    background: "none",
    textDecoration: "underline",
    cursor: "pointer",
    outline: "none",
    "&.hover": { color: "blue" },
  };

  const newObj = (array) => {
    let obj = data;
    for (const item of array) {
      obj = obj[item]["contents"];
    }
    return obj;
  };
  const changeState = (array, keys, values) => {
    setValues(values);
    setKeys(keys);
    setArray(array);
  };
  const handleClick = (value) => {
    const newArray = [...array, value];
    const obj = newObj(newArray);
    changeState(newArray, Object.keys(obj), Object.values(obj));
  };
  const handleBreadClick = (index) => {
    const newArray = array.slice(0, index + 1);
    const obj = newObj(newArray);
    changeState(newArray, Object.keys(obj), Object.values(obj));
  };
  const handleHome = (index) => {
    const newArray = array.slice(0, index);
    const obj = newObj(newArray);
    changeState(newArray, Object.keys(obj), Object.values(obj));
  };
  return (
    <>
      <span>
        <button
          className="breadcrumb-home-button"
          style={
            array.length == 0
              ? { ...linkStyle, textDecoration: "none" }
              : linkStyle
          }
          disabled={0 === array.length}
          onClick={() => handleHome(0)}
        >
          Home
        </button>
        {array.length !== 0 && <span> &gt; </span>}
      </span>

      {array.map((item, index) => {
        return (
          <span key={index}>
            <button
              className="breadcrumb-location-button"
              style={
                index === array.length - 1
                  ? { ...linkStyle, textDecoration: "none" }
                  : linkStyle
              }
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
              {headerdata.map((data, index) => (
                <TableCell key={index} align="right">
                  {data.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {values.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">
                  {row.type == "folder" ? (
                    <button
                      className="breadcrumb-folder-button"
                      style={linkStyle}
                      onClick={() => handleClick(keys[index])}
                    >
                      {keys[index]}
                    </button>
                  ) : (
                    keys[index]
                  )}
                </TableCell>

                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">{row.size}</TableCell>
                <TableCell align="right">{row.created_date}</TableCell>
                <TableCell align="right">{row.last_modified}</TableCell>
                <TableCell align="right">
                  <Button
                    className="status-filesystem"
                    style={{
                      //backgroundColor: row.buttonConfig.className,
                      color: "white",
                      width: "120px",
                    }}
                    onClick={() => statusClicked(row.buttonConfig.stage)}
                    id={`Status-${index}`}
                  ></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
