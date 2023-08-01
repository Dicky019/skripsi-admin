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
      locationAwal: {
        create: data.locationAwal,
      },
      locationAkhir: {
        create: data.locationAkhir,
      },
    },
    include: {
      locationAkhir: true,
      locationAwal: true,
    },
  });

  revalidatePath("/routes");

  return rute satisfies IRute;
}
