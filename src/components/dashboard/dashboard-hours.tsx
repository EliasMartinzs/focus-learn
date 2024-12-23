import { cn } from "@/lib/utils";
import { Iceland } from "next/font/google";
import React from "react";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

const iceland = Iceland({ subsets: ["latin"], weight: "400" });

export const TIME_FILTERS = [
  { label: "Hoje", queryParam: "today" },
  { label: "Última Semana", queryParam: "last_week" },
  { label: "Último Mês", queryParam: "last_month" },
  { label: "Todos", queryParam: "all" },
] as const;

type Props = {};

export const DashboardHours = (props: Props) => {
  return (
    <div className={cn("rounded-2xl p-5 card-gradient", iceland.className)}>
      <div>
        <h6 className="text-3xl">Minhas horas de estudos</h6>
        <p className="text-muted-foreground">
          Organize e acompanhe seu tempo de estudo para alcançar seus objetivos
          com mais facilidade.
        </p>
      </div>

      <div className="w-full flex items-center gap-x-3 mt-4">
        {TIME_FILTERS.map((filter) => (
          <HoverBorderGradient
            key={filter.queryParam}
            className="p-2 flex flex-1"
          >
            {filter.label}
          </HoverBorderGradient>
        ))}
      </div>

      <h6 className={cn("text-9xl font-medium")}>
        160 <span className="text-4xl text-muted-foreground -ml-8">h</span>
      </h6>
    </div>
  );
};
