import { createEnv } from "@t3-oss/env-nuxt";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(1),
    NEXTAUTH_EMAIL_ADMIN: z.string().min(1),
    NEXTAUTH_PASSWORD_ADMIN: z.string().min(1),
  },
  client: {
    // NUXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1),
  },
});
