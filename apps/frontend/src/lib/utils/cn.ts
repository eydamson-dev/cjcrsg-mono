import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines multiple class names into a single string.
 * It uses `clsx` to conditionally include class names and `tailwind-merge` to resolve conflicts between Tailwind CSS classes.
 *
 * @param inputs - An array of class names or conditional objects.
 * @returns A string containing the combined class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
