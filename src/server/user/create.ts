"use server";

import { faker } from "@faker-js/faker";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "~/lib/db";
import { IUserCreate } from "~/types/user";

interface CreateRuteProps {
  data?: IUserCreate;
  isRevalidatePath?: boolean;
}

export async function createUser({ data }: CreateRuteProps) {
  if (!data) {
    const user = await fakerUser();
    revalidatePath("/users");
    return user;
  }

  const user = await prisma.user.create({
    data,
  });

  return user;
}

export const fakerUser = async () => {
  const dataFaker: IUserCreate = {
    email: faker.internet.email(),
    name: faker.internet.displayName(),
    password: faker.internet.password(),
    role: "passenger",
    status: faker.datatype.boolean(),
    image: faker.datatype.boolean() ? faker.internet.avatar() : undefined,
  };
  const rute = await prisma.user.create({
    data: dataFaker,
  });
  return rute;
};
