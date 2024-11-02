"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import "./newton.css";

type PointXY = {
  x: number | null;
  y: number | null;
};

type Result = {
  status: {
    statusCode: number;
    statusName: string;
    message: string;
  };
  data: {
    result: number;
    fac: number[];
  };
};

export default function NewtonInterpolation() {
  const [xValue, setXValue] = useState<number | null>(null);
  const [points, setPoints] = useState<PointXY[]>([
    { x: null, y: null },
    { x: null, y: null },
  ]);
  const [result, setResult] = useState<number | null>(null);

  const calculateInterpolation = async () => {
    const requestBody = {
      xValue: xValue,
      points: points,
    };

    try {
      const response = await fetch(
        "http://localhost:5006/api/Interpolation/newton",
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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const clearInputs = () => {
    setXValue(null);
    setPoints([
      { x: null, y: null },
      { x: null, y: null },
    ]);
    setResult(null);
  };

  const handleXValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setXValue(Number(e.target.value));
  };

  const handlePointChange = (index: number, key: "x" | "y", value: number) => {
    const updatedPoints = [...points];
    updatedPoints[index][key] = value;
    setPoints(updatedPoints);
  };

  const addPoint = () => {
    setPoints([...points, { x: null, y: null }]);
  };

  const removePoint = () => {
    if (points.length > 1) {
      setPoints(points.slice(0, -1));
    }
  };

  return (
    <div className="container">
      <h1>Newton Interpolation</h1>
      <div className="input-group">
        <TextField
          label="X value"
          type="number"
          sx={{ m: 0.5, width: 410 }}
          value={xValue ?? ""}
          onChange={handleXValueChange}
        />
        {points.map((point, index) => (
          <Box key={index} sx={{ m: 0.5, display: "flex", gap: 1 }}>
            <TextField
              label={`x${index + 1}`}
              type="number"
              sx={{ m: 0.5 }}
              onChange={(e) =>
                handlePointChange(index, "x", Number(e.target.value))
              }
            />
            <TextField
              label={`y${index + 1}`}
              type="number"
              sx={{ m: 0.5 }}
              placeholder="0"
              onChange={(e) =>
                handlePointChange(index, "y", Number(e.target.value))
              }
            />
          </Box>
        ))}
        <div className="button-group">
          <Button
            variant="contained"
            color="inherit"
            sx={{ m: 0.5, width: 6 }}
            onClick={removePoint}
          >
            -
          </Button>
          <Button
            variant="contained"
            color="inherit"
            sx={{ m: 0.5, mr: 3, width: 6 }}
            onClick={addPoint}
          >
            +
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{ m: 0.5 }}
            onClick={calculateInterpolation}
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
          Interpolated Result: {result}
        </Typography>
      )}
    </div>
  );
}













