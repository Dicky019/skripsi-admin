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
    await prisma.location.upsert({
      where: {
        id: location.id,
      },
      update: {
        lat: location.lat,
        long: location.long,
      },
      create: {
        lat: location.lat,
        long: location.long,
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
      // locations : {
      //   updateMany : {
      //     where : {
      //       ruteId: data.id,
      //     },
      //     data : data.locations
      //   }
      // }
    },
    include: {
      locations: true,
    },
  });

  revalidatePath("/routes");

  return rute satisfies IRute;
}
