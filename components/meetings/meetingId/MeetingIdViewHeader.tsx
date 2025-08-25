import { ReusableBreadcrumb } from "@/components/ReusableBreadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon, Pencil, Trash2 } from "lucide-react";

interface Props {
  meetingId: string;
  meetingName: string;
  onEdit: () => void;
  onRemove: () => void;
}

export const MeetingIdViewHeader = ({ meetingId, meetingName, onEdit, onRemove }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <ReusableBreadcrumb
        items={[
          { title: "Home", href: "/" },
          { title: "Meetings", href: "/meetings" },
          {
            title: meetingName + " (" + meetingId + ")",
            href: `/meetings/${meetingId}`,
          },
        ]}
      />

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreVerticalIcon className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-35 mr-10">
          <DropdownMenuItem
            onClick={() => onEdit()}
            className="justify-between px-3"
          >
            Edit
            <Pencil className="ml-2 inline h-4 w-4 text-foreground" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onRemove()}
            className="justify-between px-3"
            variant="destructive"
          >
            Remove
            <Trash2 className="ml-2 inline h-4 w-4 text-foreground" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
