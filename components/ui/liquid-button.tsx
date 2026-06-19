import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const liquidButtonVariants = cva("lg-btn", {
  variants: {
    variant: {
      primary: "lg-primary",
      ghost: "lg-ghost",
    },
    size: {
      sm: "px-4 py-2 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-6 py-3 text-sm",
      xl: "px-7 py-3.5",
    },
  },
  defaultVariants: { variant: "primary", size: "lg" },
});

export interface LiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidButtonVariants> {
  asChild?: boolean;
}

export const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} className={cn(liquidButtonVariants({ variant, size }), className)} {...props}>
        <span>{children}</span>
      </Comp>
    );
  },
);
LiquidButton.displayName = "LiquidButton";
