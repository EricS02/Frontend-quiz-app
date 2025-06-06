import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Simple utility function without external dependencies
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
