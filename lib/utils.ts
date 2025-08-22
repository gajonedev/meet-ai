import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(fullName: string) {
  if (!fullName) return "";
  const names = fullName.split(" ");
  return names.length >= 2
    ? `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`
    : names[0].charAt(0);
}
