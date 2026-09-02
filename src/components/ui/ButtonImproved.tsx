import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
}

export const ButtonImproved = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", size = "medium", fullWidth = false, className, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:pointer-events-none";
    
    const variantClasses = {
      primary: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 focus:ring-purple-500 shadow-lg hover:shadow-xl",
      secondary: "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-500",
      ghost: "bg-transparent text-gray-300 hover:bg-gray-800/50 focus:ring-gray-500",
      outline: "border border-gray-600 bg-transparent text-white hover:bg-gray-800/50 focus:ring-gray-500"
    };
    
    const sizeClasses = {
      small: "text-sm px-4 py-2 rounded-md",
      medium: "text-base px-6 py-3 rounded-lg",
      large: "text-lg px-8 py-4 rounded-xl"
    };

    const fullWidthClass = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], fullWidthClass, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ButtonImproved.displayName = "Button";