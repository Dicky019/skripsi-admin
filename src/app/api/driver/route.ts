import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { driverGetAll } from "~/server/driver/get-driver";

export async function GET() {
  const data = await driverGetAll();

  const headersList = headers();

  console.log({ headersList });

  return NextResponse.json({ data });
}
