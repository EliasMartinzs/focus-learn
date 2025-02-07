import * as z from "zod";

export const createSectionStudySchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Insira um nome",
    })
    .max(32),
  description: z.string().optional(),
  discipline: z
    .string()
    .min(3, {
      message: "Insira uma disciplina",
    })
    .max(32),
  totalHours: z
    .string()
    .min(1, {
      message: "Insira a quantidade de horas a serem estudadas",
    })
    .max(32),
});

export type CreateSectionStudySchemaValidation = z.infer<
  typeof createSectionStudySchema
>;
