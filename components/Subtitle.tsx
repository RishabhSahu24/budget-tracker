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
    primary: "text-white", // Primary text color for dark theme
    secondary: "text-gray-400", // Secondary text color for dark theme
    dark: "text-gray-300", // Slightly lighter than primary for dark mode
    light: "text-gray-200", // Lightest text color for dark theme
    warning: "text-yellow-500", // Warning color in dark theme
    black: "text-black", // This can be adjusted depending on the background
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
