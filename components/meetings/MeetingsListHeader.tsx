"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa6";
import { NewMeetingDialog } from "./NewMeetingDialog";

export const MeetingsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
            <span className="max-sm:hidden">Add Meeting</span>
          </Button>
        </div>
      </div>
      <div className="my-4">{/* <AgentsSearchFilter /> */}</div>
    </>
  );
};
