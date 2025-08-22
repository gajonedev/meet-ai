"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { SearchModal } from "./SearchModal";

const HeaderSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(true);
    }
  };

  return (
    <div className="flex-1 max-w-md mx-4">
      <form onSubmit={handleSearchSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Rechercher cours, tâches..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 h-9 bg-card border-muted-foreground/20 focus:border-primary font-light text-sm rounded-lg border-none"
          onFocus={() => searchQuery && setIsSearchOpen(true)}
        />
      </form>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        initialQuery={searchQuery}
        onQueryChange={setSearchQuery}
      />
    </div>
  );
};

export default HeaderSearchBar;
