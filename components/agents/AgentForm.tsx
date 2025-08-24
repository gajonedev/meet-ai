"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Loader, AlertCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import { AgentGetOne } from "@/server/types";
import { useTRPC } from "@/trpc/client";
import { agentsInsertSchema } from "@/lib/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GeneratedAvatar } from "../dashboard/GeneratedAvatar";

// Props for the agent form component
interface AgentFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  initialValues?: AgentGetOne;
}

export const AgentForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: AgentFormProps) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const isEditing = !!initialValues;

  // Create agent mutation
  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        form.reset();
        toast.success("Agent created successfully");

        // Invalidate the agents query to refetch the list of agents
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );

        // Invalidate the specific agent query if editing an existing agent
        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id })
          );
        }

        onSuccess?.();
      },
      onError: (error) => {
        console.error("Error creating agent:", error);
        setError("An error occurred while creating the agent.");
        toast.error("Error creating agent");
        form.reset();

        // TODO: Check if error code is "FORBIDDEN", then redirect to "/upgrade"
      },
    })
  );

  // Initialize the form
  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      instructions: initialValues?.instructions ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = form.formState.isSubmitting || createAgent.isPending;

  const onSubmit = async (values: z.infer<typeof agentsInsertSchema>) => {
    if (isEdit) {
      console.log("TODO: updateAgent");
    } else {
      createAgent.mutate(values);
    }
  };

  // const seedDb = async () => {
  //   const d = [
  //     { name: "Nexa", description: "Analyzes complex data in real time." },
  //     {
  //       name: "Orion",
  //       description: "Optimizes decision-making with predictive intelligence.",
  //     },
  //     { name: "Luma", description: "Brings clarity to project management." },
  //     {
  //       name: "Vega",
  //       description: "Monitors and protects systems against threats.",
  //     },
  //     {
  //       name: "Astra",
  //       description: "Facilitates the exploration of large datasets.",
  //     },
  //     { name: "Echo", description: "Interacts naturally in human language." },
  //     {
  //       name: "Kairos",
  //       description: "Helps make the right decisions at the right time.",
  //     },
  //     {
  //       name: "Iris",
  //       description: "Provides advanced image analysis and recognition.",
  //     },
  //     {
  //       name: "Zephyr",
  //       description: "Optimizes performance with speed and fluidity.",
  //     },
  //     {
  //       name: "Nova",
  //       description: "Turns information into clear and useful insights.",
  //     },
  //     {
  //       name: "Atlas",
  //       description: "Manages and structures large information networks.",
  //     },
  //     {
  //       name: "Lyra",
  //       description: "Enhances creativity with intelligent suggestions.",
  //     },
  //     { name: "Aion", description: "Predicts future trends from past data." },
  //     {
  //       name: "Cortex",
  //       description: "Acts as a digital brain for your operations.",
  //     },
  //     {
  //       name: "Artemis",
  //       description: "Guides research and provides precise recommendations.",
  //     },
  //     { name: "Helios", description: "Optimizes energy consumption with AI." },
  //     {
  //       name: "Selene",
  //       description: "Offers empathetic and personalized assistance.",
  //     },
  //     {
  //       name: "Nyx",
  //       description: "Shields systems in the shadows with cybersecurity.",
  //     },
  //     {
  //       name: "Eon",
  //       description: "Continuously learns and adapts to your needs.",
  //     },
  //     {
  //       name: "Solara",
  //       description: "Illuminates strategic decisions with clear analytics.",
  //     },
  //   ];

  //   await Promise.all(
  //     d.map(async (agent: { name: string; description: string }) => {
  //       await createAgent.mutateAsync({
  //         name: agent.name,
  //         instructions: agent.description,
  //       });
  //     })
  //   );
  // };

  return (
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

          {/* Avatar */}
          <GeneratedAvatar
            seed={form.watch("name")}
            variant="botttsNeutral"
            className="border size-16"
          />

          {/* Agent Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="e.g. John Doe"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Instructions Field */}
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="You are a helpful math assistant that can answer questions and help with math problems."
                    className="min-h-[150px]"
                    disabled={isPending}
                  />
                </FormControl>
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
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? "Updating..." : "Creating..."}
                </>
              ) : isEditing ? (
                "Update"
              ) : (
                "Create Agent"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
