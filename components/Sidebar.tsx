"use client";
import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <aside>
      {/* <div className="left-nav">
        <div className="left-menu">
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Accordion Item #1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Item 1 Content</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Accordion Item #2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Item 2 Content</Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div> */}
    </aside>
  );
};

export default Sidebar;

