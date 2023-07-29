"use server";

import { faker } from "@faker-js/faker";
import { revalidatePath } from "next/cache";
import { prisma } from "~/lib/db";
import { IRuteCreate } from "~/types/rute";

interface CreateRuteProps {
  data?: IRuteCreate;
  isRevalidatePath?: boolean;
}

export async function createRute({
  data,
}: CreateRuteProps) {
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
      locationAwal: {
        create: data.locationAwal,
      },
      locationAkhir: {
        create: data.locationAkhir,
      },
    },
  });

    revalidatePath("/routes");

  return rute;
}

export const fakerRute = async () => {
  const ruteFaker = {
    kode: `KODE ${faker.string.alpha(1)}`,
    name: faker.location.city(),
    color: faker.color.rgb(),
    locationAwal: {
      lat: faker.location.latitude().toString(),
      long: faker.location.longitude().toString(),
    },
    locationAkhir: {
      lat: faker.location.latitude().toString(),
      long: faker.location.longitude().toString(),
    },
  };
  const rute = await prisma.rute.create({
    data: {
      kode: ruteFaker.kode,
      name: ruteFaker.name,
      color: ruteFaker.color,
      locationAwal: {
        create: ruteFaker.locationAwal,
      },
      locationAkhir: {
        create: ruteFaker.locationAkhir,
      },
    },
  });
  return rute;
};
