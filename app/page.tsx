"use client";

import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  return (
    <div>
      {/* Hero Section */}
      <Box
        sx={{
          mb: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "40vh",
          bgcolor: "",
          p: 4,
          boxShadow: 0.9,
        }}
      >
        <Typography
          variant="h2"
          sx={{ fontWeight: "500", color: "#245478", mb: 2 }}
        >
          Numerical Solver
        </Typography>
        <Box
          component="form"
          onSubmit={handleSearchSubmit}
          sx={{
            width: "100%",
            maxWidth: 500,
          }}
        >
          <TextField
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            variant="outlined"
            fullWidth
            size="small"
            sx={{
              bgcolor: "white",
              borderRadius: 1,
              boxShadow: 1,
            }}
          />
        </Box>
      </Box>

      <Box sx={{ p: 2 }}>
        <Grid container spacing={3} justifyContent="center">
          {[
            {
              title: "Root",
              links: [
                "Graphical",
                "Bisection",
                "False Position",
                "One-Point",
                "Newton-Raphson",
                "Secant",
              ],
            },
            {
              title: "Linear",
              links: [
                "Cramer",
                "Gaussian",
                "Gauss-Jordan",
                "Matrix Inverse",
                "LU Decompose",
                "Cholesky Decompose",
                "Jacobi",
                "Gauss-Seidel",
                "Conjugate",
              ],
            },
            { title: "Interpolation", links: ["Newton", "Lagrange", "Spline"] },
            {
              title: "Extrapolation",
              links: ["Simple Regression", "Multiple Regression"],
            },
            {
              title: "Integration",
              links: [
                "Trapezoidal",
                "Composite Trapezoidal",
                "Simpson",
                "Composite Simpson",
              ],
            },
            { title: "Difference", links: ["Numer Difference"] },
          ].map((section, index) => (
            <Grid item key={index}>
              <Box sx={{ maxWidth: 200 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="#245478"
                  mb={1}
                >
                  {section.title}
                </Typography>
                {section.links.map((link, idx) => (
                  <Button
                    key={idx}
                    variant="outlined"
                    fullWidth
                    sx={{
                      m: 0.5,
                      justifyContent: "left",
                      borderColor: "#245478",
                      color: "#245478",
                      borderRadius: 2,
                      "&:hover": {
                        bgcolor: "#245478",
                        color: "white",
                      },
                    }}
                    href={`./${section.title.toLowerCase()}/${link.replace(/\s+/g, "").toLowerCase()}`}
                  >
                    {link}
                  </Button>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}








