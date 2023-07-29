"use server";
import { UserRole } from "@prisma/client";
import { prisma } from "~/lib/db";
import { sameDay } from "~/lib/utils";
import { IUser } from "~/types/user";

const date = new Date();

export async function getUsers() {
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




// export async function ruteGetInformasion() {
//   const rutes = await prisma.rute.findMany({});
//   const todays = rutes.filter(({ createdAt }) => sameDay(createdAt, date));

//   return {
//     all: rutes.length.toString(),
//     today: todays.length.toString(),
//   };
// }
