import { NextResponse } from "next/server";
import { getsRute } from "~/server/rute/gets";

export async function GET() {
  const data = await getsRute();

  return NextResponse.json({
    code: "200",
    data,
  });
}
