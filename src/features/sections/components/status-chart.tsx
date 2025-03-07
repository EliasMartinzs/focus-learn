"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getStatusCount } from "@/features/sections/api/get-status-count";
import { useMemo } from "react";

const chartConfig = {
  count: {
    label: "Quantidade",
  },
  ativo: {
    label: "Ativo",
    color: "hsl(var(--chart-1))",
  },
  concluído: {
    label: "Concluído",
    color: "hsl(var(--chart-2))",
  },
  pausado: {
    label: "Pausado",
    color: "hsl(var(--chart-3))",
  },
  ausente: {
    label: "Ausente",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export const StatusChart = () => {
  const { data } = getStatusCount();

  const chartData = useMemo(() => {
    if (!data) return [];
    return Object.entries(data).map(([status, count], index) => ({
      status,
      count,
      fill: `hsl(var(--chart-${index + 1}))`,
    }));
  }, [data]);

  const filteredChartData = useMemo(() => {
    return chartData.filter((item) => item.count > 0);
  }, [chartData]);

  const hasNoData = filteredChartData.every((item) => item.count === 0);

  if (!data || hasNoData) {
    return null;
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center text-center pb-0">
        <CardTitle>Status das Seções</CardTitle>
        <CardDescription>
          Distribuição dos status das seções de estudo
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="count" />} />
            <Pie data={filteredChartData} dataKey="count">
              <LabelList
                dataKey="status"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
