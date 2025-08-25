import { ReactNode, useState } from "react";
import { ChevronsUpDown, Loader } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

import { cn } from "@/lib/utils";
import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  ResponsiveCommandDialog,
} from "./ui/command";
import { Button } from "./ui/button";

interface Props {
  options: Array<{ id: string; value: string; children: ReactNode }>;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value: string;
  placeholder?: string;
  isSearchable?: boolean;
  className?: string;
  isFetching?: boolean;
}

export const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  placeholder = "Select an option...",
  isSearchable,
  className,
  isFetching,
}: Props) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);
  const debounced = useDebouncedCallback((value: string) => {
    onSearch?.(value);
  }, 300);

  const handleOpenChange = (value: boolean) => {
    onSearch?.("");
    setOpen(value);
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className={cn(
          "h-9 justify-between font-normal px-2",
          !selectedOption && "text-muted-foreground",
          className
        )}
        onClick={() => setOpen(true)}
      >
        <div>{selectedOption?.children ?? placeholder}</div>
        <ChevronsUpDown />
      </Button>

      <ResponsiveCommandDialog
        open={open}
        onOpenChange={handleOpenChange}
        shouldFilter={!onSearch}
      >
        <CommandInput
          placeholder="Search..."
          onValueChange={(value) => {
            debounced(value);
          }}
        />
        <CommandList className="py-4">
          {!isFetching && (
            <CommandEmpty>
              <span className="text-muted-foreground">No options found</span>
            </CommandEmpty>
          )}
          {isFetching && (
            <div className="flex items-center justify-center py-4">
              <Loader className="size-6 animate-spin" />
            </div>
          )}
          {options.map((option) => (
            <CommandItem
              key={option.id}
              onSelect={() => {
                onSelect(option.value);
                setOpen(false);
              }}
              className="rounded-lg mx-3"
            >
              {option.children}
            </CommandItem>
          ))}
        </CommandList>
      </ResponsiveCommandDialog>
    </>
  );
};
