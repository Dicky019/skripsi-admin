// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//     // Store hash in your password DB.
// });

import { NextRequest, NextResponse } from "next/server";
import { signInFormSchema } from "~/types/auth";
import * as bcrypt from "bcrypt";
import { prisma } from "~/lib/db";
import { UserRole } from "@prisma/client";

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

  const user = await prisma.user.create({
    data: {
      name: data.username,
      email: data.email,
      password: await bcrypt.hash(data.password, 10),
      role: UserRole.admin,
    },
  });

  const { password, ...result } = user;

  return NextResponse.json({
    code: "200",
    data: result,
  });
}
