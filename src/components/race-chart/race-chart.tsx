import { LineChart } from "@mui/x-charts";
import { Box, Grid, Slider, SxProps, Theme } from "@mui/material";
import { PiecewiseColorConfig } from "@mui/x-charts/models/colorMapping";
import { useEffect, useMemo, useState } from "react";
import { getChartData } from "../../business-logic/chart-data-converter";
import {
  generatePoints,
  generateTracks,
} from "../../business-logic/test-data-generator";
import { useSlider } from "../../hooks/use-slider";
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
  const [chartData, setChartData] = useState<ChartData>({
    x: [],
    y: [],
    lineColors: [],
    areaColors: [],
    names: [],
  }); // TODO добавить скелетон

  useEffect(() => {
    const countStr = new URLSearchParams(window.location.search).get("count");
    const count = countStr !== null ? parseInt(countStr) : null;

    const points = generatePoints(!count || count < 0 ? 100 : count);
    const tracks = generateTracks(points);

    setChartData(getChartData(points, tracks));
  }, []);

  const maxWidth = chartData.x.slice(-1).pop() ?? 0;
  const maxHeight = Math.max(...chartData.y);

  const [sliderX, onSliderXChange] = useSlider(maxWidth);
  const [sliderY, onSliderYChange] = useSlider(maxHeight);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateAreas: `"vs c"
                          ". hs"`,
        height: "100%",
        gridTemplateColumns: "5% 95%",
        gridTemplateRows: "95% 5%",
      }}
    >
      <Slider
        sx={{
          gridArea: "vs",
          height: "80%",
          alignSelf: "center",
          justifySelf: "center",
        }}
        orientation="vertical"
        value={sliderY}
        onChange={onSliderYChange}
        valueLabelDisplay="auto"
        min={0}
        max={maxHeight}
        size="small"
      />
      <Box sx={{ gridArea: "c" }}>
        <InnerChart
          chartData={chartData} // TODO тут временно заменил значения из скроллов, ибо они не обновляются
          minX={0}
          maxX={maxWidth}
          minY={0}
          maxY={maxHeight}
        />
      </Box>
      <Slider
        sx={{
          gridArea: "hs",
          width: "80%",
          alignSelf: "center",
          justifySelf: "center",
        }}
        disableSwap
        value={sliderX}
        onChange={onSliderXChange}
        valueLabelDisplay="auto"
        min={0}
        max={maxWidth}
        size="small"
      />
    </Box>
  );
}
