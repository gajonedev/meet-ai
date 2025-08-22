import { SidebarTrigger } from "@/components/ui/sidebar";
import { NotificationsDropdown } from "./NotificationsDropdown";
import HeaderSearchBar from "./HeaderSearchBar";
import UserMenu from "./UserMenu";
// import { getUserProfile } from "@/actions/user.actions";

export async function DashboardHeader() {
  // const user = await getUserProfile();
  // console.log("User in DashboardHeader:", user);

  return (
    <>
      <header className="fixed top-0 right-0 left-0 group-has-[[data-collapsible=icon]]/sidebar-wrapper:ml-12 group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-[49px] ml-[15rem] max-md:ml-0 h-[65px] shrink-0 z-40 items-center gap-2 transition-[width,height] ease-linear border-b bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between w-full h-full">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>

          {/* Search Bar */}
          <HeaderSearchBar />

          {/* Right side actions */}
          <div className="flex items-center gap-3 mr-3">
            {/* Notifications Dropdown */}
            {/* <NotificationsDropdown /> */}

            {/* User Menu */}
            <UserMenu />
          </div>
        </div>
      </header>
    </>
  );
}
