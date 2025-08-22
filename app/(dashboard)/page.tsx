import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) return redirect("/sign-in");

  return (
    <div className="flex flex-1 flex-col gap-3">
      <DashboardOverview />
    </div>
  );
}
