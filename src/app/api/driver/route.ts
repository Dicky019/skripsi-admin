import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getDrivers } from "~/server/driver/gets";

export async function GET() {
  const data = await getDrivers();

  const headersList = headers();

  console.log({ headersList });

  return NextResponse.json({ data });
}
