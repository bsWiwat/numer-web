"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AppBar from "@mui/material/AppBar";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const drawerWidth = 240;

export default function PersistentDrawerRight() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="relative"
        sx={{ backgroundColor: "white", color: "black" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ mr: 2 }}
            style={{ display: open ? "none" : "block" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            Numer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <IconButton onClick={handleDrawerClose}>
          {<ChevronLeftIcon />}
        </IconButton>

        <Box sx={{ p: 2 }}>
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
            <Accordion key={index} sx={{boxShadow: "none",}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography variant="h6" color="#0369a1">
                  {section.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {section.links.map((link, idx) => (
                  <Button
                    key={idx}
                    variant="text"
                    fullWidth
                    sx={{
                      m: 0.5,
                      justifyContent: "left",
                      color: "#0369a1",
                      "&:hover": {
                        bgcolor: "#0369a1",
                        color: "white",
                      },
                    }}
                    href={`./${section.title.toLowerCase()}/${link.replace(/\s+/g, "").toLowerCase()}`}
                  >
                    {link}
                  </Button>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Drawer>
    </Box>
  );
}


