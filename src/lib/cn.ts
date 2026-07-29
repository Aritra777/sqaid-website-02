/**
 * cn — tiny classNames joiner. Filters falsy values so you can write:
 *   cn(styles.card, isActive && styles.active, className)
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
