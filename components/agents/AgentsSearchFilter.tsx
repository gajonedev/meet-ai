"use client";

import { Search } from "lucide-react";
import React from "react";

import { Input } from "../ui/input";
import { useAgentsFilters } from "@/hooks/use-agents-filters";

export const AgentsSearchFilter = () => {
  const [filters, setFilters] = useAgentsFilters();

  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Filter by name"
        className="pl-9 pr-4 h-9 bg-card border-muted-foreground/20 focus:border-primary font-light text-sm rounded-lg border-none cursor-text w-full md:w-sm"
        onChange={(e) => setFilters({ search: e.target.value })}
        value={filters.search}
      />
    </div>
  );
};
