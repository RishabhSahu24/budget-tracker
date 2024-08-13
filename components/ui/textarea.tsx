import * as React from "react";

import { cn } from "@/lib/utils";
import { ErrorMessage } from "./input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string | undefined | null;
  disabledInput?: boolean | undefined | null;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, disabledInput, ...props }, ref) => {
    return (
      <>
        <textarea
          className={cn(
            "flex w-full min-h-32 border border-gray-200 rounded-md text-sm text-black-800 bg-secondary-50 placeholder:text-md placeholder:text-transparent px-3 py-2",
            {
              "bg-secondary-50 border-secondary-200 placeholder:text-secondary-400":
                disabledInput,
            },
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <ErrorMessage error={error} />}
      </>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
