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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/reusable/buttons";

export const CreateNewSectionStudy = () => {
  const form = useForm<CreateSectionStudySchemaValidation>({
    resolver: zodResolver(createSectionStudySchema),
    defaultValues: {
      name: "",
      description: "",
      discipline: "",
      totalHours: "",
    },
  });

  function onSubmit(values: CreateSectionStudySchemaValidation) {
    console.log(values);
  }

  return (
    <>
      <DrawerDialog
        title="Nova seção de estudo"
        trigger={<Button>Open</Button>}
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
                    <Input {...field} placeholder="Banco de dados" />
                  </FormControl>
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
                      placeholder="Matemática e banco de dados"
                    />
                  </FormControl>
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
                    <Input {...field} placeholder="Matemática" />
                  </FormControl>
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
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value.toString());
                      }}
                      placeholder="65h"
                      type="number"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <SubmitButton
              size="full"
              variant="outline"
              className="p-2"
              title="Salvar"
              isLoading={form.formState.isLoading}
            />
          </form>
        </Form>
      </DrawerDialog>
    </>
  );
};
