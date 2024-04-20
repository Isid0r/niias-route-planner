import { LineChart } from "@mui/x-charts";
import { Box, Slider } from "@mui/material";
import { useState } from "react";
import { PiecewiseColorConfig } from "@mui/x-charts/models/colorMapping";
import { getChartData } from "./business-logic/chart-data-converter";
import {
  generatePoints,
  generateTracks,
} from "./business-logic/test-data-generator";

const points = generatePoints(100);
const tracks = generateTracks(points);

function App() {
  const chartData = getChartData(points, tracks);

  const maxWidth = Math.max(...chartData.x);
  const maxHeight = Math.max(...chartData.y);

  const [sliderX, setSliderX] = useState<number[]>([0, maxWidth]);
  const [sliderY, setSliderY] = useState<number[]>([0, maxHeight]);

  const commonXAxisSettings = (colors: string[]) => {
    return {
      data: chartData.x,
      min: sliderX[0],
      max: sliderX[1],
      colorMap: {
        type: "piecewise",
        thresholds: chartData.x.slice(1),
        colors: colors,
      } as PiecewiseColorConfig,
    };
  };

  // TODO
  const handleChange = (
    newValue: number | number[],
    callback: (newValue: number[]) => void
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    callback(newValue);
  };

  return (
    <Box
      sx={{
        height: 600,
        padding: "50px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "100%",
        }}
      >
        <Slider
          orientation="vertical"
          value={sliderY}
          onChange={(_, newValue) => handleChange(newValue, setSliderY)}
          valueLabelDisplay="auto"
          min={0}
          max={maxHeight}
        />
        <LineChart
          sx={{ height: "600px" }}
          xAxis={[
            {
              data: chartData.x,
              min: sliderX[0],
              max: sliderX[1],
            },
            {
              id: "line",
              ...commonXAxisSettings(chartData.lineColors),
            },
            {
              id: "area",
              ...commonXAxisSettings(chartData.areaColors),
            },
          ]}
          yAxis={[
            {
              min: sliderY[0],
              max: sliderY[1],
            },
          ]}
          tooltip={{
            trigger: "item",
          }}
          axisHighlight={{
            x: "none",
            y: "none",
          }}
          series={[
            {
              // data: chartData.y,
              data: new Array(chartData.y.length).fill(maxHeight), // TODO подумать
              xAxisKey: "area",
              area: true,
              showMark: false,
            },
            {
              data: chartData.y,
              xAxisKey: "line",
              valueFormatter: (element, context) =>
                `${chartData.names[context.dataIndex]} (x: ${
                  chartData.x[context.dataIndex]
                }; y: ${element})`,
            },
          ]}
          // width={1000}
          // height={600}
        />
      </Box>
      <Slider
        value={sliderX}
        onChange={(_, newValue) => handleChange(newValue, setSliderX)}
        valueLabelDisplay="auto"
        min={0}
        max={maxWidth}
        sx={{ mt: 2 }}
      />
    </Box>
  );
}

export default App;
