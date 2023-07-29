"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "~/lib/db";

export async function deleteDriver(
  id: string,
  isRevalidatePath: boolean = false
) {
  const drivers = await prisma.driver.delete({
    where: { id },
  });
  
  if (isRevalidatePath) {
    revalidatePath("/");
  }

  return drivers;
}
