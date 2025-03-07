"use client";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { deleteSection } from "@/features/sections/api/delete-section";
import { StudySectionWithValidation } from "@/lib/validations";

export const columns: ColumnDef<StudySectionWithValidation>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;

      const { mutate } = deleteSection();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href={`/dashboard/secoes/${id}`}>Ir para a seção</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => mutate({ id: id.toString() })}>
              Deletar essa seção
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
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
    header: "Horas",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: (row) => {
      const value = row.cell.row.getValue("description") as string;
      return <p className="line-clamp-1">{value.slice(0, 20)}...</p>;
    },
  },
];
