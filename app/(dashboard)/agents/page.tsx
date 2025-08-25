import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { SearchParams } from "nuqs";

import { AgentsListHeader } from "@/components/agents/AgentsListHeader";
import {
  AgentsOverview,
  AgentsOverviewError,
  AgentsOverviewLoading,
} from "@/components/agents/AgentsView";
import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { loadSearchParams } from "@/server/agents/params";

interface Props {
  searchParams: Promise<SearchParams>;
}

const Page = async ({ searchParams }: Props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (!session || !session.user) return redirect("/sign-in");

  const filters = await loadSearchParams(searchParams);

  const queryClient = getQueryClient();
  
  void queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <section className="p-4">
      <AgentsListHeader />
      <div className="flex-1">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<AgentsOverviewLoading />}>
            <ErrorBoundary fallback={<AgentsOverviewError />}>
              <AgentsOverview />
            </ErrorBoundary>
          </Suspense>
        </HydrationBoundary>
      </div>
    </section>
  );
};

export default Page;
