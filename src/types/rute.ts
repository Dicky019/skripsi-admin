import { z } from "zod";
import { locationSchema } from "./location";

const regColor = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

export const ruteCreateSchema = z.object({
  name: z.string(),
  kode: z.string().max(1).transform((v) => v.toUpperCase()),
  color: z.string().regex(regColor),
  locationAwal: locationSchema,
  locationAkhir: locationSchema,
});

export type IRuteCreate = z.infer<typeof ruteCreateSchema>;

export type IRuteEdit = {
  id: string;
} & z.infer<typeof ruteCreateSchema>;

export type IRute = {
  id: string;
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
  createdAt: Date;
  updatedAt: Date;
  name: string;
  kode: string;
  color: string;
};
