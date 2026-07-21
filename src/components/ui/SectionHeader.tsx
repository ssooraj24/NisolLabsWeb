import React from "react";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badgeText?: string;
  badgeVariant?: "golden" | "navy" | "emerald" | "outline";
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeader({
  badgeText,
  badgeVariant = "golden",
  title,
  subtitle,
  description,
  centered = true,
  theme = "light",
  className
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-3xl mb-12", centered && "mx-auto text-center", className)}>
      {badgeText && (
        <div className={cn("mb-3.5 inline-block", centered && "mx-auto")}>
          <Badge variant={badgeVariant}>{badgeText}</Badge>
        </div>
      )}
      
      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight",
          theme === "dark" ? "text-white" : "text-navy-950"
        )}
      >
        {title}{" "}
        {subtitle && (
          <span className="block mt-1 golden-gradient-text font-black">
            {subtitle}
          </span>
        )}
      </h2>

      {description && (
        <p
          className={cn(
            "text-base sm:text-lg leading-relaxed",
            theme === "dark" ? "text-navy-200" : "text-navy-700/90"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
