import { User } from "@prisma/client";
import { prisma } from "~/lib/db";

export async function driverGetAll() {
  const drivers = await prisma.driver.findMany({
    include: {
      user: true,
    },
  });
  const data = drivers.map(({ isActive, ...v }) => ({
    ...v,
    isActive: isActive ? "done" : "canceled",
  }));

  return data
}
