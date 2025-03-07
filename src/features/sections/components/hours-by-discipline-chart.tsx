"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getHoursByDiscipline } from "@/features/sections/api/get-hours-by-discipline";
import { useMemo } from "react";

const chartConfig = {
  hours: {
    label: "Horas",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type ChartData = {
  discipline: string;
  hours: number;
  studySectionName: string;
}[];

export const HoursByDisciplineChart = () => {
  const { data } = getHoursByDiscipline();

  const hasValidData = data?.data && data.data.length > 0;

  const filteredData = useMemo(() => {
    if (!hasValidData) return [];
    return data.data.filter((d) => d.hours !== 0);
  }, [data, hasValidData]);

  if (!hasValidData || filteredData.length === 0) {
    return null;
  }

  return (
    <Card className="lg:w-96">
      <CardHeader className="items-center text-center pb-0">
        <CardTitle>Horas por disciplinas</CardTitle>
        <CardDescription>
          Distribuição de horas estudadas por disciplinas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={filteredData as ChartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="discipline"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={(props) => {
                const { x, y, payload } = props;
                const dataItem = filteredData?.find(
                  (item) => item.discipline === payload.value
                );

                return (
                  <g transform={`translate(${x},${y})`}>
                    <text
                      x={0}
                      y={0}
                      dy={16}
                      textAnchor="middle"
                      fill="#666"
                      className="capitalize"
                    >
                      {payload.value.slice(0, 3)}{" "}
                    </text>
                    <text
                      x={0}
                      y={20}
                      dy={16}
                      textAnchor="middle"
                      fill="#999"
                      fontSize={12}
                    >
                      {dataItem?.studySectionName.slice(0, 5)}
                    </text>
                  </g>
                );
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="hours" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
