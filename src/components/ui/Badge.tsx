import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "navy" | "golden" | "emerald" | "outline";
  className?: string;
}

export function Badge({ children, variant = "golden", className }: BadgeProps) {
  const variants = {
    golden: "bg-golden-100 text-golden-800 border border-golden-300 font-semibold",
    navy: "bg-navy-100 text-navy-800 border border-navy-300 font-semibold",
    emerald: "bg-emerald-50 text-emerald-700 border border-emerald-300 font-semibold",
    outline: "border border-navy-300 text-navy-700 bg-white/50 backdrop-blur-sm font-medium"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all shadow-xs",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
