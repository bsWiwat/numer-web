"use client";

import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import "./gauss-jordan.css";

type Iterations = {
  type: string;
  i: number;
  j: number;
  factor: number;
  matrix: number[][];
  value: number;
  sumIdx: number[];
};

type RootResult = {
  status: {
    statusCode: number;
    statusName: string;
    message: string;
  };
  data: {
    result: number[];
    matrix: number[][];
    iterations: Iterations[];
  };
};

const currencies = [
  { value: 2, label: "2x2" },
  { value: 3, label: "3x3" },
  { value: 4, label: "4x4" },
  { value: 5, label: "5x5" },
];

export default function GaussJordan() {
  const [matrixA, setMatrixA] = useState<number[][]>([[], [], []]);
  const [matrixB, setMatrixB] = useState<number[]>([]);
  const [result, setResult] = useState<number[]>([]);
  const [selectedSize, setSelectedSize] = useState<number>(2);

  const handleInputChange = (row: number, col: number, value: number) => {
    const updatedMatrixA = [...matrixA];
    updatedMatrixA[row][col] = value;
    setMatrixA(updatedMatrixA);
  };

  const handleBInputChange = (index: number, value: number) => {
    const updatedMatrixB = [...matrixB];
    updatedMatrixB[index] = value;
    setMatrixB(updatedMatrixB);
  };

  const calculateRoot = async () => {
    const requestBody = {
      matrixA: matrixA,
      arrayB: matrixB,
    };

    try {
      const response = await fetch("http://localhost:5006/api/linear/gauss-jordan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: RootResult = await response.json();
      setResult(data.data.result);
      console.log("Results:", data.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const clearInputs = () => {
    setMatrixA([[], [], []]);
    setMatrixB([]);
    setResult([]);
  };

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(event.target.value);
    setSelectedSize(newSize);
    setMatrixA(Array.from({ length: newSize }, () => Array(newSize).fill(0)));
    setMatrixB(Array(newSize).fill(0));
  };

  return (
    <div className="container">
      <h1>Gauss-Jordan</h1>
      <div className="matrix-calculation">
        <div className="input-group">
          {Array.from({ length: selectedSize }).map((_, row) => (
            <Box key={row} sx={{ display: "flex", alignItems: "center" }}>
              {Array.from({ length: selectedSize }).map((_, col) => (
                <TextField
                  key={`a${row}${col}`}
                  label={`a${row + 1}${col + 1}`}
                  type="outlined-start-adornment"
                  sx={{ m: 1, width: "6ch" }}
                  placeholder="0"
                  onChange={(e) =>
                    handleInputChange(row, col, Number(e.target.value))
                  }
                />
              ))}
              <TextField
                disabled
                id="outlined-disabled"
                key={`x${row}`}
                defaultValue={`x${row + 1}`}
                sx={{ m: 1, width: "6ch" }}
              />
              <Typography sx={{ mx: 1 }}>=</Typography>
              <TextField
                key={`b${row}`}
                label={`b${row + 1}`}
                placeholder="0"
                type="outlined-start-adornment"
                sx={{ m: 1, width: "6ch" }}
                onChange={(e) =>
                  handleBInputChange(row, Number(e.target.value))
                }
              />
            </Box>
          ))}
        </div>

        <div className="cal">
          <TextField
            id="outlined-select-currency"
            select
            label="Select Size"
            value={selectedSize}
            onChange={handleCurrencyChange}
            sx={{ m: 0.5, width: "13ch" }}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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

      <div>
        <Typography variant="h6">Results:</Typography>
        {result.map((value, index) => (
          <Typography key={index}>{`x${index + 1} = ${value}`}</Typography>
        ))}
      </div>
    </div>
  );
}





