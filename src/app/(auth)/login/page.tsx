import { Metadata } from "next/types";
import { CardLogin } from "~/components/auth/login/card-login";

export const metadata: Metadata = {
  title: "Login",
  description: "Authentication forms built using the components.",
};

export default function Login() {
  return (
    <main className="flex h-screen items-center justify-center ">
      <div className="w-[450px]">
        <CardLogin />
      </div>
    </main>
  );
}
