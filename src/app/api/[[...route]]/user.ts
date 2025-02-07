import { db } from "@/db";
import { users } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

const app = new Hono().get("/", clerkMiddleware(), async (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({ data: null, message: "Usuário não encontrado" });
  }

  const data = await db
    .select()
    .from(users)
    .where(eq(users.id, auth.userId))
    .limit(1);

  return c.json({
    data: data[0] || null,
    message: data[0] ? "Usuário encontrado" : "Usuário não encontrado",
  });
});

export default app;
