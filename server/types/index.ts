import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type AgentGetOne = inferRouterOutputs<AppRouter>["agents"]["getOne"];
export type AgentGetMany =
  inferRouterOutputs<AppRouter>["agents"]["getMany"]["items"];

export type MeetingGetMany =
  inferRouterOutputs<AppRouter>["meetings"]["getMany"]["items"];
export type MeetingGetOne = inferRouterOutputs<AppRouter>["meetings"]["getOne"];

export enum MeetingStatus {
  UPCOMING = "upcoming",
  ACTIVE = "active",
  COMPLETED = "completed",
  PROCESSING = "processing",
  CANCELLED = "cancelled",
}

export type StreamTranscriptionItem = {
  speaker_id: string;
  type: string;
  text: string;
  start_ts: number;
  stop_ts: number;
};
