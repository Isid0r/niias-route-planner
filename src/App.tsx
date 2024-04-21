import { LineChart } from "@mui/x-charts";
import { Box, Grid, Slider, SxProps, Theme } from "@mui/material";
import { PiecewiseColorConfig } from "@mui/x-charts/models/colorMapping";
import { getChartData } from "./business-logic/chart-data-converter";
import {
  generatePoints,
  generateTracks,
} from "./business-logic/test-data-generator";
import { useSlider } from "./hooks/use-slider";
import { useMemo } from "react";
import { RaceChart } from "./components/race-chart";

const points = generatePoints(100);
const tracks = generateTracks(points);

const slideHorizontalContainer = {
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
} as SxProps<Theme>;

function App() {
  return <RaceChart />;
}

export default App;
