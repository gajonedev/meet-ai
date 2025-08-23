"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ErrorUI } from "../ErrorUI";
import { Skeleton } from "../ui/skeleton";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import { EmptyUI } from "../EmptyUI";

export const AgentsOverview = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div className="flex-1 pb-4  flex flex-col gap-y-4">
      {/* <p>{JSON.stringify(data, null, 2)}</p> */}
      <DataTable
        data={data}
        columns={columns}
        onRowClick={(row) => console.log(row)}
      />

      {data.length === 0 && (
        <EmptyUI title="No agent found" description="Try adding a new agent." />
      )}
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
