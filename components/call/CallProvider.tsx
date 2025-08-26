import { authClient } from "@/lib/auth-client";
import { CallConnect } from "./CallConnect";
import { generateAvatarUri } from "@/lib/avatar";
import { LoadingUI } from "../LoadingUI";

interface Props {
  meetingId: string;
  meetingName: string;
}

export const CallProvider = ({ meetingId, meetingName }: Props) => {
  const { data, isPending } = authClient.useSession();

  if (isPending || !data || !data.user) {
    return (
      <LoadingUI
        title="Loading..."
        description="Please wait while we load your meeting."
      />
    );
  }

  return (
    <CallConnect
      meetingId={meetingId}
      userId={data.user.id}
      meetingName={meetingName}
      userName={data.user.name}
      userImage={
        data.user.image ??
        generateAvatarUri({ seed: data.user.name, variant: "initials" })
      }
    />
  );
};
