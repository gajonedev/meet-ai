"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { ErrorUI } from "../ErrorUI";
import { Skeleton } from "../ui/skeleton";

export const AgentsOverview = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div>
      <p>{JSON.stringify(data, null, 2)}</p>
    </div>
  );
};

export const AgentsOverviewError = () => {
  return (
    <ErrorUI
      title="Une erreur est survenue"
      description="Impossible de charger les agents. Veuillez vérifier votre connexion ou réessayer plus tard."
    />
  );
};

export const AgentsOverviewLoading = () => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i}>
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-3/4" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-1/2" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-1/3" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
