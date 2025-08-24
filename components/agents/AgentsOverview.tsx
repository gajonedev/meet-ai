"use client";

import { useRouter } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { ErrorUI } from "../ErrorUI";
import { Skeleton } from "../ui/skeleton";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import { EmptyUI } from "../EmptyUI";
import { useAgentsFilters } from "@/hooks/useAgentsFilters";
import { DataPagination } from "./DataPagination";
import { LoadingUI } from "../LoadingUI";

export const AgentsOverview = () => {
  const router = useRouter();
  const [filters, setFilters] = useAgentsFilters();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <div className="flex-1 pb-4  flex flex-col gap-y-4">
      <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />

      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />

      {data.items.length === 0 && (
        <EmptyUI title="No agent found" description="Try adding a new agent." />
      )}
    </div>
  );
};

export const AgentsOverviewError = () => {
  return (
    <ErrorUI
      title="An error occurred"
      description="Failed to load agents. Please check your connection or try again later."
    />
  );
};

export const AgentsOverviewLoading = () => {
  return (
    <LoadingUI
      title="Loading agents"
      description="Please wait while we load the agents."
    />
  );
};
