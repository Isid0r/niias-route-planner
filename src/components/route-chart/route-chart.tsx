import { LineChart } from "@mui/x-charts";
import { PiecewiseColorConfig } from "@mui/x-charts/models/colorMapping";
import {
  generatePoints,
  generateTracks,
} from "../../business-logic/test-data-generator";
import { ChartData } from "../../abstractions/chart-data";

const points = generatePoints(100);
const tracks = generateTracks(points);

export function RouteChart(props: {
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
          data: new Array(props.chartData.y.length).fill(
            Math.max(...props.chartData.y)
          ),
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
