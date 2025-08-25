import { toast } from "sonner";
import { MeetingForm } from "../MeetingForm";
import { ResponsiveDialog } from "@/components/ResponsiveDialog";
import { MeetingGetOne } from "@/server/types";

interface UpdateMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingGetOne;
}

export const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  initialValues,
}: UpdateMeetingDialogProps) => {
  return (
    <ResponsiveDialog
      title="Update Meeting"
      description="Update the meeting details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
