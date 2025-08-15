import * as React from "react";
import { cn } from "../../lib/util";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-2xl border border-gray-200 bg-white shadow-sm", className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

export const CardHeader = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-6 pb-0", props.className)} {...props} />
);

export const CardTitle = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-lg font-semibold leading-none tracking-tight", props.className)} {...props} />
);

export const CardDescription = (props: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-gray-500", props.className)} {...props} />
);

export const CardContent = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-6 pt-4", props.className)} {...props} />
);

export const CardFooter = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-6 pt-0", props.className)} {...props} />
);
