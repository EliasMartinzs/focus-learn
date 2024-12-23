"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const getUser = async () => {
  const a = await auth();
  return prisma.user.findFirst({
    where: {
      id: a.userId!,
    },
  });
};
