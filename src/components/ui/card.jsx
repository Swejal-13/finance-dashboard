import * as React from "react";

import { cn } from "@/lib/utils";

// ✅ Removed generics
const Card = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...rest}
    />
  );
});
Card.displayName = "Card";

// ✅ Removed generics
const CardHeader = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...rest}
    />
  );
});
CardHeader.displayName = "CardHeader";

// ✅ Removed generics
const CardTitle = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <h3
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...rest}
    />
  );
});
CardTitle.displayName = "CardTitle";

// ✅ Removed generics
const CardDescription = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...rest}
    />
  );
});
CardDescription.displayName = "CardDescription";

// ✅ Removed generics
const CardContent = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <div
      ref={ref}
      className={cn("p-6 pt-0", className)}
      {...rest}
    />
  );
});
CardContent.displayName = "CardContent";

// ✅ Removed generics
const CardFooter = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...rest}
    />
  );
});
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};