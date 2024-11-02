// components/PlotlyChart.tsx
"use client"; // Add this line at the top

import React from "react";
import Plot from "react-plotly.js";

type PlotlyChartProps = {
  data: any[];
  layout: Partial<Plotly.Layout>;
};

const PlotlyChart: React.FC<PlotlyChartProps> = ({ data, layout }) => {
  return <Plot data={data} layout={layout} />;
};

export default PlotlyChart;

