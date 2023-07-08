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
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { FormLogin } from "./form-login";
import { FormProvider } from "react-hook-form";

export function CardLogin() {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <CardTitle className="text-3xl">Login</CardTitle>
        <CardDescription>
          Enter your email and password below to Login
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {/* form login */}
        <FormLogin />
        {/* form login */}

        {/* login google */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button className="mb-2" size="lg" variant="outline">
          <FcGoogle className="mr-2 h-4 w-4" />
          Google
        </Button>
        {/* end login google */}
      </CardContent>
    </Card>
  );
}
