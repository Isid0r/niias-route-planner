import { useEffect, useState } from "react";

export function useSlider(
  max: number
): [
  number[],
  (event: Event, newValue: number | number[], activeThumb: number) => void
] {
  const [value, setValue] = useState<number[]>([0, max]);
  const minDistance = Math.floor(max / 20);

  useEffect(() => {
    setValue([0, max]);
  }, [max]);

  const onChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], max - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue as number[]);
    }
  };

  return [value, onChange];
}
