import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "../ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const SubmitButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, isLoading, title, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="size-6 text-foreground animate-spin" />
        ) : (
          title
        )}
      </button>
    );
  }
);
SubmitButton.displayName = "SubmitButton";

export { SubmitButton };
