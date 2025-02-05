"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-base text-sm font-base font-semibold ring-offset-white transition-all gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-mtext bg-main border-2 border-border translate-x-[4px] translate-y-[4px] shadow-none data-[state=on]:translate-x-0 data-[state=on]:translate-y-0 data-[state=on]:shadow-shadow",
        noShadow: "text-mtext bg-main border-2 border-border bg-accent/50 data-[state=on]:bg-transparent",
        neutral:
          "bg-bw text-text border-2 border-border translate-x-[4px] translate-y-[4px] shadow-none data-[state=on]:translate-x-0 data-[state=on]:translate-y-0 data-[state=on]:shadow-shadow",
        reverse:
          "text-mtext bg-main border-2 border-border translate-x-[-4px] translate-y-[-4px] shadow-shadow data-[state=on]:translate-x-0 data-[state=on]:translate-y-0 data-[state=on]:shadow-none",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
