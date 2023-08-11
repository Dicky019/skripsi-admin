"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "~/lib/db";
import { IDriverEdit } from "~/types/driver";
import { ILocationCreate } from "~/types/location";

export async function updateStatusDriver(id: string, status: boolean) {
  const driver = await prisma.user.update({
    where: { id },
    data: {
      status: status,
    },
  });

  revalidatePath("/");

  return driver;
}

export async function updateLocationDriver(
  id: string,
  location: ILocationCreate
) {
  const locations = await prisma.location.update({
    where: {
      driverId: id,
    },
    data: location,
  });

  return locations;
}

export async function updateDriver(data: IDriverEdit) {
  const { user, id, ...driver } = data;

  await prisma.user.update({
    where: {
      driverId: id,
    },
    data: user,
  });

  const result = await prisma.driver.update({
    where: { id },
    data: driver,
    include: {
      user: true,
    },
  });

  revalidatePath("/");

  return result;
}
