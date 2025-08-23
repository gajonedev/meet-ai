"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { FaPlus } from "react-icons/fa6";
import { NewAgentDialog } from "./NewAgentDialog";

export const AgentsListHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h1 className="text-2xl font-bold">Agents</h1>
        <p className="text-muted-foreground">Manage your agents here.</p>
      </div>
      <div>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          <FaPlus />
          <span className="max-sm:hidden">Add Agent</span>
        </Button>
        <NewAgentDialog open={open} onOpenChange={setOpen} />
      </div>
    </div>
  );
};
