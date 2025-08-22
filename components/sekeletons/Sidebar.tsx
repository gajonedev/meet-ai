import { Skeleton } from "@/components/ui/skeleton";

export default function SidebarUserDropdownSkeleton() {
  return (
    <div className="flex items-center gap-3 p-2 w-full">
      <Skeleton className="h-9 w-9 rounded-lg" />
      <div className="flex-1">
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  );
}
