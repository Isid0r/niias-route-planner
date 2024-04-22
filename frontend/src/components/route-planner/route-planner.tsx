import { Alert, Box, Slider } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { ChartData } from "../../abstractions/chart-data";
import { getChartData } from "../../business-logic/chart-data-converter";
import { useSlider } from "../../hooks/use-slider";
import { RouteChart } from "../route-chart";
import { RoutePlannerSkeleton } from "./route-planner-skeleton";
import { SliderXSx, SliderYSx } from "./styles";
import { RoutePlannerError } from "./route-planner-error";

export function RoutePlanner() {
  const [chartData, setChartData] = useState<ChartData>();
  const [isError, setErrorState] = useState<boolean>(false);

  useEffect(() => {
    const countDefault = 100;
    const countStr = new URLSearchParams(window.location.search).get("count");
    const count = countStr !== null ? parseInt(countStr) : null;

    setTimeout(() => {
      async function prepare() {
        try {
          setChartData(
            await getChartData(!count || count <= 1 ? countDefault : count)
          );
        } catch (error) {
          console.error(error);
          setErrorState(true);
        }
      }

      prepare();
    }, 1000);
  }, []);

  // TODO здесь подумать как покрасивее все это сделать
  const maxWidth = chartData ? chartData.x.slice(-1).pop() ?? 0 : 0;
  const maxHeight = useMemo(
    () => (chartData ? Math.max(...chartData.y) : 0),
    [chartData]
  );

  const [sliderX, onSliderXChange] = useSlider(maxWidth);
  const [sliderY, onSliderYChange] = useSlider(maxHeight);

  return isError ? (
    <RoutePlannerError />
  ) : (
    <Box
      sx={{
        display: "grid",
        padding: "20px",
        boxSizing: "border-box",
        gridTemplateAreas: `"vs c"
                          ". hs"`,
        height: "100%",
        gridTemplateColumns: "50px minmax(0, 1fr)",
        gridTemplateRows: "minmax(0, 1fr) 50px",
      }}
    >
      {chartData ? (
        <>
          <Slider
            sx={SliderYSx}
            orientation="vertical"
            value={sliderY}
            onChange={onSliderYChange}
            valueLabelDisplay="auto"
            min={0}
            max={maxHeight}
            size="small"
          />
          <Box sx={{ gridArea: "c" }}>
            <RouteChart
              chartData={chartData}
              minX={sliderX[0]}
              maxX={sliderX[1]}
              minY={sliderY[0]}
              maxY={sliderY[1]}
            />
          </Box>
          <Slider
            sx={SliderXSx}
            value={sliderX}
            onChange={onSliderXChange}
            valueLabelDisplay="auto"
            min={0}
            max={maxWidth}
            size="small"
          />
        </>
      ) : (
        <RoutePlannerSkeleton />
      )}
    </Box>
  );
}
