"use client";

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ErrorUI } from "@/components/ErrorUI";
import { LoadingUI } from "@/components/LoadingUI";
import { useTRPC } from "@/trpc/client";
import { MeetingIdViewHeader } from "./MeetingIdViewHeader";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useState } from "react";
import { UpdateMeetingDialog } from "./UpdateMeetingDialog";
import { UpcomingState } from "./UpcomingState";
import { ActiveState } from "./ActiveState";
import { CancelledState } from "./CancelledState";
import { ProcessingState } from "./ProcessingState";

interface Props {
  meetingId: string;
}

export const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: ({ name }) => {
        setOpenDeleteDialog(false);
        toast.success(`Meeting "${name}" removed successfully`);
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        router.push("/meetings");
        // TODO: Invalidate free tier usage
      },
      onError: () => {
        toast.error("Failed to remove meeting. Please try again.");
        setOpenDeleteDialog(false);
      },
    })
  );

  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCancelled = data.status === "cancelled";
  const isCompleted = data.status === "completed";
  const isProcessing = data.status === "processing";

  return (
    <>
      <div className="flex-1 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data?.name}
          onEdit={() => setOpenUpdateDialog(true)}
          onRemove={() => setOpenDeleteDialog(true)}
        />
        {isCancelled && <CancelledState />}
        {isCompleted && <div>Completed</div>}
        {isProcessing && <ProcessingState />}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancelMeeting={() => {}}
            isCancelling={false}
          />
        )}
      </div>

      {/* Dialog for confirming deletion */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="p-8 rounded-xl" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="text-center">Confirm deletion</DialogTitle>
          </DialogHeader>
          <p className="text-center text-muted-foreground">
            Are you sure you want to delete this meeting?
          </p>
          <DialogFooter className="flex justify-between mt-4">
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={async () => {
                await removeMeeting.mutateAsync({ id: meetingId });
              }}
              disabled={removeMeeting.isPending}
            >
              {removeMeeting.isPending ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  Deleting
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <UpdateMeetingDialog
        open={openUpdateDialog}
        onOpenChange={setOpenUpdateDialog}
        initialValues={data}
      />
    </>
  );
};

export const MeetingIdOverviewError = ({}) => {
  return (
    <ErrorUI
      title="An error occurred"
      description="Failed to load meeting. Please check your connection or try again later."
    />
  );
};

export const MeetingIdOverviewLoading = () => {
  return (
    <LoadingUI
      title="Loading meeting"
      description="Please wait while we load the meeting."
    />
  );
};
