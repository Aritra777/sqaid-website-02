import { HTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

export interface SectionHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  size?: "small" | "medium" | "large" | "hero";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const SectionHeadingImproved = forwardRef<HTMLHeadingElement, SectionHeadingProps>(
  ({ children, size = "medium", as: Component = "h2", className, ...props }, ref) => {
    const baseClasses = "font-bold tracking-tight";
    
    const sizeClasses = {
      small: "text-2xl md:text-3xl",
      medium: "text-3xl md:text-4xl",
      large: "text-4xl md:text-5xl",
      hero: "text-5xl md:text-7xl lg:text-8xl"
    };

    return (
      <Component
        ref={ref}
        className={clsx(baseClasses, sizeClasses[size], className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

SectionHeadingImproved.displayName = "SectionHeading";