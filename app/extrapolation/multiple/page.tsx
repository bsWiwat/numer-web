"use client";

import { Box, Button, TextField, Typography, Stack, MenuItem } from "@mui/material";
import React, { useState } from "react";
import "./multiple.css";

type PointXY = {
  x: number[];
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

const maxK = 5;

export default function MultipleExtrapolation() {
  const [numX, setNumX] = useState<number>(1); // Initial K value
  const [arrayX, setArrayX] = useState<number[]>(Array(numX).fill(0)); // `arrayX` based on `K`
  const [points, setPoints] = useState<PointXY[]>([
    { x: Array(numX).fill(1), y: null },
    { x: Array(numX).fill(0), y: null },
  ]);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

   const calculateExtrapolation = async () => {
     const requestBody = {
       arrayX: arrayX,
       points: points,
     };

     try {
       const response = await fetch(
         "http://localhost:5006/api/Extrapolation/multipleRegression",
         {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify(requestBody),
         }
       );

       if (!response.ok) {
         throw new Error("Server response was not OK");
       }

       const data: Result = await response.json();
       setResult(data.data.result);
     } catch (error) {
       console.error("Error fetching data:", error);
       setError("An error occurred while calculating. Please try again.");
     }
   };

  const clearInputs = () => {
    setNumX(1);
    setArrayX(Array(numX).fill(0));
    setPoints([
      { x: Array(numX).fill(0), y: null },
      { x: Array(numX).fill(0), y: null },
    ]);
    setResult(null);
  };

  const handleNumXChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newK = Number(event.target.value);
    setNumX(newK);
    setArrayX(Array(newK).fill(0));
    setPoints(points.map((point) => ({ x: Array(newK).fill(0), y: point.y })));
  };

  const handleArrayXChange = (index: number, value: number) => {
    const updatedArrayX = [...arrayX];
    updatedArrayX[index] = value;
    setArrayX(updatedArrayX);
  };

  const handlePointChange = (
    pointIndex: number,
    xIndex: number,
    value: number
  ) => {
    const updatedPoints = [...points];
    updatedPoints[pointIndex].x[xIndex] = value;
    setPoints(updatedPoints);
  };

  const handleYChange = (index: number, value: number) => {
    const updatedPoints = [...points];
    updatedPoints[index].y = value;
    setPoints(updatedPoints);
  };

  const addPoint = () => {
    setPoints([...points, { x: Array(numX).fill(0), y: null }]);
  };

  const removePoint = () => {
    if (points.length > 1) {
      setPoints(points.slice(0, -1));
    }
  };

  return (
    <div className="container">
      <Typography variant="h4" align="center" gutterBottom>
        Multiple Regression
      </Typography>
      <Box
        className="input-group"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box sx={{ m: 0.5, mb: 5, display: "flex", gap: 1 }}>
          <TextField
            select
            label="K (Number of x)"
            value={numX}
            onChange={handleNumXChange}
            sx={{ m: 0.5 , width: 100 }}
          >
            {Array.from({ length: maxK }, (_, i) => i + 1).map((k) => (
              <MenuItem key={k} value={k}>
                {k}
              </MenuItem>
            ))}
          </TextField>

          {arrayX.map((_, i) => (
            <TextField
              key={`arrayX-${i}`}
              label={`X${i + 1}`}
              type="number"
              sx={{ m: 0.5, width: 80 }}
              onChange={(e) => handleArrayXChange(i, Number(e.target.value))}
            />
          ))}
          
        </Box>

        {points.map((point, pointIndex) => (
          <Box
            key={`point-${pointIndex}`}
            sx={{ m: 0.5, display: "flex", gap: 1 }}
          >
            {point.x.map((xVal, xIndex) => (
              <TextField
                key={`point-${pointIndex}-x${xIndex}`}
                label={`x${pointIndex + 1}${xIndex + 1}`}
                type="number"
                placeholder="0"
                sx={{ m: 0.5 }}
                onChange={(e) =>
                  handlePointChange(pointIndex, xIndex, Number(e.target.value))
                }
              />
            ))}
            <TextField
              label={`y${pointIndex + 1}`}
              type="number"
              sx={{ m: 0.5 }}
              placeholder="0"
              onChange={(e) =>
                handleYChange(pointIndex, Number(e.target.value))
              }
            />
          </Box>
        ))}
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Button
            variant="contained"
            color="inherit"
            onClick={removePoint}
            disabled={points.length <= 2}
          >
            -
          </Button>
          <Button variant="contained" color="inherit" onClick={addPoint}>
            +
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={calculateExtrapolation}
          >
            Calculate
          </Button>
          <Button color="secondary" onClick={clearInputs}>
            Clear
          </Button>
        </Stack>
      </Box>

      {result !== null && (
        <Typography variant="h6" sx={{ mt: 2, textAlign: "center" }}>
          Regression Result: {result}
        </Typography>
      )}

      {error && (
        <Typography
          color="error"
          variant="body2"
          sx={{ mt: 2, textAlign: "center" }}
        >
          {error}
        </Typography>
      )}
    </div>
  );
}















