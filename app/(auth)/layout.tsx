import { ReactNode } from "react";

export default function AuthLayout({ children }: {children: ReactNode}) {
  return (
    <div className="flex bg-background">
      {/* Auth form container */}
      <div className="w-full flex flex-1 items-center justify-center px-3 py-6 sm:p-8 min-h-screen">
        <div className="w-full max-w-md space-y-8">
          {/* Form container */}
          <div className="bg-card rounded-xl shadow-none">{children}</div>
        </div>
      </div>
    </div>
  );
}
