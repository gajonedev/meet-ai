import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardOverviewSkeleton() {
  return (
    <div className="flex flex-col flex-1 gap-8 animate-pulse">
      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="flex-1">
                <Skeleton className="h-4 w-2/3 mb-2" />
                <Skeleton className="h-6 w-1/2" />
              </div>
            </div>
            <Skeleton className="h-3 w-1/3 mt-2" />
          </div>
        ))}
      </div>

      {/* Today's Schedule Skeleton */}
      <div className="bg-card lg:p-8 p-6 rounded-xl">
        <div className="mb-4">
          <Skeleton className="h-5 w-40 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="space-y-4 mt-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-2 w-2 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-40 mb-1" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-3 w-10" />
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Tasks Skeleton */}
      <div className="bg-card rounded-xl p-6 space-y-3">
        <Skeleton className="h-5 w-40 mb-2" />
        <Skeleton className="h-4 w-32 mb-2" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-2 w-2 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-40 mb-1" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-5 w-16 rounded" />
            </div>
          ))}
          <Skeleton className="h-8 w-full rounded mt-2" />
        </div>
      </div>

      {/* Progress Overview Skeleton */}
      <div className="bg-card rounded-xl p-6 flex flex-col gap-3">
        <Skeleton className="h-5 w-40 mb-2" />
        <Skeleton className="h-4 w-32 mb-2" />
        <div className="grid gap-4 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-sm">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-10" />
              </div>
              <Skeleton className="h-2 w-full rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
