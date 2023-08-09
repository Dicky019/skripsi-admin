"use server";

import { faker } from "@faker-js/faker";
import { revalidatePath } from "next/cache";
import { prisma } from "~/lib/db";
import { IRute, IRuteCreate } from "~/types/rute";

export async function createRute(data?: IRuteCreate) {
  if (!data) {
    const rute = await fakerRute();
    revalidatePath("/routes");
    return rute;
  }

  const rute = await prisma.rute.create({
    data: {
      kode: data.kode,
      name: data.name,
      color: data.color,
      locations: {
        createMany: {
          data: data.locations,
          skipDuplicates: true,
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

export const fakerRute = async () => {
  
  const ruteFaker = {
    kode: `KODE ${faker.string.alpha(1)}`,
    name: faker.location.city(),
    color: faker.color.rgb(),
    locations: Array.from({ length: 100 }, () => ({
      lat: faker.location.latitude().toString(),
      long: faker.location.longitude().toString(),
    })),
  };

  const rute = await prisma.rute.create({
    data: {
      kode: ruteFaker.kode,
      name: ruteFaker.name,
      color: ruteFaker.color,
      locations: {
        createMany: {
          data: ruteFaker.locations,
          skipDuplicates: true,
        },
      },
    },
    include: {
      locations: true,
    },
  });

  return rute;
};
