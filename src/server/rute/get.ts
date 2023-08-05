"use server";

import { prisma } from "~/lib/db";
import { IRute } from "~/types/rute";

export async function getRute(id: string) {
  const rute = await prisma.rute.findUnique({
    where: {
      id,
    },
  });

  return rute as IRute;
}
