import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import {
  MeetingIdOverviewError,
  MeetingIdOverviewLoading,
  MeetingIdView,
} from "@/components/meetings/meetingId/MeetingIdView";

interface Props {
  params: Promise<{ meetingId: string }>;
}

const Page = async ({ params }: Props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) return redirect("/sign-in");

  const { meetingId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingIdOverviewLoading />}>
        <ErrorBoundary fallback={<MeetingIdOverviewError />}>
          <MeetingIdView meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
