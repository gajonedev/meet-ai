import { meetingsRouter } from "@/server/meetings/procedures";
import { createTRPCRouter } from "../init";
import { agentsRouter } from "@/server/agents/procedures";

export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
