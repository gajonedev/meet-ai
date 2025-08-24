"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Loader, AlertCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { MeetingGetOne } from "@/server/types";
import { useTRPC } from "@/trpc/client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { meetingsInsertSchema } from "@/server/meetings/schemas";
import { CommandSelect } from "../CommandSelect";
import { GeneratedAvatar } from "../dashboard/GeneratedAvatar";
import { NewAgentDialog } from "../agents/NewAgentDialog";

// Props for the meeting form component
interface MeetingFormProps {
  onSuccess: (id: string) => void;
  onCancel: () => void;
  initialValues?: MeetingGetOne;
}

export const MeetingForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: MeetingFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const isEditing = !!initialValues;

  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
  const [agentSearch, setAgentSearch] = useState("");

  const { data, isFetching } = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    })
  );

  // Create meeting mutation
  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async ({ id }) => {
        form.reset();
        toast.success("Meeting created successfully");

        // Invalidate the meetings query to refetch the list of meetings
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );

        // TODO: Invalidate for free tier usage

        onSuccess?.(id);
      },
      onError: (error) => {
        setError("An error occurred while creating the agent.");
        toast.error("Error creating agent");
        form.reset();

        // TODO: Check if error code is "FORBIDDEN", then redirect to "/upgrade"
      },
    })
  );

  // Update meeting mutation
  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async ({ name, id }) => {
        form.reset();
        toast.success('Meeting "' + name + '" updated successfully');

        // Invalidate the meetings query to refetch the list of meetings
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );

        // Invalidate the specific meeting query if editing an existing meeting
        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id })
          );
        }

        // TODO: Invalidate free tier usage

        onSuccess?.(id);
      },
      onError: (error) => {
        setError("An error occurred while updating the agent.");
        toast.error("Error updating agent");
        form.reset();

        // TODO: Check if error code is "FORBIDDEN", then redirect to "/upgrade"
      },
    })
  );

  // Initialize the form
  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? "",
    },
  });

  // Determine if we are editing an existing agent
  const isEdit = !!initialValues?.id;
  const isPending =
    form.formState.isSubmitting ||
    createMeeting.isPending ||
    updateMeeting.isPending;

  // Determine if we are creating or updating and call the appropriate mutation
  const onSubmit = async (values: z.infer<typeof meetingsInsertSchema>) => {
    if (isEdit) {
      updateMeeting.mutate({ ...values, id: initialValues.id });
    } else {
      createMeeting.mutate(values);
    }
  };

  return (
    <>
      <NewAgentDialog
        onOpenChange={setOpenNewAgentDialog}
        open={openNewAgentDialog}
      />
      <div className="w-full space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Error display */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Agent Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meeting Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="e.g. Team Sync"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agent</FormLabel>
                  <FormControl>
                    <CommandSelect
                      options={(data?.items ?? []).map((agent) => ({
                        id: agent.id,
                        value: agent.id,
                        children: (
                          <div className="flex items-center gap-x-2">
                            <GeneratedAvatar
                              seed={agent.name}
                              variant="botttsNeutral"
                              className="border size-6"
                            />
                            <span>{agent.name}</span>
                          </div>
                        ),
                      }))}
                      onSelect={field.onChange}
                      onSearch={setAgentSearch}
                      value={field.value}
                      placeholder="Select an agent..."
                      isFetching={isFetching}
                    />
                  </FormControl>
                  <FormDescription className="flex text-center items-center pt-4">
                    Not found what you're looking for?
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => setOpenNewAgentDialog(true)}
                    >
                      Create a new agent
                    </Button>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action buttons */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={onCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    {isEditing ? "Updating" : "Creating"}
                  </>
                ) : isEditing ? (
                  "Update"
                ) : (
                  "Create Meeting"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
