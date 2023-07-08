"use client";

import { SessionProvider } from "next-auth/react";
interface ProviderProps {
  children: React.ReactNode;
}

const NextAuthProvider = ({ children }: ProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
