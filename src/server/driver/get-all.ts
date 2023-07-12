"use server";
import { UserRole } from "@prisma/client";
import { prisma } from "~/lib/db";
import { IDriver } from "~/types/driver";

export async function driverGetAll() {
  const drivers = await prisma.driver.findMany({
    include: {
      user: true,
    },
  });
  const data: IDriver[] = drivers.map(({ user, ...v }) => ({
    ...v,
    status: user?.status ? "done" : "canceled",
    user: {
      id: user?.id ?? "",
      email: user?.email ?? "",
      name: user?.name ?? "",
      password: user?.password ?? "",
      role: user?.role ?? UserRole.admin,
    },
  }));
  return data;
}
