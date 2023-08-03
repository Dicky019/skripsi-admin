import { NextRequest, NextResponse } from "next/server";
import { getDriver } from "~/server/driver/get";
import { cekUserDriver, updateDriver } from "~/server/driver/update";
import { driverEditSchema } from "~/types/driver";

type getIdParams = {
  params: { id: string };
};

export async function GET(request: NextRequest, { params }: getIdParams) {
  console.log({ request });

  const data = await getDriver(params.id);

  if (!data) {
    return NextResponse.json({
      code: "404",
      errors: [{ driver: ["Driver tidak ditemukan"] }],
    });
  }

  return NextResponse.json({
    code: "200",
    data,
  });
}

export async function PUT(request: NextRequest, { params }: getIdParams) {
  const body = await request.json();

  const driverForm = driverEditSchema.safeParse({ id: params.id, ...body });

  if (!driverForm.success) {
    const errorsMassange = driverForm.error.formErrors.fieldErrors;
    return NextResponse.json({
      code: "400",
      errors: errorsMassange,
    });
  }

  const data = driverForm.data;
  const cekUser = await cekUserDriver(data.user.email ?? "");

  if (cekUser) {
    return NextResponse.json({
      code: "400",
      errors: [{ user: ["Email ini sudah ada"] }],
    });
  }

  const driver = await updateDriver(data);

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
