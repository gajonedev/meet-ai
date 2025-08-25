"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { Input } from "../ui/input";
import { useMeetingsFilters } from "@/hooks/useMeetingsFilters";
import { useDebounce } from "@/hooks/useDebounce";
import { DEBOUNCE_DELAY } from "@/lib/constants";

export const MeetingsSearchFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();

  const [inputValue, setInputValue] = useState(filters.search);
  const debouncedSearchValue = useDebounce(inputValue, DEBOUNCE_DELAY);

  useEffect(() => {
    // Only update if the value actually changed to prevent infinite loops
    if (filters.search !== debouncedSearchValue) {
      setFilters({ search: debouncedSearchValue });
    }
  }, [debouncedSearchValue, filters.search]);

  return (
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
  );
};
