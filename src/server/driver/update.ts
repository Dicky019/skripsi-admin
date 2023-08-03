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
  const driver = await prisma.driver.findUnique({
    where: {
      id,
    },
    select: {
      locationId: true,
    },
  });

  if (driver && driver.locationId) {
    const locations = await prisma.location.update({
      where: {
        id: driver.locationId,
      },
      data: {
        ...location,
      },
      select: {
        lat: true,
        long: true,
      },
    });
    return locations;
  }

  const locations = await prisma.location.create({
    data: {
      ...location,
      Driver: {
        connect: {
          id,
        },
      },
    },
    select: {
      lat: true,
      long: true,
    },
  });

  return locations;
}

export async function cekUserDriver(email: string) {
  const findUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return findUser;
}

export async function updateDriver(data: IDriverEdit) {
  const { user, id, ...driver } = data;

  await prisma.user.update({
    where: {
      driverId: id,
    },
    data: user,
  });

  const resutl = await prisma.driver.update({
    where: { id },
    data: driver,
    include: {
      location: true,
      user: true,
    },
  });

  revalidatePath("/");

  return resutl;
}
