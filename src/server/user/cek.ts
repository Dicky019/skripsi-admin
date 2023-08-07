// "use server";
import { prisma } from "~/lib/db";

export async function cekUser(email: string) {
  const findUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return findUser;
}