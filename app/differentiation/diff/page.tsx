"use client";

import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import "./diff.css";

type Result = {
  status: {
    statusCode: number;
    statusName: string;
    message: string;
  };
  data: {
    result: number;
    fx: number[];
    exactResult: number;
    errorValue: number;
  };
};

const orderSelected = [
  { value: 1, label: "First" },
  { value: 2, label: "Second" },
  { value: 3, label: "Third" },
  { value: 4, label: "Fourth" },
];

const errorOhSelected = [
  { value: "h", label: "O(h)" },
  { value: "h2", label: "O(h^2)" },
  { value: "h4", label: "O(h^4)" },
];

const directionSelected = [
  { value: "forward", label: "Forward" },
  { value: "backward", label: "Backward" },
  { value: "central", label: "Central" },
];

export default function Diff() {
  const [functionInput, setFunctionInput] = useState("");
  const [x, setX] = useState<number | undefined>();
  const [h, setH] = useState<number | undefined>();
  const [order, setOrder] = useState<number | undefined>();
  const [errorOh, setErrorOh] = useState<string>("");
  const [direction, setDirection] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = async () => {
    const requestBody = {
      functionExpression: functionInput,
      x,
      h,
      order,
      error: errorOh,
      direction,
    };

    try {
      const response = await fetch(
        "http://localhost:5006/api/Differentiation/differentiation",
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

      const data: Result = await response.json();
      setResult(data.data.result);
      console.log(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const clearInputs = () => {
    setFunctionInput("");
    setX(undefined);
    setH(undefined);
    setOrder(undefined);
    setErrorOh("");
    setDirection("");
    setResult(null);
  };

  return (
    <div className="container">
      <h1>Numerical Differentiation</h1>
      <div className="input-group">
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1 } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Enter function (f(x))"
            placeholder="e^x"
            multiline
            variant="standard"
            sx={{ m: 1, width: "50ch" }}
            value={functionInput}
            onChange={(e) => setFunctionInput(e.target.value)}
          />
          <TextField
            select
            label="Select Order"
            value={order ?? ""}
            onChange={(e) => setOrder(Number(e.target.value))}
            sx={{ m: 0.5, width: "15ch" }}
          >
            {orderSelected.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Select Error"
            value={errorOh}
            onChange={(e) => setErrorOh(e.target.value)}
            sx={{ m: 0.5, width: "15ch" }}
          >
            {errorOhSelected.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Select Direction"
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            sx={{ m: 0.5, width: "15ch" }}
          >
            {directionSelected.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <div className="guess-input">
          <TextField
            label="x"
            type="number"
            placeholder="2"
            sx={{ m: 0.5 }}
            value={x ?? ""}
            onChange={(e) => setX(Number(e.target.value))}
          />
          <TextField
            label="h"
            type="number"
            placeholder="0.25"
            sx={{ m: 0.5 }}
            value={h ?? ""}
            onChange={(e) => setH(Number(e.target.value))}
          />
          <Button
            variant="contained"
            color="success"
            sx={{ m: 0.5 }}
            onClick={calculate}
          >
            Calculate
          </Button>
          <Button color="secondary" sx={{ m: 0.5 }} onClick={clearInputs}>
            Clear
          </Button>
        </div>
      </div>

      {result !== null && (
        <Typography variant="h6" sx={{ mt: 2, textAlign: "center" }}>
          Result: {result}
        </Typography>
      )}
    </div>
  );
}

