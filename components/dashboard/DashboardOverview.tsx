import { Suspense } from "react";
import {
  ProgressOverviewSkeleton,
  StatsCardsSkeleton,
  TodayScheduleSkeleton,
  UpcomingTasksSkeleton,
} from "../sekeletons/Dashboard";

export async function DashboardOverview() {
  return (
    <div className="flex flex-col flex-1 gap-8">
      <div className="">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground">Une vue d'ensemble de vos activités</p>
      </div>
      {/* Stats Cards */}


      <div className="flex flex-col flex-1 gap-6">
        {/* Today's Schedule */}

      </div>
    </div>
  );
}
