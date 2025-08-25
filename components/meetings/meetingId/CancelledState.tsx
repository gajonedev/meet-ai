import { EmptyUI } from "@/components/EmptyUI";

export const CancelledState = () => {
  return (
    <div className="bg-card rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyUI
        image="/cancelled.svg"
        title="Meeting is cancelled"
        description="Meeting has been cancelled and will not take place."
      />
    </div>
  );
};
