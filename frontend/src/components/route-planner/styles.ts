import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

// Не успел изучить, как лучше в mui стили выносить :(
export const SliderXSx = {
  gridArea: "hs",
  width: "80%",
  alignSelf: "center",
  justifySelf: "center",
} as SxProps<Theme>;

export const SliderYSx = {
  gridArea: "vs",
  height: "80%",
  alignSelf: "center",
  justifySelf: "center",
} as SxProps<Theme>;
