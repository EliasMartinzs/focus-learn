"use client";

import { DrawerDialog } from "@/components/reusable/drawer-dialog";
import { Button } from "@/components/ui/button";
import {
  createMetricsForStudySectionSchema,
  CreateMetricsForStudySectionValidation,
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
import { CalendarIcon, CircleHelp, PlusCircle } from "lucide-react";
import { TooltipReusable } from "@/components/reusable/tooltip-reusable";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { createMetric } from "../api/create-metric";

type Props = {
  sectionId: string;
};

export const CreateNewStudyMetricsForSection = ({ sectionId }: Props) => {
  const form = useForm<CreateMetricsForStudySectionValidation>({
    resolver: zodResolver(createMetricsForStudySectionSchema),
    defaultValues: {
      sectionId: sectionId,
      estimatedCompletionDate: undefined,
      totalHoursGoals: "",
      totalHoursStudied: "0",
    },
  });

  const { isOpen, setOpen, setClose } = useCreateNewSectionStudyState();
  const { mutate } = createMetric();
  const [isPending, startTransition] = useTransition();

  function onSubmit(values: CreateMetricsForStudySectionValidation) {
    startTransition(() => {
      mutate({
        ...values,
        estimatedCompletionDate: values.estimatedCompletionDate.toISOString(),
      });
      setClose();
      form.reset();
    });
  }

  const isLoading = form.formState.isLoading || isPending;

  return (
    <DrawerDialog
      title="Metas de estudo para esta seção"
      trigger={
        <Button variant="create">
          Crie uma meta agora! <PlusCircle className="size-5" />
        </Button>
      }
      open={isOpen}
      setOpen={setOpen}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="totalHoursGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <div className="w-full flex gap-3">
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder="Meta de horas de estudo para está seção"
                      type="number"
                    />
                    <TooltipReusable
                      trigger={
                        <CircleHelp className="text-muted-foreground hover:text-foreground transition-colors" />
                      }
                      text="Nesta seção, você estabelecerá uma meta de estudo em horas. Organize seu tempo de forma eficiente, dividindo as horas ao longo dos dias ou semanas, para garantir um aprendizado consistente e produtivo. Lembre-se de incluir pausas e revisões para maximizar a retenção do conteúdo. Boa sorte nos estudos!"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="estimatedCompletionDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data estimada para conclusão</FormLabel>
                <FormControl>
                  <div className="w-full flex gap-x-3">
                    <Dialog>
                      <DialogTrigger asChild className="w-full">
                        <Button
                          variant={"outline"}
                          className={cn(
                            "justify-start text-left font-normal h-14",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Escolha uma data</span>
                          )}
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="flex w-auto flex-col space-y-2 p-2">
                        <DialogHeader>
                          <DialogTitle></DialogTitle>
                        </DialogHeader>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(addDays(new Date(), parseInt(value)))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Data pré definida" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="0">Hoje</SelectItem>
                            <SelectItem value="1">Amanhã</SelectItem>
                            <SelectItem value="3">em 3 dias</SelectItem>
                            <SelectItem value="7">Em uma semana</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="rounded-md border">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                    <TooltipReusable
                      trigger={
                        <CircleHelp className="text-muted-foreground hover:text-foreground transition-colors" />
                      }
                      text="Defina uma data estimada para concluir esta seção de estudos. Essa data servirá como um guia motivador, ajudando você a manter o foco e a disciplina. Ao estabelecer um prazo claro, você cria um senso de urgência e propósito, aumentando sua vontade de estudar e alcançar seus objetivos de forma eficiente."
                    />
                  </div>
                </FormControl>
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
