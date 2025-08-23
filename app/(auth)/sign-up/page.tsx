import RegisterForm from "@/components/auth/SignUpForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session && session.user) return redirect("/");

  return (
    <div className="flex items-center justify-center p-6 lg:p-8 w-full">
      <div className="w-full space-y-6 rounded-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Inscription</h1>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
