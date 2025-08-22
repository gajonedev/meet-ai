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
import { FaRobot, FaStar } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";

const data = {
  navMain: [
    {
      title: "Meetings",
      url: "/meetings",
      icon: MdLiveTv,
    },
    {
      title: "Agents",
      url: "/agents",
      icon: FaRobot,
    },
  ],
};

const SidebarLinks = () => {
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

export default SidebarLinks;
