import { eq, getTableColumns, sql } from "drizzle-orm";
import z from "zod";

import { db } from "@/db";
import { agents } from "@/db/schema";
import { agentsInsertSchema } from "@/lib/schemas";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const agentsRouter = createTRPCRouter({
  // Get all agents procedure
  getMany: protectedProcedure.query(async () => {
    const data = await db
      .select({
        ...getTableColumns(agents),
        // TODO: Change to actual number
        meetingCount: sql<number>`5`,
      })
      .from(agents);

    return data;
  }),

  // Get one agent by id procedure
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select({
          ...getTableColumns(agents),
          // TODO: Change to actual number
          meetingCount: sql<number>`5`,
        })
        .from(agents)
        .where(eq(agents.id, input.id));

      return existingAgent;
    }),

  // Create agent procedure
  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning();

      return createdAgent;
    }),
});
