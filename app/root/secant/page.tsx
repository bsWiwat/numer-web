"use client";

import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import "./secant.css";
import Plot from "react-plotly.js";

type Iteration = {
  index: number;
  x: number;
  y: number;
  error: number;
};

type RootResult = {
  status: {
    statusCode: number;
    statusName: string;
    message: string;
  };
  data: {
    result: number;
    iterations: Iteration[];
  };
};

interface Column {
  id: "step" | "x0" | "y" | "error";
  label: string;
  minWidth?: number;
  align?: "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "step", label: "Step", minWidth: 10 },
  { id: "x0", label: "X0", minWidth: 100 },
  {
    id: "y",
    label: "y",
    minWidth: 170,
    align: "left",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "error",
    label: "Error",
    minWidth: 170,
    align: "left",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];

export default function Secant({}: RootResult) {
  const [functionInput, setFunctionInput] = useState("");
  const [lowerBound, setLowerBound] = useState<number>();
  const [upperBound, setUpperBound] = useState<number>();
  const [tolerance, setTolerance] = useState<number>();
  const [maxIterations, setMaxIterations] = useState<number>(1000);
  const [iterations, setIterations] = useState<Iteration[]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const calculateRoot = async () => {
    const requestBody = {
      functionExpression: functionInput,
      lowerBound: lowerBound,
      upperBound: upperBound,
      tolerance: tolerance,
      maxIterations: maxIterations,
    };

    try {
      const response = await fetch(
        "http://localhost:5006/api/rootofequation/secant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: RootResult = await response.json();
      setResult(data.data.result);
      setIterations(data.data.iterations);
      console.log(data.data.iterations);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const clearInputs = () => {
    setFunctionInput("");
    setLowerBound(undefined);
    setUpperBound(undefined);
    setTolerance(undefined);
    setMaxIterations(1000);
    setResult(null);
    setIterations([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="container">
      <h1>Secant Method</h1>
      <div className="input-group">
        <div className="function-input">
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1 } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="fullWidth"
              label="Enter function (fx)"
              placeholder="x^4 - 13"
              multiline
              variant="standard"
              sx={{ m: 1, width: "50ch" }}
              value={functionInput ?? ""}
              onChange={(e) => setFunctionInput(e.target.value)}
            />
            <TextField
              id="outlined-number"
              label="Error"
              placeholder="0.001"
              type="number"
              sx={{ m: 1 }}
              value={tolerance ?? ""}
              onChange={(e) => setTolerance(Number(e.target.value))}
            />
          </Box>
        </div>
        <div className="guess-input">
          <TextField
            id="outlined-number"
            label="Guess 1 (x0)"
            type="number"
            placeholder="0"
            sx={{ m: 0.5 }}
            value={lowerBound ?? ""}
            onChange={(e) => setLowerBound(Number(e.target.value))}
          />
          <TextField
            id="outlined-number"
            label="Guess 2 (x2)"
            type="number"
            placeholder="0"
            sx={{ m: 0.5 }}
            value={upperBound ?? ""}
            onChange={(e) => setUpperBound(Number(e.target.value))}
          />
          <Button
            variant="contained"
            color="success"
            sx={{ m: 0.5 }}
            onClick={calculateRoot}
          >
            Calculate
          </Button>
          <Button color="secondary" sx={{ m: 0.5 }} onClick={clearInputs}>
            Clear
          </Button>
        </div>
      </div>

      {iterations.length > 0 && (
        <div className="plot">
          <Plot
            data={[
              {
                x: iterations.map((iter) => iter.x),
                y: iterations.map((iter) => iter.y),
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "red" },
                line: { color: "blue" },
              },
            ]}
            layout={{
              title: "Secant Method Iterations",
              xaxis: { title: "X values" },
              yaxis: { title: "Y values" },
            }}
            style={{ width: "100%", height: "400px" }}
          />
        </div>
      )}

      {result !== null && <div className="result"> Root is: {result}</div>}

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {iterations
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell>{row.index ?? "n/a"}</TableCell>
                    <TableCell>{row.x}</TableCell>
                    <TableCell>{row.y}</TableCell>
                    <TableCell>{row.error}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[
            10,
            25,
            100,
            iterations.length > 100 ? iterations.length : 1000,
          ]}
          component="div"
          count={iterations.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

