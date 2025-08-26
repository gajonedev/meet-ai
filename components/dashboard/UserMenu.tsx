"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { IoAlertCircle } from "react-icons/io5";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import DisconnectButton from "./DisconnectButton";
import { useSession } from "@/lib/auth-client";
import { Skeleton } from "../ui/skeleton";
import { RenderAvatar } from "./SidebarUserDropdown";
import { FaRobot, FaStar } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";

const UserMenu = () => {
  const { data, isPending, error } = useSession();
  const { theme, setTheme } = useTheme();

  if (isPending) {
    return <Skeleton className="h-9 w-9 rounded-full cursor-wait" />;
  }

  if (error || !data) {
    return (
      <div className="h-9 w-9 rounded-full bg-destructive/30 flex items-center justify-center">
        <IoAlertCircle className="h-4 w-4 text-destructive!" />
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <RenderAvatar
            name={data?.user?.name}
            image={data?.user?.image!}
            className="rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 border p-2 rounded-xl mt-2 mr-2 shadow-2xl"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal -mt-1">
          <div className="flex flex-col space-y-1">
            <p className="text-lg font-medium leading-none">
              {data?.user?.name}
            </p>
            <p className="text-sm font-light text-muted-foreground truncate line-clamp-1">
              {data?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="mx-2" />
        <div className="flex flex-col">
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <FaRobot className="mr-2 h-4 w-4" />
              <span>Agents</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <MdLiveTv className="mr-2 h-4 w-4" />
              <span>Meetings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FaStar className="mr-2 h-4 w-4" />
            <span>Upgrade</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              setTheme(theme === "light" ? "dark" : "light");
            }}
          >
            {theme === "light" ? (
              <Moon className="mr-2 h-4 w-4" />
            ) : (
              <Sun className="mr-2 h-4 w-4" />
            )}
            <span>Changer le thème</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="mx-2" />
        </div>
        <DisconnectButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
