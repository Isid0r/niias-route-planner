import { Skeleton } from "@mui/material";
import { SliderXSx, SliderYSx } from "./styles";

export function RoutePlannerSkeleton() {
  return (
    <>
      <Skeleton variant="rounded" sx={{ ...SliderYSx, width: "5px" }} />
      <Skeleton
        variant="rounded"
        sx={{
          gridArea: "c",
          width: "100%",
          height: "100%",
        }}
      />
      <Skeleton variant="rounded" sx={{ ...SliderXSx, height: "5px" }} />
    </>
  );
}
