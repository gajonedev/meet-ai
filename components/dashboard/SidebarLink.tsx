"use client";

import { usePathname } from "next/navigation";
import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

const data = {
  navMain: [
    {
      title: "Upgrade",
      url: "/upgrade",
      icon: FaStar,
    },
  ],
};

const SidebarLink = () => {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <div>
      <SidebarGroupContent>
        <SidebarMenu>
          {data.navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname === item.url}>
                <Link href={item.url} onClick={() => setOpenMobile(false)}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </div>
  );
};

export default SidebarLink;
