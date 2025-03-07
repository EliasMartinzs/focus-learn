"use client";
import { getSections } from "@/features/sections/api/get-sections";
import { CreateNewSectionStudy } from "@/features/sections/components/create-new-section-study";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { StatusChart } from "@/features/sections/components/status-chart";
import { HoursByDisciplineChart } from "@/features/sections/components/hours-by-discipline-chart";

export default function Secoes() {
  const { data, isPending } = getSections();

  if (isPending) {
    return <LoadingData />;
  }

  return (
    <main className="w-full max-lg:max-w-[95vw] max-lg:mx-auto lg:py-8 lg:px-24 space-y-8">
      <h1 className="font-medium text-2xl">Meus estudos</h1>

      <div className="flex gap-x-3">
        <CardSection
          content={data === null ? 0 : (data?.length as number)}
          title="Quantidade de seçoes"
          key="quantity"
        />
      </div>

      <div className="lg:flex gap-2 max-sm:space-y-2">
        <StatusChart />
        {/* CORRIGIR AS HORAS POR DISCIPLINE */}
        {/* <HoursByDisciplineChart /> */}
      </div>

      <div className="space-y-4">
        <div className="w-full flex items-center justify-between">
          <h4 className="uppercase text-xl">Minhas seções</h4>

          <CreateNewSectionStudy />
        </div>

        {data?.length ? (
          <DataTable columns={columns} data={data} />
        ) : (
          <div className="space-y-16 w-full h-full">
            <p className="text-center text-muted-foreground text-2xl font-medium mt-20">
              Nenhuma seção criada até o momento crie uma já
            </p>

            <div className="w-full flex items-center justify-center">
              <Image
                src="/no-data.svg"
                className="object-center object-cover"
                width={300}
                height={300}
                alt="no data"
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

type CardsSections = {
  content: number;
  title: string;
};

const CardSection = ({ content, title }: CardsSections) => {
  return (
    <Card className="flex flex-col items-start justify-between shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-6xl font-bold">{content}</CardContent>
    </Card>
  );
};

const LoadingData = () => {
  return (
    <div className="w-full max-lg:max-w-[95vw] max-lg:mx-auto lg:py-8 lg:px-24 space-y-4 mb-36">
      <h1 className="font-medium text-2xl">Meus estudos</h1>

      <div className="flex gap-3">
        <Skeleton className="lg:w-64 h-36 max-lg:flex-1 max-lg:flex" />
        <Skeleton className="lg:w-64 h-36 max-lg:flex-1 max-lg:flex" />
      </div>

      <div>
        <h4 className="text-xl uppercase">Minhas seções</h4>

        <div className="space-y-3">
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
        </div>
      </div>
    </div>
  );
};
