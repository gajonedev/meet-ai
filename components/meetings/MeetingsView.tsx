"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useTRPC } from "@/trpc/client";
import { ErrorUI } from "../ErrorUI";
import { LoadingUI } from "../LoadingUI";
import { DataTable } from "../DataTable";
import { columns } from "./Columns";
import { EmptyUI } from "../EmptyUI";
import { useMeetingsFilters } from "@/hooks/useMeetingsFilters";
import { DataPagination } from "../DataPagination";

export const MeetingsView = () => {
  const router = useRouter();
  const trpc = useTRPC();
  const [filters, setFilters] = useMeetingsFilters();

  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <div>
      <DataTable data={data.items} columns={columns} onRowClick={({id}) => router.push(`/meetings/${id}`)} />

      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />

      {data.items.length === 0 && (
        <EmptyUI
          title="No meeting found"
          description="Try adding to create your first meeting."
        />
      )}
    </div>
  );
};

export const MeetingsViewError = () => {
  return (
    <ErrorUI
      title="An error occurred"
      description="Failed to load meetings. Please check your connection or try again later."
    />
  );
};

export const MeetingsViewLoading = () => {
  return (
    <LoadingUI
      title="Loading meetings"
      description="Please wait while we load the meetings."
    />
  );
};
