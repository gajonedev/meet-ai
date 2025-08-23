"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  ResponsiveCommandDialog,
} from "../ui/command";

const HeaderSearchBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsSearchOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <div className="flex-1 max-w-md mx-4">
      <form className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Rechercher cours, tâches..."
          className="pl-10 pr-4 h-9 bg-card border-muted-foreground/20 focus:border-primary font-light text-sm rounded-lg border-none cursor-pointer"
          onClick={() => setIsSearchOpen(true)}
        />
      </form>

      <ResponsiveCommandDialog
        open={isSearchOpen}
        onOpenChange={setIsSearchOpen}
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </ResponsiveCommandDialog>
    </div>
  );
};

export default HeaderSearchBar;
