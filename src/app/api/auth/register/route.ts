import { NextRequest, NextResponse } from "next/server";
import { signInFormSchema } from "~/types/auth";
import { prisma } from "~/lib/db";
import { cekUserDriver } from "~/server/driver/update";
import { signJwtAccessToken } from "~/lib/jwt";

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

  const signInFormData = signInForm.data;

  const cekUser = await cekUserDriver(signInFormData.email ?? "");

  if (cekUser) {
    const accessToken = signJwtAccessToken(cekUser);

    const data = {
      ...cekUser,
      accessToken,
    };

    return NextResponse.json({
      code: "200",
      data: data,
    });
  }

  const user = await prisma.user.create({
    data: {
      name: signInFormData.name,
      email: signInFormData.email,
      image: signInFormData.image,
      role: "passenger",
      status: true,
    },
  });

  const { ...userWithoutPass } = user;
  const accessToken = signJwtAccessToken(userWithoutPass);

  const data = {
    ...userWithoutPass,
    accessToken,
  };

  return NextResponse.json({
    code: "200",
    data: data,
  });
}
