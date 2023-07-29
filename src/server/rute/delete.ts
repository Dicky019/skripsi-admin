"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "~/lib/db";

export async function deleteRute(
  id: string,
  isRevalidatePath: boolean = false
) {
  const rutes = await prisma.rute.delete({
    where: { id },
  });
  
  if (isRevalidatePath) {
    revalidatePath("/rute");
  }

  return rutes;
}
