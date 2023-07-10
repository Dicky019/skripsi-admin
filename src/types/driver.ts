import { User } from "@prisma/client";

export type IDriver = {
  id: string;
  user: User;
  isActive: string;
  namaLengkap: string;
  alamat: string;
  nik: string;
  nokk: string;
  noHp: string;
  noPlatMobil: string;
  maxPenumpang: number;
  fotoKtp: string;
  fotoMobil: string;
};
