import { z } from "zod";

const regLocationLat = /^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})$/;
const regLocationLong = /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$/;

export const locationSchema = z.object({
  lat: z.string().regex(regLocationLat),
  long: z.string().regex(regLocationLong),
  // long: z.string().refine((value) => regLocation.test(value)),
});

export type ILocationCreate = z.infer<typeof locationSchema>;

export interface ILocation {
  id: string;
  lat: string;
  long: string;
}
