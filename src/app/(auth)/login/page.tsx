import { Metadata } from "next/types";
import { CardLogin } from "~/components/auth/login/card-login";

export const metadata: Metadata = {
  title: "Login",
  description: "Authentication forms built using the components.",
}

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-[450px]">
        <CardLogin />
      </div>
    </main>
  );
}
