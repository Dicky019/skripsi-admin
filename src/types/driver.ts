import { z } from "zod";
import { IUser, userSchema } from "./user";
import { ILocation } from "./location";

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
  user: IUser;
}
