"use client";
import { useState } from "react";
import { Charts } from "./types";
import BarChartComponent from "@/components/charts/bar-chart";
import AreaChart from "@/components/charts/area-chart";
import LineChart from "@/components/charts/line-chart";
import PieChart from "@/components/charts/pie-chart";
import RadarChart from "@/components/charts/radar-chart";
import Tooltip from "@/components/charts/tooltip";
import Navigation from "@/components/navigation";

export default function Home() {
  const [chart, setChart] = useState<Charts>(Charts.DEFAULT);

  const chartComponents = {
    [Charts.DEFAULT]: () => <></>,
    [Charts.AREA]: AreaChart,
    [Charts.BAR]: BarChartComponent,
    [Charts.LINE]: LineChart,
    [Charts.PIE]: PieChart,
    [Charts.RADAR]: RadarChart,
    [Charts.TOOLTIP]: Tooltip,
  };
  const ChartComponent = chartComponents[chart];

  return (
    <>
      <Navigation setChart={setChart}/>
      {ChartComponent && <ChartComponent />}
    </>
  );
}
