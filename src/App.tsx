import { LineChart } from "@mui/x-charts";
import { Point } from "./abstractions/point";
import { Surface } from "./enums/surface";
import { Track } from "./abstractions/track";
import { MaxSpeed } from "./enums/max-speed";

const points: Point[] = [
  { id: 0, name: "Точка 1", height: 120 },
  { id: 1, name: "Точка 2", height: 165 },
  { id: 2, name: "Точка 3", height: 135 },
  { id: 3, name: "Точка 4", height: 190 },
  { id: 4, name: "Точка 5", height: 123 },
];

const tracks: Track[] = [
  {
    firstId: 0,
    secondId: 1,
    distance: 1695,
    surface: Surface.ASPHALT,
    maxSpeed: MaxSpeed.FAST,
  },
  {
    firstId: 1,
    secondId: 2,
    distance: 704,
    surface: Surface.GROUND,
    maxSpeed: MaxSpeed.NORMAL,
  },
  {
    firstId: 2,
    secondId: 3,
    distance: 911,
    surface: Surface.SAND,
    maxSpeed: MaxSpeed.FAST,
  },
  {
    firstId: 3,
    secondId: 4,
    distance: 911,
    surface: Surface.GROUND,
    maxSpeed: MaxSpeed.SLOW,
  },
];

interface ChartData {
  x: number[];
  y: number[];
  lineColors: string[];
  areaColors: string[];
  names: string[];
}

function chooseLineColor(surface: MaxSpeed): string {
  switch (surface) {
    case MaxSpeed.FAST:
      return "rgb(207,172,0)";
    case MaxSpeed.NORMAL:
      return "rgb(54,119,160)";
    case MaxSpeed.SLOW:
      return "rgb(207,0,0)";
  }
}

function chooseAreaColor(surface: Surface): string {
  switch (surface) {
    case Surface.ASPHALT:
      return "rgb(202,202,201)";
    case Surface.GROUND:
      return "rgb(205,247,201)";
    case Surface.SAND:
      return "rgb(246,249,200)";
  }
}

function getChartData(points: Point[], tracks: Track[]): ChartData {
  if (points.length - 1 !== tracks.length) {
    throw Error(); // TODO text
  }

  const chartData: ChartData = {
    x: [],
    y: [],
    lineColors: [],
    areaColors: [],
    names: [],
  };
  let totalDistance = 0;

  for (let i = 0; i < points.length; i++) {
    const notLastIteration = i < points.length - 1;

    if (
      notLastIteration &&
      (tracks[i].firstId !== points[i].id ||
        tracks[i].secondId !== points[i + 1].id)
    ) {
      throw Error(); // TODO text
    }

    chartData.x.push(totalDistance);
    chartData.y.push(points[i].height);
    chartData.names.push(points[i].name);

    if (notLastIteration) {
      chartData.lineColors.push(chooseLineColor(tracks[i].maxSpeed));
      chartData.areaColors.push(chooseAreaColor(tracks[i].surface));
      totalDistance += tracks[i].distance;
    }
  }

  return chartData;
}

function App() {
  const chartData = getChartData(points, tracks);

  return (
    <LineChart
      xAxis={[
        {
          id: "line",
          data: chartData.x,
          scaleType: "point",
          min: 0,
          colorMap: {
            type: "piecewise",
            thresholds: chartData.x.slice(1),
            colors: chartData.lineColors,
          },
        },
        {
          id: "area",
          data: chartData.x,
          scaleType: "point",
          min: 0,
          colorMap: {
            type: "piecewise",
            thresholds: chartData.x.slice(1),
            colors: chartData.areaColors,
          },
        },
      ]}
      yAxis={[
        {
          min: 0,
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
          data: new Array(chartData.y.length).fill(Math.max(...chartData.y)), // TODO подумать
          xAxisKey: "area",
          area: true,
          showMark: false,
        },
        {
          data: chartData.y,
          xAxisKey: "line",
          valueFormatter: (element, context) =>
            `${chartData.names[context.dataIndex]} (${element}м)`,
        },
      ]}
      width={1000}
      height={600}
    />
  );
}

export default App;
