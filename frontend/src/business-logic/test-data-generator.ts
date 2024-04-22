import { Point } from "../abstractions/point";
import { Track } from "../abstractions/track";
import { MaxSpeed } from "../enums/max-speed";
import { Surface } from "../enums/surface";
import { randomNumber, randomEnumValue } from "../helpers/random-helper";

export function generatePoints(length: number): Point[] {
  return Array.from({ length }, (_, i) => {
    return {
      id: i,
      name: `Точка ${i}`,
      height: randomNumber(10, 1000),
    };
  });
}

export function generateTracks(points: Point[]): Track[] {
  const tracks = new Array<Track>();
  for (let i = 0; i < points.length - 1; i++) {
    tracks.push({
      firstId: points[i].id,
      secondId: points[i + 1].id,
      distance: randomNumber(500, 2000),
      surface: randomEnumValue(Surface),
      maxSpeed: randomEnumValue(MaxSpeed),
    });
  }
  return tracks;
}
