import { Point } from "../abstractions/point";
import { Track } from "../abstractions/track";
import { delay } from "../helpers/delay-helper";
import { generatePoints, generateTracks } from "./test-data-generator";

// в реальной ситуации здесь не будет count
export async function getPoints(count: number): Promise<Point[]> {
  await delay(1000);
  return generatePoints(count);
}

export async function getTracks(points: Point[]): Promise<Track[]> {
  await delay(1000);
  return generateTracks(points);
}
