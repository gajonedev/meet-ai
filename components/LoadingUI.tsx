import { Loader } from "lucide-react";

export const LoadingUI = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="w-full mt-[8rem] items-center justify-center flex">
      <div className="flex flex-col items-center justify-center p-6 px-12 bg-card max-w-sm border rounded-xl">
        <Loader className="size-8 animate-spin" />
        <div className="flex flex-col items-center justify-center mt-4 gap-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm text-center">{description}</p>
        </div>
      </div>
    </div>
  );
};
