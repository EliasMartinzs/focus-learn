"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

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
  ChartTooltipContent,
} from "@/components/ui/chart";

// Dados das seções de estudo
const studySectionsData = [
  { section: "Matemática", subTopicsCount: 3 },
  { section: "História", subTopicsCount: 2 },
  { section: "Programação", subTopicsCount: 3 },
  { section: "Física", subTopicsCount: 4 },
  { section: "Química", subTopicsCount: 2 },
];

const chartConfig = {
  subTopics: {
    label: "Quantidade de Subtópicos",
    color: "hsl(var(--chart-1))", // Cor para as barras
  },
};

export function DashboardProgress() {
  return (
    <Card className="card-gradient-100">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Progresso do Dashboard</CardTitle>
          <CardDescription>
            Mostrando a quantidade de subtópicos por seção de estudo.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            data={studySectionsData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="section" // Exibe os nomes das seções
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <YAxis />
            <Tooltip
              content={<ChartTooltipContent nameKey="subTopicsCount" />}
            />
            <Bar
              dataKey="subTopicsCount" // Usando o nome da chave correta
              fill="var(--color-subTopics)" // Usando a cor configurada
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
