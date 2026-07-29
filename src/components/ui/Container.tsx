import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
  as?: ElementType;
};

/** Container — centered max-width wrapper with responsive gutters. */
export default function Container({
  children,
  className,
  size = "default",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "container",
        size === "wide" && "container--wide",
        size === "narrow" && "container--narrow",
        className
      )}
    >
      {children}
    </Tag>
  );
}
