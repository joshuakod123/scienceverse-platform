import * as React from "react";
import { cn } from "../../lib/util";

type Variant = "default" | "secondary" | "destructive" | "ghost" | "outline" | "link";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variantMap: Record<Variant, string> = {
  default: "bg-black text-white hover:bg-black/90 focus:ring-black",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",
  destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
  ghost: "bg-transparent hover:bg-gray-100",
  outline: "border border-gray-300 hover:bg-gray-50",
  link: "bg-transparent underline-offset-4 hover:underline p-0 h-auto",
};

const sizeMap: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4",
  lg: "h-12 px-6 text-lg",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(base, variantMap[variant], sizeMap[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
