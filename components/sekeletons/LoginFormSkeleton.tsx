import { Skeleton } from "@/components/ui/skeleton";

export default function LoginFormSkeleton() {
  return (
    <div className="w-full max-w-[25rem] space-y-6">
      {/* Social buttons */}
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
      {/* Separator */}
      <div className="relative">
        <Skeleton className="h-4 w-24 mx-auto" />
      </div>
      {/* Form fields */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
      {/* Register link */}
      <Skeleton className="h-4 w-40 mx-auto" />
    </div>
  );
}
