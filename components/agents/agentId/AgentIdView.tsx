"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { LuVideo } from "react-icons/lu";

import { useTRPC } from "@/trpc/client";
import { ErrorUI } from "@/components/ErrorUI";
import { LoadingUI } from "@/components/LoadingUI";
import AgentIdViewHeader from "./AgentIdViewHeader";
import { GeneratedAvatar } from "@/components/dashboard/GeneratedAvatar";
import { Badge } from "@/components/ui/badge";

interface Props {
  agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  return (
    <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
      <AgentIdViewHeader
        agentId={agentId}
        agentName={data.name}
        onEdit={() => {}}
        onRemove={() => {}}
      />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

      <div className="bg-card rounded-xl border">
        <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
          <div className="flex items-center gap-x-3">
            <GeneratedAvatar
              variant="botttsNeutral"
              seed={data.name}
              className="size-10"
            />

            <h2 className="text-2xl font-medium">{data.name}</h2>
          </div>
          <Badge
            variant="outline"
            className="flex items-center gap-x-2 [&>svg]:size-4 rounded-full"
          >
            <LuVideo className="text-primary" />
            {data.meetingCount}{" "}
            {data.meetingCount === 1 ? "meeting" : "meetings"}
          </Badge>

          <div className="flex flex-col gap-y-2">
            <p className="text-lg font-medium">Instructions</p>
            <p className="text-sm font-light text-muted-foreground">
              {data.instructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AgentIdOverviewError = () => {
  return (
    <ErrorUI
      title="An error occurred"
      description="Failed to load agent. Please check your connection or try again later."
    />
  );
};

export const AgentIdOverviewLoading = () => {
  return (
    <LoadingUI
      title="Loading agent"
      description="Please wait while we load the agent."
    />
  );
};
