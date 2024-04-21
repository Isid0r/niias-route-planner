import { LineChart } from "@mui/x-charts";
import { Box, Grid, Slider, SxProps, Theme } from "@mui/material";
import { PiecewiseColorConfig } from "@mui/x-charts/models/colorMapping";
import { useMemo } from "react";
import { getChartData } from "../../business-logic/chart-data-converter";
import {
  generatePoints,
  generateTracks,
} from "../../business-logic/test-data-generator";
import { useSlider } from "../../hooks/use-slider";
import { slideHorizontalContainerSx, slideVerticalContainerSc } from "./styles";
import { ChartData } from "../../abstractions/chart-data";

const points = generatePoints(100);
const tracks = generateTracks(points);

export function InnerChart(props: {
  chartData: ChartData;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}) {
  const commonXAxisSettings = (colors: string[]) => {
    return {
      data: props.chartData.x,
      min: props.minX,
      max: props.maxX,
      colorMap: {
        type: "piecewise",
        thresholds: props.chartData.x.slice(1),
        colors: colors,
      } as PiecewiseColorConfig,
    };
  };

  return (
    <LineChart
      xAxis={[
        {
          id: "line",
          ...commonXAxisSettings(props.chartData.lineColors),
        },
        {
          id: "area",
          ...commonXAxisSettings(props.chartData.areaColors),
        },
      ]}
      yAxis={[
        {
          min: props.minY,
          max: props.maxY,
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
          data: new Array(props.chartData.y.length).fill(
            Math.max(...props.chartData.y)
          ), // TODO подумать
          xAxisKey: "area",
          area: true,
          showMark: false,
        },
        {
          data: props.chartData.y,
          xAxisKey: "line",
          valueFormatter: (element, context) =>
            `${props.chartData.names[context.dataIndex]} (x: ${
              props.chartData.x[context.dataIndex]
            }; y: ${element})`,
        },
      ]}
    />
  );
}

export function RaceChart() {
  const chartData = useMemo(
    () => getChartData(points, tracks),
    [points, tracks]
  );

  const maxWidth = chartData.x.slice(-1).pop() ?? 0;
  const maxHeight = Math.max(...chartData.y);

  const [sliderX, onSliderXChange] = useSlider(maxWidth);
  const [sliderY, onSliderYChange] = useSlider(maxHeight);

  return (
    <Grid container spacing={0} sx={{ padding: "20px", height: "100%" }}>
      <Grid container item>
        <Grid item xs="auto">
          <Box sx={slideVerticalContainerSc}>
            <Slider
              sx={{
                height: "80%",
              }}
              orientation="vertical"
              value={sliderY}
              onChange={onSliderYChange}
              valueLabelDisplay="auto"
              min={0}
              max={maxHeight}
              size="small"
            />
          </Box>
        </Grid>
        <Grid item xs>
          <InnerChart
            chartData={chartData}
            minX={sliderX[0]}
            maxX={sliderX[1]}
            minY={sliderY[0]}
            maxY={sliderY[1]}
          />
        </Grid>
      </Grid>
      <Grid item xs="auto">
        <Box
          sx={{
            width: "50px",
            height: "50px",
          }}
        />
      </Grid>
      <Grid item xs>
        <Box sx={slideHorizontalContainerSx}>
          <Slider
            sx={{ width: "80%" }}
            disableSwap
            value={sliderX}
            onChange={onSliderXChange}
            valueLabelDisplay="auto"
            min={0}
            max={maxWidth}
            size="small"
          />
        </Box>
      </Grid>
    </Grid>
  );
}
