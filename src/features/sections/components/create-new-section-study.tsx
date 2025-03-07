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
import { CircleHelp, PlusCircle } from "lucide-react";
import { TooltipReusable } from "@/components/reusable/tooltip-reusable";
import { ComboBoxReusable } from "@/components/reusable/combobox-reusable";
import { discipline } from "@/constants/discipline";
import { statusStudySection } from "@/constants/status-study-secion";
import { Textarea } from "@/components/ui/textarea";

export const CreateNewSectionStudy = () => {
  const form = useForm<CreateSectionStudySchemaValidation>({
    resolver: zodResolver(createSectionStudySchema),
    defaultValues: {
      name: "",
      description: "",
      discipline: "",
      status: "ativo",
    },
  });

  const { isOpen, setOpen, setClose } = useCreateNewSectionStudyState();
  const { mutate } = createSection();
  const [isPending, startTransition] = useTransition();

  function onSubmit(values: CreateSectionStudySchemaValidation) {
    startTransition(() => {
      mutate(values);
      setClose();
      form.reset();
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
                  <div className="w-full flex gap-3">
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder="Banco de dados"
                    />
                    <TooltipReusable
                      trigger={
                        <CircleHelp className="text-muted-foreground hover:text-foreground transition-colors" />
                      }
                      text="Esse será o nome da sua seção de estudos"
                    />
                  </div>
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
                  <div className="w-full flex items-start gap-3">
                    <Textarea
                      rows={6}
                      value={field.value as string}
                      onChange={field.onChange}
                      disabled={isLoading}
                      placeholder="Matemática e banco de dados"
                    />
                    <TooltipReusable
                      trigger={
                        <CircleHelp className="text-muted-foreground hover:text-foreground transition-colors" />
                      }
                      text="Aqui uma descrição sobre sua seção de estudos"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex items-center gap-x-2">
            <FormField
              control={form.control}
              name="discipline"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Disciplina</FormLabel>
                  <FormControl>
                    <div className="w-full flex items-start gap-3">
                      <ComboBoxReusable
                        data={discipline}
                        onChange={field.onChange}
                        placeholder="Disciplina"
                      />
                      <TooltipReusable
                        trigger={
                          <CircleHelp className="text-muted-foreground hover:text-foreground transition-colors" />
                        }
                        text="Aqui voçẽ escolhe as discíplina que terá em sua seção"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <div className="w-full flex items-start gap-3">
                      <ComboBoxReusable
                        data={statusStudySection}
                        onChange={field.onChange}
                        placeholder="Ativo"
                      />
                      <TooltipReusable
                        trigger={
                          <CircleHelp className="text-muted-foreground hover:text-foreground transition-colors" />
                        }
                        text="Aqui voçẽ escolhe o status que de inicio em sua seção"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
