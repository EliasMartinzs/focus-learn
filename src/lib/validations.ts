import * as z from "zod";

const statusSchema = z.enum(["ativo", "ausente", "pausado", "concluído"]);

export const createSectionStudySchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Insira um nome",
    })
    .max(32),
  description: z.string().nullable(),
  discipline: z
    .string()
    .min(3, {
      message: "Insira uma disciplina",
    })
    .max(32),
  status: statusSchema.default("ativo"),
});

export type CreateSectionStudySchemaValidation = z.infer<
  typeof createSectionStudySchema
>;

export type StudySection = {
  id: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type StudySectionWithValidation = StudySection &
  CreateSectionStudySchemaValidation;

export const createMetricsForStudySectionSchema = z.object({
  sectionId: z.string(),
  totalHoursGoals: z.string(),
  totalHoursStudied: z.string(),
  estimatedCompletionDate: z.date(),
});

export type CreateMetricsForStudySectionValidation = z.infer<
  typeof createMetricsForStudySectionSchema
>;
