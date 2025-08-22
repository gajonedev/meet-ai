"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  Calendar,
  MessageSquare,
  CheckCircle,
  Clock,
  X,
  Settings,
  MoreHorizontal,
  Bell,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "../ui/badge";

interface Notification {
  id: string;
  type: "deadline" | "schedule" | "social" | "announcement" | "grade";
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: "high" | "medium" | "low";
  actionUrl?: string;
}

export function NotificationsDropdown() {
  const unreadNotifications = 3;
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "deadline",
      title: "Devoir à rendre demain",
      message:
        "Le chapitre 5 du devoir de mathématiques est à rendre demain à 23h59",
      time: "Il y a 2 heures",
      read: false,
      priority: "high",
      actionUrl: "/tasks",
    },
    {
      id: "2",
      type: "schedule",
      title: "Rappel de cours",
      message:
        "Le laboratoire de physique commence dans 30 minutes dans le laboratoire 3",
      time: "Il y a 30 minutes",
      read: false,
      priority: "medium",
      actionUrl: "/schedule",
    },
    {
      id: "3",
      type: "social",
      title: "Invitation au groupe d'étude",
      message: "Sarah vous a invité à rejoindre le groupe d'étude de Calculus",
      time: "Il y a 1 heure",
      read: true,
      priority: "low",
      actionUrl: "/social",
    },
    {
      id: "4",
      type: "announcement",
      title: "Mise à jour du cours",
      message: "Le cours d'histoire mondiale a été déplacé dans la salle 210",
      time: "Il y a 3 heures",
      read: false,
      priority: "medium",
      actionUrl: "/schedule",
    },
    {
      id: "5",
      type: "grade",
      title: "Note publiée",
      message: "Votre note de laboratoire de physique a été publiée : A-",
      time: "Il y a 1 jour",
      read: true,
      priority: "low",
      actionUrl: "/tasks",
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "deadline":
        return { icon: AlertTriangle, color: "text-red-500" };
      case "schedule":
        return { icon: Calendar, color: "text-blue-500" };
      case "social":
        return { icon: MessageSquare, color: "text-green-500" };
      case "announcement":
        return { icon: Calendar, color: "text-yellow-500" };
      case "grade":
        return { icon: CheckCircle, color: "text-purple-500" };
      default:
        return { icon: Clock, color: "text-gray-500" };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "before:bg-red-500";
      case "medium":
        return "before:bg-yellow-500";
      case "low":
        return "before:bg-green-500";
      default:
        return "before:bg-gray-300";
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild className="data-[state=open]:bg-accent/50">
        <Button
          variant="ghost"
          size="sm"
          className="relative h-10 w-10 p-0 rounded-full"
        >
          <Bell className="h-5! w-5!" />
          {unreadNotifications > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-0 -right-0 h-4 w-4 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {unreadNotifications}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-85 p-4 shadow-2xl rounded-xl sm:mr-6 border">
        <div className="w-full flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-normal text-sm">Notifications</h3>
              <p className="text-xs font-light text-muted-foreground">
                {unreadCount} non lues
              </p>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs border-none"
                >
                  Tout marquer comme lu
                </Button>
              )}
            </div>
          </div>

          <Separator />

          {/* Notifications List */}
          <ScrollArea className="h-[22rem]">
            {notifications.length > 0 ? (
              <div className="mr-3">
                {notifications.map((notification) => {
                  const { icon: Icon, color } = getNotificationIcon(
                    notification.type
                  );

                  return (
                    <div
                      key={notification.id}
                      className={`group relative p-2 rounded-lg mb-2 transition-colors hover:bg-accent/50 overflow-hidden ${
                        !notification.read
                          ? `bg-accent/20 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:h-full ${getPriorityColor(notification.priority)}`
                          : `border-l-gray-200 ${getPriorityColor(notification.priority)}`
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0 ml-2">
                          <div className="flex items-start justify-between gap-2 ">
                            <h4
                              className={`text-sm font-normal ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {notification.title}
                            </h4>
                            <div className="flex items-center gap-1">
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                              )}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <MoreHorizontal className="h-3 w-3" />
                                    <span className="sr-only">
                                      More options
                                    </span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="border-none"
                                >
                                  {!notification.read && (
                                    <DropdownMenuItem
                                      onClick={() =>
                                        markAsRead(notification.id)
                                      }
                                      className="text-sm font-light"
                                    >
                                      <CheckCircle className="mr-2 h-3 w-3" />
                                      Marquer comme lu
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem
                                    onClick={() =>
                                      deleteNotification(notification.id)
                                    }
                                    className="text-sm font-light"
                                    variant="destructive"
                                  >
                                    <X className="mr-2 h-3 w-3" />
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>

                          <p className="text-[13px] text-muted-foreground line-clamp-1">
                            {notification.message}
                          </p>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground/70 font-light">
                              <Clock className="h-3 w-3" />
                              {notification.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">
                  Toutes les notifications sont lues.
                </h3>
                <p className="text-sm text-muted-foreground">
                  Pas de nouvelles notifications pour le moment.
                </p>
              </div>
            )}
          </ScrollArea>
          {/* Footer */}
          {notifications.length > 0 && (
            <>
              <Separator />
              <div>
                <Button
                  variant="outline"
                  className="w-full justify-center text-sm border-none"
                >
                  Voir toutes les notifications
                </Button>
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
