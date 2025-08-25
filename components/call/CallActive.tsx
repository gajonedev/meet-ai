import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";
import { VideoIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  onLeave: () => void;
  meetingName: string;
}

export const CallActive = ({ onLeave, meetingName }: Props) => {
  return (
    <div className="flex flex-col justify-between p-4 h-full">
      <div className="rounded-full p-4 flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center justify-center p-1 rounded-full bg-primary"
        >
          <VideoIcon size={24} />
        </Link>
        <h4 className="text-base">{meetingName}</h4>
      </div>
      <SpeakerLayout />
      <div className="rounded-full px-4 bg-muted">
        <CallControls onLeave={onLeave} />
      </div>
    </div>
  );
};
