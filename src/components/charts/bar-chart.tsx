"use client";

import { Bar, BarChart, XAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ChartItem {
  label: string;
  values: Record<string, number>;
}

const chartData: ChartItem[] = [
  { label: "January", values: { desktop: 186, mobile: 80 } },
  { label: "February", values: { desktop: 305, mobile: 200 } },
  { label: "March", values: { desktop: 237, mobile: 120 } },
  { label: "April", values: { desktop: 73, mobile: 190 } },
  { label: "May", values: { desktop: 209, mobile: 130 } },
  { label: "June", values: { desktop: 214, mobile: 140 } },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function BarChartComponent() {
  const [settings, setSettings] = useState({
    displayLabel: true,
    chartData,
  });

  function removeChartItem(chartItem: ChartItem) {
    setSettings(() => {
      return {
        ...settings,
        chartData: settings.chartData.filter(
          (item) => chartItem.label !== item.label
        ),
      };
    });
  }

  function updateChartItem(
    event: ChangeEvent<HTMLInputElement>,
    ind: number,
    key: string
  ) {
    const updatedChartItems = settings.chartData.map((item, index) => {
      if (ind === index) return { ...item, [key]: event.target.value || "" };
      return item;
    });
    setSettings({ ...settings, chartData: updatedChartItems });
  }

  function updateChartItemValue(
    event: ChangeEvent<HTMLInputElement>,
    index: number,
    key: string
  ) {
    const updatesChartValues = settings.chartData.map((item, ind) => {
      if (ind === index)
        return {
          ...item,
          values: {
            ...item.values,
            [key]: Math.abs(Number(event.target.value)) || 0,
          },
        };
      return item;
    });
    setSettings({ ...settings, chartData: updatesChartValues });
  }

  function displayLabel(isChecked: boolean) {
    setSettings({ ...settings, displayLabel: isChecked });
  }

  return (
    <div className="flex">
      <div className="w-1/2">
        {settings.chartData.map((chartItem, dataIndex) => (
          <div className="flex" key={dataIndex}>
            <Input
              value={chartItem.label}
              onChange={(e) => updateChartItem(e, dataIndex, "label")}
            />
            {Object.keys(settings.chartData[dataIndex].values).map(
              (label, index) => (
                <div key={index}>
                  {label}:{" "}
                  <Input
                    type="number"
                    value={settings.chartData[dataIndex].values[label]}
                    onChange={(e) => updateChartItemValue(e, dataIndex, label)}
                  />
                </div>
              )
            )}
            <Button onClick={() => removeChartItem(chartItem)}>Remove</Button>
          </div>
        ))}
        <div className="flex items-center space-x-2">
          <Checkbox defaultChecked id="terms" onCheckedChange={displayLabel} />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Label
          </label>
        </div>
      </div>
      
      <ChartContainer config={chartConfig} className="min-h-[200px] w-1/2">
        <BarChart
          accessibilityLayer
          data={settings.chartData.map((item) => {
            return { ...item.values, label: item.label };
          })}
        >
          {settings.displayLabel && (
            <XAxis
              dataKey={"label"}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
          )}
          {Object.keys(settings.chartData[0].values).map((label, index) => (
            <Bar
              key={index}
              dataKey={label}
              fill="var(--color-desktop)"
              radius={4}
            />
          ))}
        </BarChart>
      </ChartContainer>
    </div>
  );
}
