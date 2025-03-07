import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createSectionStudySchema } from "@/lib/validations";
import { db } from "@/db";
import { and, count, eq, sql } from "drizzle-orm";
import { STATUS_LIST } from "@/constants/status-study-secion";
import { z } from "zod";

import { InferSelectModel } from "drizzle-orm";
import {
  users,
  studySections,
  studyMetrics,
  flashcards,
  subTopics,
  notes,
  userActivityLog,
  Flashcard,
  Note,
  StudyMetrics,
  StudySection,
  SubTopic,
  UserActivityLog,
} from "@/db/schema";

export async function getStudySectionData(userId: string, sectionId: number) {
  const result = await db
    .select({
      section: studySections,
      metrics: studyMetrics,
      topics: subTopics,
      flashcards: flashcards,
    })
    .from(studySections)
    .leftJoin(users, eq(studySections.userId, users.id))
    .leftJoin(studyMetrics, eq(studySections.id, studyMetrics.sectionId))
    .leftJoin(subTopics, eq(studySections.id, subTopics.sectionId))
    .leftJoin(flashcards, eq(studySections.id, flashcards.sectionId))
    .where(
      and(eq(studySections.id, sectionId), eq(studySections.userId, userId))
    );

  return result;
}

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ data: null, message: "Usuário não encontrado" });
    }

    const data = await db.select().from(studySections);

    if (data.length === 0) {
      return c.json({
        data: null,
        message: "Nenhuma seção criada até o momento!",
      });
    }

    return c.json({
      data: data,
      message: null,
    });
  })
  .get("/status-count", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ data: null, message: "Usuário não encontrado" }, 401);
    }

    try {
      const statusCounts = await db
        .select({
          status: studySections.status,
          count: count(studySections.id).as("count"),
        })
        .from(studySections)
        .where(eq(studySections.userId, auth.userId))
        .groupBy(studySections.status);

      const result = STATUS_LIST.reduce((acc, status) => {
        acc[status] = 0;
        return acc;
      }, {} as Record<string, number>);

      statusCounts.forEach(({ status, count }) => {
        result[status] = count;
      });

      return c.json({ data: result, message: null });
    } catch (error) {
      console.error("Erro ao buscar contagem de status:", error);
      return c.json({ data: null, message: "Erro interno do servidor" }, 500);
    }
  })
  .get("/total-hours-by-discipline", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ data: null, message: "Usuário não encontrado" }, 401);
    }
  })
  .get(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string().min(1),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const id = c.req.param("id");

      if (!auth?.userId) {
        return c.json({ data: null, message: "Usuário não encontrado" }, 401);
      }

      const data = await getStudySectionData(auth.userId, Number(id));

      return c.json({ data: data, message: null });
    }
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      createSectionStudySchema.pick({
        discipline: true,
        description: true,
        name: true,
        status: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const validated = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ data: null, message: "Usuário não encontrado" });
      }

      const data = await db.insert(studySections).values({
        userId: auth.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...validated,
      });

      return c.json({ message: null, data: data });
    }
  )
  .post(
    "/create-new-metric",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        estimatedCompletionDate: z.string(),
        sectionId: z.string(),
        totalHoursGoals: z.string().refine(
          (val) => {
            const num = parseFloat(val);
            return !isNaN(num) && num < 1000; // Garante que o valor seja menor que 1000
          },
          {
            message: "totalHoursGoals must be less than 1000",
          }
        ),
        totalHoursStudied: z.string().refine(
          (val) => {
            const num = parseFloat(val);
            return !isNaN(num) && num < 1000; // Garante que o valor seja menor que 1000
          },
          {
            message: "totalHoursStudied must be less than 1000",
          }
        ),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const {
        estimatedCompletionDate,
        sectionId,
        totalHoursGoals,
        totalHoursStudied,
      } = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ data: null, message: "Usuário não encontrado" });
      }

      await db.insert(studyMetrics).values({
        userId: auth.userId,
        averageDailyHours: "0",
        progressPercentage: "0",
        estimatedCompletionDate: new Date(estimatedCompletionDate),
        totalHoursStudied: totalHoursStudied,
        sectionId: sectionId,
        totalHoursGoal: totalHoursGoals,
      });

      return c.json({ message: null, data: null });
    }
  )
  .delete("/:id", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    const id = c.req.param("id");

    if (!auth?.userId) {
      return c.json({ data: null, message: "Usuário não encontrado" });
    }

    if (!id) {
      return c.json({ data: null, message: "Id não encontrado" });
    }

    const data = await db
      .delete(studySections)
      .where(
        and(
          eq(studySections.userId, auth.userId),
          eq(studySections.id, Number(id))
        )
      )
      .returning({
        id: studySections.id,
      });

    return c.json({
      data: data,
      message: null,
    });
  });

export default app;
