"use server";
import { UserRole } from "@prisma/client";
import { prisma } from "~/lib/db";
import { sameDay } from "~/lib/utils";
import { IUser } from "~/types/user";

const date = new Date();

export async function getsUser() {
  const users = await prisma.user.findMany({
    where: {
      role: UserRole.passenger,
    },
  });

  const todays = users.filter(({ createdAt }) => sameDay(createdAt, date));

  return {
    all: users as IUser[],
    todays : todays as IUser[],
  };
}
