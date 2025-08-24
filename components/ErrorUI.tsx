import { AlertCircle } from "lucide-react";

export const ErrorUI = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="w-full mt-[8rem] items-center justify-center flex">
      <div className="flex flex-col items-center justify-center p-6 max-w-sm border-destructive border rounded-xl bg-destructive/20">
        <AlertCircle className="h-20 w-20 text-destructive" />
        <div className="flex flex-col items-center justify-center mt-4 gap-2">
          <h3 className="text-xl font-semibold text-destructive">{title}</h3>
          <p className="text-sm text-destructive text-center">{description}</p>
        </div>
      </div>
    </div>
  );
};
