import { NextRequest, NextResponse } from "next/server";
import { prisma } from "~/lib/db";
import { z } from "zod";
import { loginFormSchemaUser } from "~/types/auth";
import { getUser } from "~/server/user/get";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const loginInForm = loginFormSchemaUser.safeParse(body);

  if (!loginInForm.success) {
    const errorsMassange = loginInForm.error.formErrors.fieldErrors;

    return NextResponse.json({
      code: "400",
      errors: errorsMassange,
    });
  }

  const data = loginInForm.data;

  const user = await getUser(data.email);

  if (!user) {
    return NextResponse.json({
      code: "404",
      errors: [{ email: "Email tidak ditemukan" }],
    });
  }

  const { createdAt, updatedAt, ...result } = user;

  return NextResponse.json({
    code: "200",
    data: result,
  });
}
