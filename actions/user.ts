"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const getUser = async () => {
  const clerkUser = await auth();

  if (!clerkUser.userId) {
    redirect("/sign-in");
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: clerkUser.userId,
      },
    });

    return user;
  } catch (error: any) {
    throw new Error("Usuário não autenticado"!);
  }
};
