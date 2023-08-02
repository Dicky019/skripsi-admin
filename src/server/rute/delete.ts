"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "~/lib/db";
import { IRute } from "~/types/rute";

export async function deleteRute(
  id: string,
) {
  const rute = await prisma.rute.delete({
    where: { id },
    include: {
      locationAkhir: true,
      locationAwal: true,
    },
  });

  revalidatePath("/routes");

  return rute satisfies IRute;
}
