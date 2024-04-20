import { ChartData } from "../abstractions/chart-data";
import { Point } from "../abstractions/point";
import { Track } from "../abstractions/track";
import { MaxSpeed } from "../enums/max-speed";
import { Surface } from "../enums/surface";

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

export function getChartData(points: Point[], tracks: Track[]): ChartData {
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
