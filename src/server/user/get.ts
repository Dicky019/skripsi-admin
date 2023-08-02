"use server";

import { prisma } from "~/lib/db";

export async function getUser(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}
