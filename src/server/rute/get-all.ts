"use server";
import { UserRole } from "@prisma/client";
import { prisma } from "~/lib/db";
import { IDriver } from "~/types/driver";

export async function ruteGetAll() {
  const rutes = await prisma.rute.findMany({
    include: {
      locationAwal: true,
      locationAkhir: true,
    },
  });
  const data: IRute[] = rutes.map(({ locationAwal, locationAkhir, ...v }) => ({
    ...v,
    locationAwal: {
      id: locationAwal.id,
      lat: locationAwal.lat,
      long: locationAwal.long,
    },
    locationAkhir: {
      id: locationAkhir.id,
      lat: locationAkhir.lat,
      long: locationAkhir.long,
    },
  }));
  return data;
}

export interface IRute {
  locationAwal: {
    id: string;
    lat: string;
    long: string;
  };
  locationAkhir: {
    id: string;
    lat: string;
    long: string;
  };
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  kode: string;
}
