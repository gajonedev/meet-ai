import { useMeetingsFilters } from "@/hooks/useMeetingsFilters";
import { MeetingStatus } from "@/server/types";
import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowDownIcon,
  Loader,
  VideoIcon,
} from "lucide-react";
import { CommandSelect } from "../CommandSelect";

const options = [
  {
    id: MeetingStatus.UPCOMING,
    value: MeetingStatus.UPCOMING,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <ClockArrowDownIcon />
        {MeetingStatus.UPCOMING}
      </div>
    ),
  },
  {
    id: MeetingStatus.ACTIVE,
    value: MeetingStatus.ACTIVE,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <VideoIcon />
        {MeetingStatus.ACTIVE}
      </div>
    ),
  },
  {
    id: MeetingStatus.CANCELLED,
    value: MeetingStatus.CANCELLED,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleXIcon />
        {MeetingStatus.CANCELLED}
      </div>
    ),
  },
  {
    id: MeetingStatus.COMPLETED,
    value: MeetingStatus.COMPLETED,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleCheckIcon />
        {MeetingStatus.COMPLETED}
      </div>
    ),
  },
  {
    id: MeetingStatus.PROCESSING,
    value: MeetingStatus.PROCESSING,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <Loader />
        {MeetingStatus.PROCESSING}
      </div>
    ),
  },
];

export const StatusFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();

  return (
    <CommandSelect
      placeholder="Status"
      className="h-9"
      options={options}
      onSelect={(value) => setFilters({ status: value as MeetingStatus })}
      value={filters.status ?? ""}
    />
  );
};
