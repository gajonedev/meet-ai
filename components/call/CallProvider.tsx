import { authClient } from "@/lib/auth-client";
import { is } from "drizzle-orm";
import { CallConnect } from "./CallConnect";
import { generateAvatarUri } from "@/lib/avatar";

interface Props {
  meetingId: string;
  meetingName: string;
}

export const CallProvider = ({ meetingId, meetingName }: Props) => {
  const { data, isPending } = authClient.useSession();

  if (isPending || !data || !data.user) {
    return <div>Loading...</div>;
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
