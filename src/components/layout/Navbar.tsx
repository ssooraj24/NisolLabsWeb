"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Bot, 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles, 
  Calculator, 
  BookOpen, 
  Layers, 
  ArrowRight,
  Cpu,
  Compass,
  MessageSquareCode,
  Zap,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesHover, setServicesHover] = useState(false);
  const [resourcesHover, setResourcesHover] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
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

  const serviceLinks = [
    { name: "Autonomous AI Agents", href: "/services/agents", badge: "FLAGSHIP", icon: Bot },
    { name: "AI Engineering & DevOps", href: "/services/engineering", badge: "DIFFERENTIATOR", icon: Cpu },
    { name: "AI Strategy & Discovery", href: "/services/strategy", icon: Compass },
    { name: "Enterprise AI Assistants", href: "/services/assistants", icon: MessageSquareCode },
    { name: "AI-Powered Automation", href: "/services/automation", icon: Zap },
    { name: "Data Readiness for AI", href: "/services/data-readiness", icon: Database },
  ];

  const resourceLinks = [
    { name: "ROI Calculator", href: "/resources/roi-calculator", badge: "INTERACTIVE", icon: Calculator },
    { name: "Solution Blueprints", href: "/resources#blueprints", icon: Layers },
    { name: "AI Playbooks", href: "/resources#playbooks", icon: BookOpen },
    { name: "Illustrative Case Studies", href: "/resources#case-studies", icon: Sparkles },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-navy-950/90 backdrop-blur-md border-b border-navy-800/80 py-3 shadow-xl"
          : "bg-navy-950/60 backdrop-blur-sm border-b border-white/10 py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-800 via-navy-900 to-golden-600 p-0.5 shadow-md group-hover:shadow-golden-500/20 transition-all">
              <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-golden-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                NISOL <span className="golden-gradient-text">LABS</span>
              </span>
              <span className="block text-[10px] font-semibold tracking-wider uppercase text-navy-300">
                The Core of Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              href="/"
              className={cn(
                "px-3.5 py-2 text-sm font-semibold rounded-lg transition-all",
                pathname === "/" ? "text-golden-400 bg-white/5" : "text-slate-200 hover:text-white hover:bg-white/5"
              )}
            >
              Home
            </Link>

            {/* Services Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesHover(true)}
              onMouseLeave={() => setServicesHover(false)}
            >
              <Link
                href="/services"
                className={cn(
                  "px-3.5 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5",
                  pathname.startsWith("/services") ? "text-golden-400 bg-white/5" : "text-slate-200 hover:text-white hover:bg-white/5"
                )}
              >
                Services
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", servicesHover && "rotate-180")} />
              </Link>

              {servicesHover && (
                <div className="absolute top-full left-0 w-80 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="glass-panel-dark rounded-xl p-3 shadow-2xl border border-navy-700/80">
                    <div className="text-[11px] font-bold tracking-wider text-golden-400 uppercase px-3 py-1.5 mb-1 border-b border-navy-800">
                      Core Pillars
                    </div>
                    {serviceLinks.map((item) => {
                      const IconComp = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center justify-between p-2.5 rounded-lg hover:bg-navy-800/80 text-slate-200 hover:text-white transition-colors group"
                        >
                          <div className="flex items-center gap-2.5">
                            <IconComp className="w-4 h-4 text-golden-400 group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-medium">{item.name}</span>
                          </div>
                          {item.badge && (
                            <span
                              className={cn(
                                "text-[9px] font-extrabold px-1.5 py-0.5 rounded",
                                item.badge === "FLAGSHIP" ? "bg-golden-500 text-navy-950" : "bg-navy-700 text-golden-300"
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                    <div className="mt-2 pt-2 border-t border-navy-800">
                      <Link
                        href="/services"
                        className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-golden-400 hover:text-golden-300 transition-colors"
                      >
                        <span>Explore All Services</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/industries"
              className={cn(
                "px-3.5 py-2 text-sm font-semibold rounded-lg transition-all",
                pathname === "/industries" ? "text-golden-400 bg-white/5" : "text-slate-200 hover:text-white hover:bg-white/5"
              )}
            >
              Industries
            </Link>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setResourcesHover(true)}
              onMouseLeave={() => setResourcesHover(false)}
            >
              <Link
                href="/resources"
                className={cn(
                  "px-3.5 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5",
                  pathname.startsWith("/resources") ? "text-golden-400 bg-white/5" : "text-slate-200 hover:text-white hover:bg-white/5"
                )}
              >
                Resources
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", resourcesHover && "rotate-180")} />
              </Link>

              {resourcesHover && (
                <div className="absolute top-full left-0 w-72 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="glass-panel-dark rounded-xl p-3 shadow-2xl border border-navy-700/80">
                    <div className="text-[11px] font-bold tracking-wider text-golden-400 uppercase px-3 py-1.5 mb-1 border-b border-navy-800">
                      Knowledge & Tools
                    </div>
                    {resourceLinks.map((item) => {
                      const IconComp = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center justify-between p-2.5 rounded-lg hover:bg-navy-800/80 text-slate-200 hover:text-white transition-colors group"
                        >
                          <div className="flex items-center gap-2.5">
                            <IconComp className="w-4 h-4 text-golden-400 group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-medium">{item.name}</span>
                          </div>
                          {item.badge && (
                            <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={cn(
                "px-3.5 py-2 text-sm font-semibold rounded-lg transition-all",
                pathname === "/about" ? "text-golden-400 bg-white/5" : "text-slate-200 hover:text-white hover:bg-white/5"
              )}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={cn(
                "px-3.5 py-2 text-sm font-semibold rounded-lg transition-all",
                pathname === "/contact" ? "text-golden-400 bg-white/5" : "text-slate-200 hover:text-white hover:bg-white/5"
              )}
            >
              Contact
            </Link>
          </nav>

          {/* Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Button href="/resources/roi-calculator" variant="outline" size="sm" className="border-golden-500/40 text-golden-300 hover:bg-golden-500/10 hover:text-golden-200">
              <Calculator className="w-3.5 h-3.5 mr-1" />
              ROI Calculator
            </Button>
            <Button href="/contact" variant="primary" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
              Book Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-navy-900 border border-navy-700 text-slate-200 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-navy-950/95 backdrop-blur-xl border-b border-navy-800 p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg bg-navy-900/60 text-white font-semibold text-sm"
            >
              Home
            </Link>

            <div className="space-y-1">
              <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-golden-400">
                Services
              </div>
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-6 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-navy-900/80"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <Link
              href="/industries"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg bg-navy-900/60 text-white font-semibold text-sm"
            >
              Industries
            </Link>

            <div className="space-y-1">
              <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-golden-400">
                Resources
              </div>
              {resourceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-6 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-navy-900/80"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg bg-navy-900/60 text-white font-semibold text-sm"
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg bg-navy-900/60 text-white font-semibold text-sm"
            >
              Contact
            </Link>

            <div className="pt-4 flex flex-col gap-2 border-t border-navy-800">
              <Button href="/resources/roi-calculator" variant="outline" size="md" className="w-full justify-center">
                Calculate AI ROI
              </Button>
              <Button href="/contact" variant="primary" size="md" className="w-full justify-center">
                Book AI Strategy Call
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
