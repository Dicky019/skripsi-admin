import { NextResponse } from "next/server";
import { prisma } from "~/lib/db";
import { getsRute } from "~/server/rute/gets";

export async function GET() {
  const data = await prisma.rute.findMany({
    include: {
      locations: true,
    },
  });

  return NextResponse.json({
    code: "200",
    data,
  });
}
