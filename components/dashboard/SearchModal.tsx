"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Calendar,
  CheckSquare,
  Bell,
  Users,
  BookOpen,
  Clock,
  ArrowRight,
} from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery: string;
  onQueryChange: (query: string) => void;
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: "course" | "task" | "notification" | "social" | "general";
  category?: string;
  priority?: "high" | "medium" | "low";
  dueDate?: string;
  url?: string;
}

export function SearchModal({
  isOpen,
  onClose,
  initialQuery,
  onQueryChange,
}: SearchModalProps) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Math Assignment",
    "Physics Lab",
    "Study Group",
    "Notifications",
  ]);

  // Mock data - in a real app, this would come from your API/state
  const allResults: SearchResult[] = [
    {
      id: "1",
      title: "Calculus I - MATH 101",
      description: "Advanced calculus course with Dr. Smith",
      type: "course",
      category: "Mathematics",
      url: "/schedule",
    },
    {
      id: "2",
      title: "Math Assignment Chapter 5",
      description: "Complete exercises 1-20 from calculus textbook",
      type: "task",
      priority: "high",
      dueDate: "Today",
      url: "/tasks",
    },
    {
      id: "3",
      title: "Physics Lab Report",
      description: "Complete lab report for pendulum experiment",
      type: "task",
      priority: "medium",
      dueDate: "Friday",
      url: "/tasks",
    },
    {
      id: "4",
      title: "Assignment Due Tomorrow",
      description: "Math Assignment Chapter 5 is due tomorrow at 11:59 PM",
      type: "notification",
      url: "/notifications",
    },
    {
      id: "5",
      title: "Study Group Invitation",
      description: "Sarah invited you to join the Calculus study group",
      type: "social",
      url: "/social",
    },
    {
      id: "6",
      title: "World History - HIST 201",
      description: "World History course with Prof. Johnson",
      type: "course",
      category: "History",
      url: "/schedule",
    },
    {
      id: "7",
      title: "History Essay Draft",
      description: "Write first draft of World War II essay",
      type: "task",
      priority: "medium",
      dueDate: "Tomorrow",
      url: "/tasks",
    },
  ];

  const filters = [
    { key: "all", label: "All", icon: Search },
    { key: "course", label: "Courses", icon: BookOpen },
    { key: "task", label: "Tasks", icon: CheckSquare },
    { key: "notification", label: "Notifications", icon: Bell },
    { key: "social", label: "Social", icon: Users },
  ];

  const filteredResults = useMemo(() => {
    let results = allResults;

    // Filter by type
    if (selectedFilter !== "all") {
      results = results.filter((result) => result.type === selectedFilter);
    }

    // Filter by search query
    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      results = results.filter(
        (result) =>
          result.title.toLowerCase().includes(searchTerm) ||
          result.description.toLowerCase().includes(searchTerm) ||
          result.category?.toLowerCase().includes(searchTerm)
      );
    }

    return results;
  }, [query, selectedFilter]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    onQueryChange(searchQuery);

    // Add to recent searches if not empty and not already present
    if (searchQuery.trim() && !recentSearches.includes(searchQuery)) {
      setRecentSearches((prev) => [searchQuery, ...prev.slice(0, 4)]);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case "course":
        return BookOpen;
      case "task":
        return CheckSquare;
      case "notification":
        return Bell;
      case "social":
        return Users;
      default:
        return Search;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "outline";
    }
  };

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] p-0 flex flex-col overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b shrink-0">
          <DialogTitle className="flex items-center gap-2 text-lg font-normal">
            <Search className="h-5 w-5" />
            Search EasyCampus
          </DialogTitle>
        </DialogHeader>

        {/* Search Input */}
        <div className="px-4 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="input"
              placeholder="Search courses, tasks, notifications..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4"
              autoFocus
            />
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 shrink-0">
          <ScrollArea className="w-full pb-2 h-full">
            <div className="flex gap-2 pb-2 min-w-max">
              {filters.map((filter, index) => {
                const Icon = filter.icon;
                return (
                  <Button
                    key={index}
                    variant={
                      selectedFilter === filter.key ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedFilter(filter.key)}
                    className="flex items-center gap-2 whitespace-nowrap shrink-0"
                  >
                    <Icon className="h-4 w-4" />
                    {filter.label}
                  </Button>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <Separator className="shrink-0 -px-4" />

        {/* Search Results */}
        <div className="flex-1 min-h-0 max-h-[12rem] overflow-hidden">
          <ScrollArea className="h-full w-full">
            <div className="px-6 py-4 min-h-max">
              {query.trim() === "" ? (
                // Recent Searches
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Recent Searches
                    </h3>
                    {recentSearches.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearRecentSearches}
                        className="text-xs h-auto px-2 py-1"
                      >
                        Clear all
                      </Button>
                    )}
                  </div>
                  {recentSearches.length > 0 ? (
                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="w-full justify-start h-auto p-3 hover:bg-accent/50"
                          onClick={() => handleSearch(search)}
                        >
                          <Clock className="h-4 w-4 mr-3 text-muted-foreground shrink-0" />
                          <span className="text-left truncate">{search}</span>
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground py-4">
                      No recent searches
                    </p>
                  )}

                  {/* Quick Actions */}
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="justify-start h-auto p-3 hover:bg-accent/50"
                      >
                        <CheckSquare className="h-4 w-4 mr-2 shrink-0" />
                        <span className="truncate">View All Tasks</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start h-auto p-3 hover:bg-accent/50"
                      >
                        <Calendar className="h-4 w-4 mr-2 shrink-0" />
                        <span className="truncate">Today's Schedule</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start h-auto p-3 hover:bg-accent/50"
                      >
                        <Bell className="h-4 w-4 mr-2 shrink-0" />
                        <span className="truncate">Notifications</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start h-auto p-3 hover:bg-accent/50"
                      >
                        <Users className="h-4 w-4 mr-2 shrink-0" />
                        <span className="truncate">Study Groups</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ) : filteredResults.length > 0 ? (
                // Search Results
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      {filteredResults.length} result
                      {filteredResults.length !== 1 ? "s" : ""} found
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {filteredResults.map((result) => {
                      const Icon = getResultIcon(result.type);
                      return (
                        <Button
                          key={result.id}
                          variant="ghost"
                          className="w-full justify-start h-auto p-4 text-left hover:bg-accent/50"
                          onClick={() => {
                            // Navigate to result
                            onClose();
                          }}
                        >
                          <div className="flex items-start gap-3 w-full min-w-0">
                            <Icon className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" />
                            <div className="flex-1 min-w-0 space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-medium text-sm truncate flex-1 min-w-0">
                                  {result.title}
                                </h4>
                                <div className="flex items-center gap-1 shrink-0">
                                  {result.priority && (
                                    <Badge
                                      variant={
                                        getPriorityColor(result.priority) as any
                                      }
                                      className="text-xs"
                                    >
                                      {result.priority}
                                    </Badge>
                                  )}
                                  {result.dueDate && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      Due {result.dueDate}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {result.description}
                              </p>
                              {result.category && (
                                <div className="pt-1">
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {result.category}
                                  </Badge>
                                </div>
                              )}
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                // No Results
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No results found</h3>
                  <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                    Try adjusting your search terms or filters
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedFilter("all")}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>

            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t bg-muted/50 shrink-0">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Press ESC to close</span>
            <span className="hidden sm:inline">
              ↑↓ to navigate • ↵ to select
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
