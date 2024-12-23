import prisma from "@/lib/db";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";

const app = new Hono().get("/", clerkMiddleware(), async (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({
      message: "You are not logged in.",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: auth.userId,
    },
  });

  return c.json({
    data: user,
  });
});

export default app;
