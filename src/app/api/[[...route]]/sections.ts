import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createSectionStudySchema } from "@/lib/validations";
import { studySections } from "@/db/schema";
import { db } from "@/db";

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
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      createSectionStudySchema.pick({
        discipline: true,
        description: true,
        name: true,
        totalHours: true,
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
  );

export default app;
