"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  ArrowRight,
  LogIn
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState("SEPTEMBER");
  const pathname = usePathname();

  useEffect(() => {
    try {
      const month = new Date().toLocaleString("en-US", { month: "long" }).toUpperCase();
      if (month) setCurrentMonth(month);
    } catch {
      // Fallback to default
    }

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0C1731]/95 backdrop-blur-md border-b border-navy-800/90 py-1.5 shadow-2xl"
          : "bg-[#0C1731]/90 backdrop-blur-sm border-b border-white/10 py-2"
      )}
    >
      {/* Sticky Scarcity Ticker */}
      <div className="bg-[#101D3D] text-golden-300 border-b border-golden-500/20 py-1 px-4 text-center text-[11px] sm:text-xs font-semibold tracking-wider flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-golden-400 animate-pulse" />
        <span>{currentMonth}: 2/5 NISOL 360™ LEFT — We architect only 5 per month. No build dependency.</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-1.5">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <img 
              src="/images/nisol-core-logo.png" 
              alt="nisolai - The Core of Intelligence" 
              className="h-9 md:h-11 w-auto object-contain transition-all group-hover:scale-[1.02]" 
            />
          </Link>

          {/* TBWA Iconic Navigation Links (4 Ruthlessly Curated Flagship Anchors) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-3">
            
            <Link
              href="/how-it-works"
              className={cn(
                "px-3.5 py-2 text-sm font-semibold rounded-lg transition-all tracking-wide",
                pathname === "/how-it-works"
                  ? "text-golden-400 bg-white/10 font-bold"
                  : "text-slate-200 hover:text-white hover:bg-white/5"
              )}
            >
              How It Works
            </Link>

            <Link
              href="/blueprint"
              className={cn(
                "px-3.5 py-2 text-sm font-semibold rounded-lg transition-all tracking-wide flex items-center gap-1.5",
                pathname === "/blueprint" || pathname.startsWith("/discovery")
                  ? "text-golden-400 bg-white/10 font-bold"
                  : "text-slate-200 hover:text-white hover:bg-white/5"
              )}
            >
              <span>NISOL 360™</span>
              <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-golden-500/20 text-golden-300 border border-golden-500/30">
                FLAGSHIP
              </span>
            </Link>

            <Link
              href="/score"
              className={cn(
                "px-3.5 py-2 text-sm font-semibold rounded-lg transition-all tracking-wide",
                pathname === "/score"
                  ? "text-golden-400 bg-white/10 font-bold"
                  : "text-slate-200 hover:text-white hover:bg-white/5"
              )}
            >
              NISOL SCORE™
            </Link>

            <Link
              href="/about"
              className={cn(
                "px-3.5 py-2 text-sm font-semibold rounded-lg transition-all tracking-wide",
                pathname === "/about"
                  ? "text-golden-400 bg-white/10 font-bold"
                  : "text-slate-200 hover:text-white hover:bg-white/5"
              )}
            >
              About
            </Link>
          </nav>

          {/* Action CTAs: Log In (Secondary) & Apply for Nisol 360™ (Primary CTA) */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href={process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/login` : "/login"}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-navy-900/80 hover:bg-navy-800 border border-navy-700/80 hover:border-golden-500/40 rounded-lg transition-all shadow-sm active:scale-[0.98]"
            >
              <LogIn className="w-3.5 h-3.5 text-golden-400" />
              <span>Log In</span>
            </Link>
            <Button href="/contact" variant="primary" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
              Apply for Nisol 360™
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-navy-900 border border-navy-700 text-slate-200 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (TBWA Streamlined Format) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[#0C1731]/98 backdrop-blur-2xl border-b border-navy-800 p-6 shadow-2xl max-h-[85vh] overflow-y-auto z-50">
          <div className="flex flex-col gap-2">
            
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "px-4 py-3 rounded-lg text-sm font-semibold transition-colors",
                pathname === "/" ? "bg-white/10 text-golden-400" : "text-slate-200 hover:bg-navy-900"
              )}
            >
              Home
            </Link>

            <Link
              href="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "px-4 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between",
                pathname === "/how-it-works" ? "bg-white/10 text-golden-400" : "text-slate-200 hover:bg-navy-900"
              )}
            >
              <span>How It Works</span>
              <span className="text-[10px] font-mono text-slate-400">7-Day Sprint</span>
            </Link>

            <Link
              href="/blueprint"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "px-4 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between",
                pathname === "/blueprint" ? "bg-white/10 text-golden-400" : "text-slate-200 hover:bg-navy-900"
              )}
            >
              <div className="flex items-center gap-2">
                <span>NISOL 360™</span>
                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-golden-500 text-navy-950">FLAGSHIP</span>
              </div>
              <span className="text-[10px] font-mono text-golden-400">Product Spec</span>
            </Link>

            <Link
              href="/score"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "px-4 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between",
                pathname === "/score" ? "bg-white/10 text-golden-400" : "text-slate-200 hover:bg-navy-900"
              )}
            >
              <span>NISOL SCORE™</span>
              <span className="text-[10px] font-mono text-slate-400">Benchmark</span>
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "px-4 py-3 rounded-lg text-sm font-semibold transition-colors",
                pathname === "/about" ? "bg-white/10 text-golden-400" : "text-slate-200 hover:bg-navy-900"
              )}
            >
              About
            </Link>

            <div className="pt-4 mt-2 border-t border-navy-800 flex flex-col gap-3">
              <Link
                href={process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/login` : "/login"}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-center text-slate-300 hover:text-white bg-navy-900 border border-navy-800"
              >
                Client Portal Log In
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-black text-center text-navy-950 bg-golden-400 hover:bg-golden-300 shadow-lg"
              >
                Apply for Nisol 360™ →
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
