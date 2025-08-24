"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { FaPlus } from "react-icons/fa6";

import { NewAgentDialog } from "./NewAgentDialog";
import { useAgentsFilters } from "@/hooks/use-agents-filters";
import { AgentsSearchFilter } from "./AgentsSearchFilter";
import { DEFAULT_PAGE } from "@/lib/constants";

export const AgentsListHeader = () => {
  const [filters, setFilters] = useAgentsFilters();
  const [open, setOpen] = useState(false);

  // const isAnyFilterModified = !!filters.search;

  // const onClearFilters = () => {
  //   setFilters({
  //     search: "",
  //     page: DEFAULT_PAGE,
  //   });
  // };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Agents</h1>
          <p className="text-muted-foreground">Manage your agents here.</p>
        </div>
        <div>
          <Button onClick={() => setOpen(true)}>
            <FaPlus />
            <span className="max-sm:hidden">Add Agent</span>
          </Button>
        </div>
        <NewAgentDialog open={open} onOpenChange={setOpen} />
      </div>
      <div className="my-4">
        <AgentsSearchFilter />
      </div>
    </>
  );
};
