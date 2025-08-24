"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { ErrorUI } from "../ErrorUI";
import { LoadingUI } from "../LoadingUI";
import { DataTable } from "../DataTable";
import { columns } from "./Columns";
import { EmptyUI } from "../EmptyUI";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <div>
      <DataTable data={data.items} columns={columns} onRowClick={() => {}} />
      {data.items.length === 0 && (
        <EmptyUI title="No meeting found" description="Try adding to create your first meeting." />
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
