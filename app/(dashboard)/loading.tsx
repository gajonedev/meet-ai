import DashboardOverviewSkeleton from "@/components/dashboard/DashboardOverviewSkeleton";

export default async function Loading() {
  return (
    <div className="flex flex-col flex-1 gap-8 p-4">
      <DashboardOverviewSkeleton />
      {/* Loading... */}
    </div>
  );
}
