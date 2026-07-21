"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "navy" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  icon,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98]";

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5 shadow-md"
  };

  const variants = {
    primary: "bg-gradient-to-r from-golden-500 via-golden-600 to-golden-500 hover:from-golden-600 hover:to-golden-700 text-navy-950 font-bold shadow-sm golden-glow-sm hover:shadow-md border border-golden-400/50",
    secondary: "bg-navy-800 hover:bg-navy-900 text-white shadow-sm border border-navy-700",
    navy: "bg-navy-900 hover:bg-navy-950 text-golden-400 font-bold shadow-md border border-golden-500/30",
    outline: "border-2 border-navy-800 text-navy-900 hover:bg-navy-800 hover:text-white bg-transparent",
    ghost: "text-navy-800 hover:bg-navy-100/60 bg-transparent"
  };

  const content = (
    <>
      <span>{children}</span>
      {icon && <span className="transition-transform group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(baseStyles, sizes[size], variants[variant], "group", className)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={cn(baseStyles, sizes[size], variants[variant], "group", className)}
      {...props}
    >
      {content}
    </button>
  );
}
