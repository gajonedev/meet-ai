"use client";

import { Moon, Settings, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import DisconnectButton from "./DisconnectButton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SidebarMenuButton } from "../ui/sidebar";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { Skeleton } from "../ui/skeleton";
import { Alert, AlertDescription } from "../ui/alert";
import { GeneratedAvatar } from "../generated-avatar";
import { HiCash } from "react-icons/hi";
import { cn, getInitials } from "@/lib/utils";

export function SidebarUserDropdown() {
  const { theme, setTheme } = useTheme();
  const { data, isPending, error } = useSession();

  if (isPending) {
    return (
      <div className="flex items-center gap-3 px-2 py-1">
        <Skeleton className="h-9 w-9 rounded-lg" />
        <div className="flex flex-col gap-1 flex-1">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-3 w-16 rounded" />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Aucune donnée disponible</AlertDescription>
      </Alert>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <RenderAvatar name={data?.user?.name} image={data?.user?.image!} />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{data?.user?.name}</span>
            <span className="truncate text-xs">{data?.user?.email}</span>
          </div>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg shadow-2xl bg-card"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center">
            <HiCash className="mr-2 h-4 w-4" />
            Facturation
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        >
          {theme === "dark" ? (
            <Sun className="mr-2 h-4 w-4" />
          ) : (
            <Moon className="mr-2 h-4 w-4" />
          )}
          Changer le thème
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DisconnectButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function RenderAvatar({
  name,
  image,
  className,
}: {
  name: string;
  image: string | null;
  className?: string;
}) {
  if (image) {
    return (
      <Avatar className={cn("h-9 w-9 rounded-lg", className)}>
        <AvatarImage src={image} alt="User" />
        <AvatarFallback className="rounded-lg">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
    );
  } else {
    return (
      <GeneratedAvatar
        seed={name}
        variant="initials"
        className={cn("h-9 w-9 rounded-lg", className)}
      />
    );
  }
}
