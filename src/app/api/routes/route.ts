import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { prisma } from "~/lib/db";

export async function GET() {
  revalidatePath("/api/routes")
  const data = await prisma.rute.findMany({
    include: {
      locations: true,
    },
  });

  return NextResponse.json(
    {
      code: "200",
      data,
    },
    {
      status: 200,

    }
  );

}
