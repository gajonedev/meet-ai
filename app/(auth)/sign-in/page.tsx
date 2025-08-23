import LoginForm from "@/components/auth/SignInForm";
import LoginFormSkeleton from "@/components/sekeletons/LoginFormSkeleton";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import React, { Suspense } from "react";

const LoginPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session && session.user) return redirect("/");

  return (
    <div className="w-full space-y-6 rounded-lg flex flex-col items-center justify-center p-6 lg:p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Connexion</h1>
      </div>

      <Suspense fallback={<LoginFormSkeleton />}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default LoginPage;
