"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { FormLogin } from "./form-login";

export function CardLogin() {
  return (
    <Card className="mx-3">
      <CardHeader className="space-y-2">
        <CardTitle className="text-3xl">Login</CardTitle>
        <CardDescription>
          Enter your email and password below to Login
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {/* form login */}
        <FormLogin  />
        {/* form login */}
      </CardContent>
    </Card>
  );
}
