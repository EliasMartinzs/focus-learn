"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type StudySection = {
  id: string;
  name: string;
  description: string;
  discipline: string;
  totalHours: number;
};

export const columns: ColumnDef<StudySection>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "discipline",
    header: "Disciplina",
  },
  {
    accessorKey: "totalHours",
    header: "Meta de horas",
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
];
