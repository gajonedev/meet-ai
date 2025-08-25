import { EmptyUI } from "@/components/EmptyUI";

export const ProcessingState = () => {
  return (
    <div className="bg-card rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyUI
        image="/processing.svg"
        title="Meeting completed"
        description="This meeting was completed, as summary will appear soon"
      />
    </div>
  );
};
