import { NextRequest, NextResponse } from "next/server";
import { updateLocationDriver } from "~/server/driver/update";
import { locationSchema } from "~/types/location";

type getIdParams = {
  params: { id: string };
};

export async function PUT(request: NextRequest, { params }: getIdParams) {
  const body = await request.json();

  const locationForm = locationSchema.safeParse(body);

  if (!locationForm.success) {
    const errorsMassange = locationForm.error.formErrors.fieldErrors;
    return NextResponse.json({
      code: "400",
      errors: errorsMassange,
    });
  }

  const data = locationForm.data;

  const location = await updateLocationDriver(params.id, data);

  if (!location) {
    return NextResponse.json({
      code: "404",
      errors: [{ driver: ["Driver tidak ditemukan"] }],
    });
  }

  const { ...result } = location;

  return NextResponse.json({
    code: "200",
    data: result,
  });
}
