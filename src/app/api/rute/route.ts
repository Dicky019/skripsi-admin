import { NextResponse } from "next/server";
import { prisma } from "~/lib/db";

export async function GET() {
  const data = await prisma.rute.findMany();

  return NextResponse.json({
    code: "200",
    data,
  });
}
