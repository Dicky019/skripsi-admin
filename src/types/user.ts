// import { Location, User, UserRole } from "@prisma/client";
import { UserRole } from "@prisma/client";
import { z } from "zod";

export const userCreateSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  status: z.boolean(),
  image: z.string().optional(),
  role: z.enum(["admin", "driver", "passenger"]),
});

export type IUserCreate = z.infer<typeof userCreateSchema>;

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  status: string;
  image?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
