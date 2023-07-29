import { z } from "zod";
import { userSchema } from "./user";
import { ILocation } from "./location";
import { UserRole } from "@prisma/client";

export const driverSchema = z.object({
  id: z.string(),
  user: userSchema,
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
  password: string;
  image?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
