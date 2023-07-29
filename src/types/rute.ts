import { z } from "zod";
import { locationSchema } from "./location";

export const ruteCreateSchema = z.object({
  name: z.string(),
  kode: z.string(),
  color: z.string(),
  locationAwal: locationSchema,
  locationAkhir: locationSchema,
});

export type IRuteCreate = z.infer<typeof ruteCreateSchema>;

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
}
