import NextAuth from "next-auth";

import { type NextAuthOptions,  } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "~/lib/env";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email" },
        password: { label: "Password" },
      },
      authorize(credentials, _) {
        if (
          credentials?.email === env.NEXTAUTH_EMAIL_ADMIN &&
          credentials?.password === env.NEXTAUTH_PASSWORD_ADMIN
        ) {
          return {
            id: "1",
            email: "admin@example.com",
          };
        }
        return null;
      },
    }),
  ],

  pages: {
    signIn: "/login",
    newUser: "/login",
    error: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
