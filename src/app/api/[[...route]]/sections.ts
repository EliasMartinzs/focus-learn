import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createSectionStudySchema } from "@/lib/validations";
import { getAuth } from "@hono/clerk-auth";
import { db } from "@/db";
import { studySections } from "@/db/schema";

const app = new Hono().post(
  "/",
  zValidator("json", createSectionStudySchema),
  async (c) => {
    const validated = c.req.valid("json");
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ data: null, message: "Usuário não encontrado" });
    }

    await db.insert(studySections).values({
      userId: auth.userId,
      ...validated,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return c.json({
      data: null,
      message: "Seção criada com sucesso!",
    });
  }
);

export default app;
