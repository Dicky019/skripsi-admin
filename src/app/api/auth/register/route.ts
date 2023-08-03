import { NextRequest, NextResponse } from "next/server";
import { signInFormSchema } from "~/types/auth";
import { prisma } from "~/lib/db";
import { cekUserDriver } from "~/server/driver/update";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const signInForm = signInFormSchema.safeParse(body);

  if (!signInForm.success) {
    const errorsMassange = signInForm.error.formErrors.fieldErrors;

    return NextResponse.json({
      code: "400",
      errors: errorsMassange,
    });
  }

  const data = signInForm.data;

  const cekUser = await cekUserDriver(data.email ?? "");

  if (cekUser) {
    return NextResponse.json({
      code: "400",
      errors: [{ user: ["Email ini sudah ada"] }],
    });
  }

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      image: data.image,
      role: "passenger",
      status: true,
    },
  });

  const { ...result } = user;

  return NextResponse.json({
    code: "200",
    data: result,
  });
}
