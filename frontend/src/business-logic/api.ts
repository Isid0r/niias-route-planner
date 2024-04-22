import { Point } from "../abstractions/point";
import { Track } from "../abstractions/track";
import { delay } from "../helpers/delay-helper";
import { generatePoints, generateTrack } from "./test-data-generator";

// в реальной ситуации здесь не будет count
export async function getPoints(count: number): Promise<Point[]> {
  await delay(500);
  return generatePoints(count);
}

export async function getTrack(
  firstId: number,
  secondId: number
): Promise<Track> {
  await delay(2);
  return generateTrack(firstId, secondId);
}
