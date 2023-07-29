// import { Location, User, UserRole } from "@prisma/client";
import { UserRole,Driver } from "@prisma/client";
import { z } from "zod";
import { IDriver } from "./driver";

export const userSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  status: z.boolean(),
  image: z.string().optional(),
  role: z.enum(["admin", "driver", "passenger"]),
});

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  status: boolean;
  image?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
