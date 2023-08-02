import { z } from "zod";
import { ILocation, locationSchema } from "./location";
import { UserRole } from "@prisma/client";

export const userCreateSchema = z.object({
  name: z.string(),
  email: z.string(),
  status: z.boolean(),
  image: z.string().optional(),
});

export const driverCreateSchema = z.object({
  user: userCreateSchema,
  namaLengkap: z.string(),
  alamat: z.string(),
  nik: z.string(),
  nokk: z.string(),
  noHp: z.string(),
  noPlatMobil: z.string(),
  maxPenumpang: z.number(),
  fotoKtp: z.string(),
  fotoMobil: z.string(),
});

export const driverEditSchema = z.object({
  id: z.string(),
  userId: z.string(),
  user: userCreateSchema,
  namaLengkap: z.string(),
  alamat: z.string(),
  nik: z.string(),
  nokk: z.string(),
  noHp: z.string(),
  noPlatMobil: z.string(),
  maxPenumpang: z.number(),
  fotoKtp: z.string(),
  fotoMobil: z.string(),
  locationId: z.string().optional().nullable(),
  location: locationSchema.optional().nullable(),
});

export const driverGetSchema = z.string();

export type IDriverCreate = z.infer<typeof driverCreateSchema>;
export type IDriverEdit = z.infer<typeof driverEditSchema>;

export interface IDriver {
  id: string;
  namaLengkap: string;
  alamat: string;
  nik: string;
  nokk: string;
  noHp: string;
  noPlatMobil: string;
  maxPenumpang: number;
  fotoKtp: string;
  fotoMobil: string;
  location?: ILocation;
  status: string;
  user: IUserDriver;
}

interface IUserDriver {
  id: string;
  name: string;
  email: string;
  // password: string;
  image?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
