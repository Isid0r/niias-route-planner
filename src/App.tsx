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
    surface: Surface.ASPHALT,
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
}

function chooseLineColor(surface: MaxSpeed): string {
  switch (surface) {
    case MaxSpeed.FAST:
      return "red";
    case MaxSpeed.NORMAL:
      return "blue";
    case MaxSpeed.SLOW:
      return "orange";
  }
}

function getChartData(points: Point[], tracks: Track[]): ChartData {
  if (points.length - 1 !== tracks.length) {
    throw Error(); // TODO text
  }

  const chartData: ChartData = { x: [], y: [], lineColors: [] };
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

    if (notLastIteration) {
      chartData.lineColors.push(chooseLineColor(tracks[i].maxSpeed));
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
          data: chartData.x,
          scaleType: "point",
          min: 0,
          colorMap: {
            type: "piecewise",
            thresholds: chartData.x.slice(1),
            colors: chartData.lineColors,
          },
        },
      ]}
      yAxis={[
        {
          min: 0,
        },
      ]}
      series={[
        {
          data: chartData.y,
          color: "red",
        },
      ]}
      width={1000}
      height={600}
    />
  );
}

export default App;
