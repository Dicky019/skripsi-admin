"use server";

import { faker } from "@faker-js/faker";
import { revalidatePath } from "next/cache";
import { prisma } from "~/lib/db";
import { IRute, IRuteCreate, IRuteEdit } from "~/types/rute";

interface EditRuteProps {
  data: IRuteEdit;
  isRevalidatePath?: boolean;
}

export async function editRute({ data }: EditRuteProps) {
  const rute = await prisma.rute.update({
    where: {
      id: data.id,
    },
    data: {
      kode: data.kode,
      name: data.name,
      color: data.color,
      locations: {
        updateMany: {
          where: {
            ruteId: data.id,
          },
          data: data.locations,
        },
      },
    },
    include: {
      locations: true,
    },
  });

  revalidatePath("/routes");

  return rute satisfies IRute;
}
