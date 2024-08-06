import { cn } from "@/lib/utils";
import React from "react";

type HeadingProps = {
  level?: number;
  children?: React.ReactNode;
  variant?: "dark" | "light" | "primary" | "secondary" | "warning" | "black";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  className?: string;
  title?: string;
};

const Heading = ({
  level = 6,
  children,
  variant = "dark",
  size = "xs",
  className,
}: HeadingProps) => {
  const sizeToFontSize: Record<string, string> = {
    xs: "text-base", // h6
    sm: "text-lg", // h5
    md: "text-xl", // h4
    lg: "text-2xl", // h3
    xl: "text-4xl", // h2
    xxl: "text-6xl", // h1
  };

  const levelToFontWeight: Record<number, string> = {
    1: "font-extrabold", // h1
    2: "font-bold", // h2
    3: "font-semibold", // h3
    4: "font-medium", // h4
    5: "font-normal", // h5
    6: "font-light", // h6
  };

  // Ensure level is within range and convert to a string
  const computedLevel = Math.min(Math.max(level, 1), 6);
  const DynamicTag = `h${computedLevel}` as keyof JSX.IntrinsicElements;

  const headingVariant = {
    primary: "text-light-30",
    secondary: "text-black-500",
    dark: "text-black-800",
    light: "text-white",
    warning: "text-orange-500",
    black: "text-black",
  }[variant];

  const fontSizeClass = sizeToFontSize[size];
  const fontWeightClass = levelToFontWeight[computedLevel];

  return (
    <DynamicTag
      className={cn(
        `${fontSizeClass} ${fontWeightClass} ${headingVariant}`,
        className
      )}
    >
      {children}
    </DynamicTag>
  );
};

export default Heading;
