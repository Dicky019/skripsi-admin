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
      latAwal: data.locationAwal.lat,
      longAwal: data.locationAwal.lat,
      latAkhir: data.locationAkhir.lat,
      longAkhir: data.locationAkhir.lat,
    },
  });

  revalidatePath("/routes");

  return rute satisfies IRute;
}
