import { NextResponse } from "next/server";
import { prisma } from "~/lib/db";

export async function GET() {
  const data = await prisma.rute.findMany({
    select: {
      color: true,
      kode: true,
      name: true,
      locationAwal: {
        select: {
          lat: true,
          long: true,
        },
      },
      locationAkhir: {
        select: {
          lat: true,
          long: true,
        },
      },
    },
  });

  return NextResponse.json({
    code: "200",
    data,
  });
}
