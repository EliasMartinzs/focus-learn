import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createSectionStudySchema } from "@/lib/validations";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { db } from "@/db";
import { studySections } from "@/db/schema";

const app = new Hono().post(
  "/",
  zValidator("json", createSectionStudySchema),
  clerkMiddleware(),
  async (c) => {
    const validated = c.req.valid("json");
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ data: null, message: "Usuário não encontrado" });
    }

    const data = await db.insert(studySections).values({
      userId: auth.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...validated,
      totalHours: Number(validated.totalHours),
    });

    return c.json({
      data: data,
      message: "Seção criada com sucesso!",
    });
  }
);

export default app;
