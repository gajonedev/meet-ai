import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex w-full flex-col">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DashboardHeader />
          <div className="w-full mt-[4rem] p-4 sm:p-6">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
};

export default AppLayout;
