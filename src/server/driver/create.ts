"use server";

import { faker } from "@faker-js/faker";
import { revalidatePath } from "next/cache";
import { prisma } from "~/lib/db";
import { IDriverCreate } from "~/types/driver";

interface CreateDriverProps {
  data?: IDriverCreate;
  isRevalidatePath?: boolean;
}

export async function createDriver({ data }: CreateDriverProps) {
  if (!data) {
    const rute = await fakerDriver();
    revalidatePath("/routes");
    return rute;
  }

  const { user, ...newData } = data;

  const driver = await prisma.driver.create({
    data: {
      ...newData,
      user: {
        create: user,
      },
    },
  });

  revalidatePath("/routes");

  return driver;
}

export const fakerDriver = async () => {
  const dataFaker = {
    email: faker.internet.email(),
    name: faker.internet.displayName(),
    password: faker.internet.password(),
    role: "passenger",
    status: faker.datatype.boolean(),
    image: faker.datatype.boolean() ? faker.internet.avatar() : undefined,
  };

  const { user, ...newData }: IDriverCreate = {
    user: {
      email: dataFaker.email,
      name: dataFaker.name,
      password: dataFaker.password,
      status: dataFaker.status,
      image: dataFaker.image,
      role: "driver",
    },
    alamat: faker.location.streetAddress(),
    fotoKtp: faker.image.avatarGitHub(),
    fotoMobil: faker.image.urlLoremFlickr({ category: "car" }),
    maxPenumpang: faker.number.int({ max: 10 ,min: 8 }),
    namaLengkap: faker.person.fullName(),
    nik: faker.phone.number("################"),
    noHp: faker.phone.number("08##-####-####"),
    nokk: faker.phone.number("################"),
    noPlatMobil: `DD ${faker.number.int({
      min: 1,
      max: 1999,
    })} ${faker.string.alpha(2).toUpperCase()}`,
  };

  const rute = await prisma.driver.create({
    data: {
      ...newData,
      user: {
        create: user,
      },
    },
  });
  return rute;
};
