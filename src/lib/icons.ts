/**
 * Icon registry — maps the string icon names used in nav-data.ts to
 * individually-imported lucide icons. Importing each icon by name (instead of
 * `import * as Icons`) keeps tree-shaking working, so pages only ship the
 * icons they actually use.
 *
 * When you add an icon name to nav-data, add it here too.
 */
import {
  Activity,
  ArrowLeftRight,
  BarChart3,
  Bot,
  Box,
  ClipboardList,
  CreditCard,
  FilePen,
  FolderKanban,
  Gauge,
  GitMerge,
  Kanban,
  Network,
  PenLine,
  Plug,
  ScanLine,
  ShieldOff,
  UserX,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  Activity,
  ArrowLeftRight,
  BarChart3,
  Bot,
  ClipboardList,
  CreditCard,
  FilePen,
  FolderKanban,
  Gauge,
  GitMerge,
  Kanban,
  Network,
  PenLine,
  Plug,
  ScanLine,
  ShieldOff,
  UserX,
  Zap,
};

/** Resolve an icon by name, falling back to a neutral Box glyph. */
export function getIcon(name: string): LucideIcon {
  return ICONS[name] ?? Box;
}
