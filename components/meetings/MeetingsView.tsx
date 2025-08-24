"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { ErrorUI } from "../ErrorUI";
import { LoadingUI } from "../LoadingUI";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
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
