import { Location, User } from "@prisma/client";
import { z } from "zod";
import { userSchema } from "./user";

export const locationSchema = z.object({
  lat: z.string(),
  long: z.string(),
});

export interface ILocation {
  id: string;
  lat: string;
  long: string;
}
