import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

// ✅ Removed generics
const AlertDialogOverlay = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <AlertDialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...rest}
    />
  );
});
AlertDialogOverlay.displayName = "AlertDialogOverlay";

// ✅ Removed generics
const AlertDialogContent = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className
        )}
        {...rest}
      />
    </AlertDialogPortal>
  );
});
AlertDialogContent.displayName = "AlertDialogContent";

// ✅ Removed TS typing
const AlertDialogHeader = (props) => {
  const { className, ...rest } = props;
  return (
    <div
      className={cn(
        "flex flex-col space-y-2 text-center sm:text-left",
        className
      )}
      {...rest}
    />
  );
};
AlertDialogHeader.displayName = "AlertDialogHeader";

// ✅ Removed TS typing
const AlertDialogFooter = (props) => {
  const { className, ...rest } = props;
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
      {...rest}
    />
  );
};
AlertDialogFooter.displayName = "AlertDialogFooter";

// ✅ Removed generics
const AlertDialogTitle = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <AlertDialogPrimitive.Title
      ref={ref}
      className={cn("text-lg font-semibold", className)}
      {...rest}
    />
  );
});
AlertDialogTitle.displayName = "AlertDialogTitle";

// ✅ Removed generics
const AlertDialogDescription = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <AlertDialogPrimitive.Description
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...rest}
    />
  );
});
AlertDialogDescription.displayName = "AlertDialogDescription";

// ✅ Removed generics
const AlertDialogAction = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <AlertDialogPrimitive.Action
      ref={ref}
      className={cn(buttonVariants(), className)}
      {...rest}
    />
  );
});
AlertDialogAction.displayName = "AlertDialogAction";

// ✅ Removed generics
const AlertDialogCancel = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <AlertDialogPrimitive.Cancel
      ref={ref}
      className={cn(
        buttonVariants({ variant: "outline" }),
        "mt-2 sm:mt-0",
        className
      )}
      {...rest}
    />
  );
});
AlertDialogCancel.displayName = "AlertDialogCancel";

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};