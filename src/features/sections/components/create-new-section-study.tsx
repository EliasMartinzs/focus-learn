"use client";

import { DrawerDialog } from "@/components/reusable/drawer-dialog";
import { Button } from "@/components/ui/button";
import {
  createSectionStudySchema,
  CreateSectionStudySchemaValidation,
} from "@/lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/reusable/buttons";
import { createSection } from "../api/create-section";
import { useTransition } from "react";
import { useCreateNewSectionStudyState } from "../hooks/use-create-new-section-study-state";
import { PlusCircle } from "lucide-react";

export const CreateNewSectionStudy = () => {
  const form = useForm<CreateSectionStudySchemaValidation>({
    resolver: zodResolver(createSectionStudySchema),
    defaultValues: {
      name: "",
      description: "",
      discipline: "",
      totalHours: 0,
    },
  });

  const { isOpen, setOpen, setClose } = useCreateNewSectionStudyState();
  const { mutate, isSuccess } = createSection();
  const [isPending, startTransition] = useTransition();

  function onSubmit(values: CreateSectionStudySchemaValidation) {
    startTransition(() => {
      mutate(values);
      if (isSuccess) {
        setClose();
        form.reset();
      }
    });
  }

  const isLoading = form.formState.isLoading || isPending;

  return (
    <DrawerDialog
      title="Nova seção de estudo"
      trigger={
        <Button variant="create">
          Nova seção <PlusCircle className="size-5" />
        </Button>
      }
      open={isOpen}
      setOpen={setOpen}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    {...field}
                    placeholder="Banco de dados"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="Matemática e banco de dados"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discipline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Disciplina</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    {...field}
                    placeholder="Matemática"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totalHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta de horas de estudo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="65h"
                    type="number"
                    disabled={isLoading}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton
            size="full"
            variant="create"
            className="p-2"
            title="Salvar"
            isLoading={isLoading}
          />
        </form>
      </Form>
    </DrawerDialog>
  );
};
