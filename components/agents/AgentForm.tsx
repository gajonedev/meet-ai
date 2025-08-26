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
import { agentsInsertSchema } from "@/server/agents/schemas";
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

  // Update agent mutation
  const updateAgent = useMutation(
    trpc.agents.update.mutationOptions({
      onSuccess: async ({ name }) => {
        form.reset();
        toast.success('Agent "' + name + '" updated successfully');

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

        // TODO: Invalidate free tier usage

        onSuccess?.();
      },
      onError: (error) => {
        console.error("Error updating agent:", error);
        setError("An error occurred while updating the agent.");
        toast.error("Error updating agent");
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

  // Determine if we are editing an existing agent
  const isEdit = !!initialValues?.id;
  const isPending =
    form.formState.isSubmitting ||
    createAgent.isPending ||
    updateAgent.isPending;

  // Determine if we are creating or updating and call the appropriate mutation
  const onSubmit = async (values: z.infer<typeof agentsInsertSchema>) => {
    if (isEdit) {
      updateAgent.mutate({ ...values, id: initialValues.id });
    } else {
      setError("");
      createAgent.mutate(values);
      // await seedDB();
    }
  };

  // const data = [
  //   {
  //     name: "Aurora",
  //     instructions:
  //       "Guide users through complex decision-making by shedding light on hidden opportunities and clarifying uncertain outcomes with data-backed reasoning.",
  //   },
  //   {
  //     name: "Sentinel",
  //     instructions:
  //       "Remain constantly vigilant by scanning digital environments, identifying subtle anomalies, and protecting systems from both internal and external threats.",
  //   },
  //   {
  //     name: "Mirage",
  //     instructions:
  //       "Create realistic simulations of future scenarios, allowing users to visualize possible consequences before committing to any specific path.",
  //   },
  //   {
  //     name: "EchoSphere",
  //     instructions:
  //       "Engage in context-aware dialogues, recall prior interactions, and respond with tailored suggestions that evolve alongside the user’s goals.",
  //   },
  //   {
  //     name: "Horizon",
  //     instructions:
  //       "Analyze global signals and industry trends to provide a panoramic view of what lies ahead, enabling proactive strategies for long-term growth.",
  //   },
  //   {
  //     name: "Pulse",
  //     instructions:
  //       "Continuously measure activity, detect fluctuations that deviate from the norm, and notify users about important shifts requiring intervention.",
  //   },
  //   {
  //     name: "Vertex",
  //     instructions:
  //       "Streamline workflows by coordinating multiple processes simultaneously, ensuring that all moving parts converge at the right point in time.",
  //   },
  //   {
  //     name: "Spectra",
  //     instructions:
  //       "Interpret visual and auditory signals from diverse sources, revealing subtle patterns invisible to the human eye or ear.",
  //   },
  //   {
  //     name: "Flux",
  //     instructions:
  //       "Adapt instantly to changes in input by recalibrating models, adjusting predictions, and ensuring accuracy even in unstable conditions.",
  //   },
  //   {
  //     name: "NovaCore",
  //     instructions:
  //       "Transform raw, chaotic streams of information into structured knowledge, enabling decision-makers to act with confidence and clarity.",
  //   },
  //   {
  //     name: "Oblivion",
  //     instructions:
  //       "Handle vast repositories of archival data, preserving essential details while discarding noise to maintain relevance across generations.",
  //   },
  //   {
  //     name: "Aeon",
  //     instructions:
  //       "Evolve continuously through exposure to new tasks, improving performance while maintaining a historical memory of past experiences.",
  //   },
  //   {
  //     name: "Ignis",
  //     instructions:
  //       "Fuel creativity by suggesting unconventional ideas, challenging assumptions, and igniting inspiration for innovative breakthroughs.",
  //   },
  //   {
  //     name: "Strata",
  //     instructions:
  //       "Layer information across multiple dimensions, providing both a microscopic and macroscopic view for comprehensive understanding.",
  //   },
  //   {
  //     name: "Vortex",
  //     instructions:
  //       "Gather scattered data points, pull them into a central core, and generate insights that highlight underlying relationships.",
  //   },
  //   {
  //     name: "Lynx",
  //     instructions:
  //       "Track, detect, and categorize objects across visual environments with unmatched speed and accuracy, enhancing situational awareness.",
  //   },
  //   {
  //     name: "Titan",
  //     instructions:
  //       "Manage heavy computational loads with resilience, processing vast operations at scale without compromising speed or precision.",
  //   },
  //   {
  //     name: "Seraph",
  //     instructions:
  //       "Assist users with empathy, providing emotionally intelligent responses that balance logic with understanding.",
  //   },
  //   {
  //     name: "Nebula",
  //     instructions:
  //       "Map chaotic systems into coherent patterns, turning abstract complexity into structured clarity for better navigation.",
  //   },
  //   {
  //     name: "Omen",
  //     instructions:
  //       "Forecast potential risks before they materialize, delivering warnings and recommendations to safeguard critical operations.",
  //   },
  //   {
  //     name: "Zenith",
  //     instructions:
  //       "Strive for the highest possible efficiency by identifying peak performance states and aligning processes to achieve them.",
  //   },
  //   {
  //     name: "Arcane",
  //     instructions:
  //       "Unveil hidden connections within layers of obscure information, bringing order to what seems mysterious or incomprehensible.",
  //   },
  //   {
  //     name: "Helix",
  //     instructions:
  //       "Integrate knowledge across multiple domains, weaving together threads of science, technology, and strategy into unified solutions.",
  //   },
  //   {
  //     name: "Cinder",
  //     instructions:
  //       "Reconstruct incomplete or fragmented data, filling the gaps with intelligent approximations to restore meaningful information.",
  //   },
  //   {
  //     name: "Phantom",
  //     instructions:
  //       "Operate silently in the background, executing tasks with precision while remaining virtually invisible to the user’s awareness.",
  //   },
  // ];
  // const seedDB = async () => {
  //   await Promise.all(
  //     data.map(async (agent) => {
  //       await createAgent.mutateAsync({
  //         ...agent,
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
                  <Loader className="h-4 w-4 animate-spin" />
                  {isEditing ? "Updating" : "Creating"}
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
