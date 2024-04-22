import { ChartData } from "../abstractions/chart-data";
import { MaxSpeed } from "../enums/max-speed";
import { Surface } from "../enums/surface";
import { getPoints, getTrack } from "./api";

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

// в реальной ситуации здесь не будет count
export async function getChartData(count: number): Promise<ChartData> {
  const points = await getPoints(count);
  const chartData: ChartData = {
    x: [],
    y: [],
    lineColors: [],
    areaColors: [],
    names: [],
  };
  let totalDistance = 0;

  for (let i = 0; i < points.length; i++) {
    chartData.x.push(totalDistance);
    chartData.y.push(points[i].height);

    if (i < points.length - 1) {
      const track = await getTrack(points[i].id, points[i + 1].id);
      chartData.names.push(points[i].name);
      chartData.lineColors.push(chooseLineColor(track.maxSpeed));
      chartData.areaColors.push(chooseAreaColor(track.surface));
      totalDistance += track.distance;
    }
  }

  return chartData;
}
