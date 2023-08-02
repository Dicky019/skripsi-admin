"use server";

import { prisma } from "~/lib/db";

export async function getDriver(id: string) {
  const drivers = await prisma.driver.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  return drivers;
}