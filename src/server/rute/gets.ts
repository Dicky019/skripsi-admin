"use server";
import { prisma } from "~/lib/db";
import { sameDay } from "~/lib/utils";

const date = new Date();

export async function getsRute() {
  const rutes = await prisma.rute.findMany({});

  const todays = rutes.filter(({ createdAt }) => sameDay(createdAt, date));

  return {
    all: rutes,
    todays,
  };
}
