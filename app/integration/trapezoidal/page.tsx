"use client";

import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./trapezoidal.css";

type Result = {
  status: {
    statusCode: number;
    statusName: string;
    message: string;
  };
  data: {
    result: number;
    xEnd: number;
    xStart: number;
  };
};

export default function Trapezoidal() {
  const [functionInput, setFunctionInput] = useState("");
  const [xEnd, setXEnd] = useState<number>();
  const [xStart, setXStart] = useState<number>();
  const [result, setResult] = useState<number | null>(null);

  const calculate = async () => {
    const requestBody = {
      functionExpression: functionInput,
      xEnd: xEnd,
      xStart: xStart,
    };

    try {
      const response = await fetch(
        "http://localhost:5006/api/Integrate/trapezoidal",
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
    setXEnd(undefined);
    setXStart(undefined);
    setResult(null);
  };

  return (
    <div className="container">
      <h1>Trapezoidal Integration</h1>
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
              placeholder="4x^5 - 3x^4 + x^3 - 6x + 2"
              multiline
              variant="standard"
              sx={{ m: 1, width: "50ch" }}
              value={functionInput ?? ""}
              onChange={(e) => setFunctionInput(e.target.value)}
            />
          </Box>
        </div>
        <div className="guess-input">
          <TextField
            id="outlined-number"
            label="Guess a (x start)"
            type="number"
            placeholder="2"
            sx={{ m: 0.5 }}
            value={xStart ?? ""}
            onChange={(e) => setXStart(Number(e.target.value))}
          />
          <TextField
            id="outlined-number"
            label="Guess b (x end)"
            type="number"
            placeholder="8"
            sx={{ m: 0.5 }}
            value={xEnd ?? ""}
            onChange={(e) => setXEnd(Number(e.target.value))}
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
          Result : {result}
        </Typography>
      )}
    </div>
  );
}

































