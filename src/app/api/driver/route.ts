import { NextRequest, NextResponse } from "next/server";
import { cekUser } from "~/server/user/cek";
import { createDriver } from "~/server/driver/create";
import { driverCreateSchema } from "~/types/driver";


export async function POST(request: NextRequest) {
  const body = await request.json();

  const driverForm = driverCreateSchema.safeParse(body);

  if (!driverForm.success) {
    const errorsMassange = driverForm.error.formErrors.fieldErrors;
    return NextResponse.json({
      code: "400",
      errors: errorsMassange,
    });
  }

  const data = driverForm.data;

  const cekDriver = await cekUser(data.user.email);

  if (cekDriver) {
    return NextResponse.json({
      code: "400",
      errors: [{ user: ["Email ini sudah ada"] }],
    });
  }

  const driver = await createDriver(data);

  if (!driver) {
    return NextResponse.json({
      code: "404",
      errors: [{ driver: ["Driver tidak ditemukan"] }],
    });
  }

  const { ...result } = driver;

  return NextResponse.json({
    code: "200",
    data: result,
  });
  
}
