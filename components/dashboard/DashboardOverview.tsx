// "use client";

import { useTRPC } from "@/trpc/client";
import { caller } from "@/trpc/server";
import { useQuery } from "@tanstack/react-query";

export async function DashboardOverview() {
  // const trpc = useTRPC();
  // const { data } = useQuery(trpc.hello.queryOptions({ text: "Gajone Dev" }));
  // const { greeting } = await caller.hello({ text: " Dev" });

  return (
    <div className="flex flex-col flex-1 gap-8">
      <h1 className="text-2xl font-bold">Tableau de bord</h1>
      <p className="text-muted-foreground">
        Une vue d'ensemble de vos activités
      </p>
      {/* <p>{greeting}</p> */}
    </div>
  );
}
