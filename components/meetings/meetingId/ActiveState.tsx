import { EmptyUI } from "@/components/EmptyUI";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  meetingId: string;
}

export const ActiveState = ({ meetingId }: Props) => {
  return (
    <div className="bg-card rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyUI
        image="/upcoming.svg"
        title="Meeting is active"
        description="Meeting will end once all participants leave."
      />
      <div className="flex flex-col-reverse md:flex-row md:justify-center items-center gap-2 w-full">
        <Button className="w-full md:w-auto" asChild>
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Join Meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
