import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import SubTitle from "../Subtitle";

const Input = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative mt-6 mb-2 flex items-center", className)}
    {...props}
  />
));
Input.displayName = "Input";

// export interface InputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {}
// 400
const InputBox = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type, disabledInput, ...props }, ref) => {
    return (
      <>
        <input
          id="floating_outlined"
          placeholder="name"
          type={type}
          className={cn(
            "peer w-full max-w-full min-h-12 border border-gray-200 rounded-md text-black-800 bg-secondary-50 placeholder:text-md placeholder:text-secondary-450 px-3 py-2 text-sm lg:text-md shadow-none focus-visible:outline-none",
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
InputBox.displayName = "InputBox";
export interface InputLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
  htmlFor?: string;
  iconSrc?: string;
  iconHeight?: number;
  iconWidth?: number;
}
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | undefined | null;
  disabledInput?: boolean | undefined | null;
}
export interface ErrorMessageProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

interface InputIconProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  height?: number;
  width?: number;
  svg?: boolean;
}

const InputIcon = React.forwardRef<HTMLDivElement, InputIconProps>(
  ({ className, height, width, src }, ref) => {
    return (
      <div ref={ref}>
        <Image
          src={src}
          alt=""
          height={height ?? 24}
          width={width ?? 24}
          className={className}
          priority
        />
      </div>
    );
  }
);
InputIcon.displayName = "InputIcon";

const InputLabel = React.forwardRef<HTMLLabelElement, InputLabelProps>(
  ({ className, label, htmlFor, iconSrc, iconHeight, iconWidth }, ref) => {
    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        className={cn("text-sm mb-1 text-black-800 font-semibold", className)}
      >
        {iconSrc && (
          <Image
            src={iconSrc}
            alt=""
            height={iconHeight ?? 24}
            width={iconWidth ?? 24}
            className="mr-2 hidden peer-placeholder-shown:block"
            priority
          />
        )}
        {label}
      </label>
    );
  }
);
InputLabel.displayName = "InputLabel";

const ErrorMessage = React.forwardRef<HTMLDivElement, ErrorMessageProps>(
  ({ error }, ref) => {
    return (
      <div className="flex items-center absolute -bottom-5 mt-1" ref={ref}>
        <Image
          src="/invalid.svg"
          alt="Error"
          height={16}
          width={16}
          className="mr-1"
          priority
        />
        <SubTitle variant="warning" size="xs">
          {error}
        </SubTitle>
      </div>
    );
  }
);
ErrorMessage.displayName = "ErrorMessage";

export { Input, InputBox, InputLabel, InputIcon, ErrorMessage };
