import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

export const signInFormSchema = z.object({
  username: z.string().min(6).max(50),
  image: z.string().url().optional(),
  email: z.string().email(),
  role: z.enum(["admin", "driver", "passenger"]),
});

// admin
// driver
// passenger

export const loginFormSchemaUser = z.object({ email: z.string().email() });

