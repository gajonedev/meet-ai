import { EmptyUI } from "@/components/EmptyUI";
import { Button } from "@/components/ui/button";
import { BanIcon, Loader, VideoIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  meetingId: string;
  onCancelMeeting: () => void;
  isCancelling: boolean;
}

export const UpcomingState = ({
  meetingId,
  onCancelMeeting,
  isCancelling,
}: Props) => {
  return (
    <div className="bg-card rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyUI
        image="/upcoming.svg"
        title="Not started yet"
        description="Once you start the meeting, a summary will appear here"
      />
      <div className="flex flex-col-reverse md:flex-row md:justify-center items-center gap-2 w-full">
        <Button
          variant="secondaryDestructive"
          className="w-full md:w-auto"
          onClick={onCancelMeeting}
          disabled={isCancelling}
        >
          {isCancelling ? (
            <>
              <Loader className="animate-spin" />
              Cancelling
            </>
          ) : (
            <>
              <BanIcon />
              Cancel Meeting
            </>
          )}
        </Button>
        {!isCancelling && (
          <Button className="w-full md:w-auto" asChild disabled={isCancelling}>
            <Link href={`/call/${meetingId}`}>
              <VideoIcon />
              Start Meeting
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};
