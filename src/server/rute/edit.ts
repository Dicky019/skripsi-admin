"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "~/lib/db";
import { IRute, IRuteEdit } from "~/types/rute";

interface EditRuteProps {
  data: IRuteEdit;
  isRevalidatePath?: boolean;
}

export async function editRute({ data }: EditRuteProps) {
  // console.log({ data, "data.locations": data.locations });

  for (const location of data.locations) {
    const { id, ...loc } = location;
    await prisma.location.upsert({
      where: {
        id: id,
      },
      update: loc,
      create: {
        ...loc,
        ruteId: data.id,
      },
    });
  }

  const rute = await prisma.rute.update({
    where: {
      id: data.id,
    },
    data: {
      kode: data.kode,
      name: data.name,
      color: data.color,
    },
    include: {
      locations: true,
    },
  });

  revalidatePath("/routes");

  return rute satisfies IRute;
}
