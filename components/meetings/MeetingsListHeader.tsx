"use client";

import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa6";
import { NewMeetingDialog } from "./NewMeetingDialog";
import { MeetingsSearchFilter } from "./MeetingsSearchFilter";
import { StatusFilter } from "./StatusFilter";
import { AgentIdFilter } from "./AgentIdFilter";
import { useMeetingsFilters } from "@/hooks/useMeetingsFilters";
import { Search, XCircleIcon } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { DEBOUNCE_DELAY } from "@/lib/constants";
import { Input } from "../ui/input";

export const MeetingsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filters, setFilters] = useMeetingsFilters();

  const [inputValue, setInputValue] = useState(filters.search);
  const debouncedSearchValue = useDebounce(inputValue, DEBOUNCE_DELAY);

  const isAnyFilterActive = Boolean(
    filters.search || filters.status || filters.agentId
  );

  const clearFilter = () => {
    setFilters({ search: "", status: null, agentId: "", page: 1 });
    setInputValue("");
  };

  useEffect(() => {
    // Only update if the value actually changed to prevent infinite loops
    if (filters.search !== debouncedSearchValue) {
      setFilters({ search: debouncedSearchValue });
    }
  }, [debouncedSearchValue, filters.search]);

  return (
    <>
      <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Meetings</h1>
          <p className="text-muted-foreground">Manage your meetings here.</p>
        </div>
        <div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <FaPlus />
            <span className="max-sm:hidden">New Meeting</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-2 my-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Filter by name"
            className="pl-9 pr-4 h-9 bg-card focus:border-primary font-normal text-sm rounded-md cursor-text w-full lg:w-sm"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
        </div>
        <div className="flex gap-x-2">
          <StatusFilter />
          <AgentIdFilter />
          {isAnyFilterActive && (
            <Button variant="outline" className="ml-4" onClick={clearFilter}>
              <XCircleIcon />
              Clear
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
