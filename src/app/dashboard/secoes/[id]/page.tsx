"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { getSectionById } from "@/features/sections/api/get-section-by-id";
import { CreateNewStudyMetricsForSection } from "@/features/sections/components/create-new-study-metrics-for-section";
import { ProgressBar } from "@/features/sections/components/progress-bar";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { Usable } from "react";

type Props = {
  params: Usable<{ id: string }>;
};

export default function Section({ params }: Props) {
  const { id } = React.use(params);

  const { data, isLoading } = getSectionById(id);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col gap-y-16">
        <Loader2 className="size-7 animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col gap-y-16">
        <h2 className="text-2xl font-extralight">Nenhuma seção encontrada</h2>

        <div className="relative size-72">
          <Image
            fill
            src="/empty.svg"
            alt="no data"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <Button onClick={() => history.back()} variant="link">
          Voltar a seções
        </Button>
      </div>
    );
  }

  const { flashcards, metrics, section, topics } = data;

  return (
    <main className="w-full max-lg:max-w-[95vw] max-lg:mx-auto lg:py-8 lg:px-24 space-y-8">
      <div className="space-y-3">
        <div className="w-full flex items-center justify-between">
          <h2 className="font-medium capitalize text-2xl">{section.name}</h2>

          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">Status</span>
            <span
              className={buttonVariants({
                variant: "create",
                className: "capitalize",
              })}
            >
              {section.status}
            </span>
          </div>
        </div>
        <p className="text-muted-foreground">{section.description}</p>
      </div>

      {metrics?.id ? (
        <ProgressBar
          totalHoursGoal={Number(metrics.totalHoursGoal)}
          totalHoursStudied={Number(metrics.totalHoursStudied)}
          estimatedCompletionDate={metrics.estimatedCompletionDate}
        />
      ) : (
        <div className="flex items-center justify-center flex-col gap-3">
          <p>
            Nenhuma meta definida para esta seção. Crie uma agora e comece a
            acompanhar seu progresso!
          </p>

          <CreateNewStudyMetricsForSection sectionId={id} />
        </div>
      )}
    </main>
  );
}
