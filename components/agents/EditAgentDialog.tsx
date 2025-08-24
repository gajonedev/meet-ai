import React from "react";
import { ResponsiveDialog } from "../ResponsiveDialog";
import { AgentForm } from "./AgentForm";
import { AgentGetOne } from "@/server/types";

interface EditAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: AgentGetOne;
}

export const EditAgentDialog = ({
  open,
  onOpenChange,
  initialValues,
}: EditAgentDialogProps) => {
  return (
    <ResponsiveDialog
      title="Edit Agent"
      description="Edit the details of the agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onCancel={() => onOpenChange(false)}
        onSuccess={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
