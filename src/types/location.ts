import { z } from "zod";

export const locationSchema = z.object({
  lat: z.string(),
  long: z.string(),
});

export interface ILocation {
  id: string;
  lat: string;
  long: string;
}
