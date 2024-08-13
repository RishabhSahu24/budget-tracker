import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center gap-2.5 justify-center whitespace-nowrap max-w-full w-max lg:text-md text-xs font-semibold ring-offset-background transition-all duration-300 ease focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 rounded-md",
  {
    variants: {
      variant: {
        default: "bg-gray-800 text-white shadow hover:bg-gray-900",
        destructive: "bg-red-600 text-white shadow hover:bg-red-500",
        outline:
          "border border-gray-600 text-black shadow-sm hover:bg-gray-200",
        secondary: "bg-gray-700 text-white shadow-sm hover:bg-gray-600",
        ghost: "text-white hover:bg-gray-800",
        link: "text-blue-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  fullWidth?: boolean; // New prop to control full width
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, fullWidth = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), {
          "w-full": fullWidth,
        })}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
