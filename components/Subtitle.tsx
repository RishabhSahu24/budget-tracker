import { cn } from "@/lib/utils";
import React from "react";

type SubtitleProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  variant?: "dark" | "light" | "primary" | "secondary" | "warning" | "black";
  className?: string;
  children?: React.ReactNode;
  title?: string;
};

const Subtitle = ({
  size = "xs",
  variant = "dark",
  className,
  children,
  title,
}: SubtitleProps) => {
  const sizeToFontSize: Record<string, string> = {
    xs: "text-sm", // Smallest size
    sm: "text-base", // Small
    md: "text-lg", // Medium
    lg: "text-xl", // Large
    xl: "text-2xl", // Extra Large
    xxl: "text-3xl", // Extra Extra Large
  };

  const subtitleVariant = {
    primary: "text-black-500",
    secondary: "text-black-500",
    dark: "text-primary-800",
    light: "text-white",
    warning: "text-orange-500",
    black: "text-black",
  }[variant];

  const fontSizeClass = sizeToFontSize[size];

  return (
    <p
      className={cn(`${fontSizeClass} ${subtitleVariant}`, className)}
      title={title}
    >
      {children}
    </p>
  );
};

export default Subtitle;
