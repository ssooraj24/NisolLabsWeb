"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { 
  DISCOVERY_MENU, 
  SOLUTIONS_MENU, 
  INDUSTRIES_MENU, 
  RESOURCES_MENU, 
  COMPANY_MENU 
} from "@/data/navData";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
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

  const toggleMobileAccordion = (sectionKey: string) => {
    setMobileExpandedSection(mobileExpandedSection === sectionKey ? null : sectionKey);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-navy-950/95 backdrop-blur-md border-b border-navy-800/90 py-2.5 shadow-2xl"
          : "bg-navy-950/70 backdrop-blur-sm border-b border-white/10 py-3.5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img 
              src="/NisolAI-Logo-R.png" 
              alt="Nisol AI Logo" 
              className="h-12 md:h-14 w-auto object-contain transition-all group-hover:scale-[1.02] rounded" 
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              href="/"
              className={cn(
                "px-3 py-2 text-sm font-semibold rounded-lg transition-all",
                pathname === "/" ? "text-golden-400 bg-white/5" : "text-slate-200 hover:text-white hover:bg-white/5"
              )}
            >
              Home
            </Link>

            {/* 1. DISCOVERY DROPDOWN (FLAGSHIP) */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("discovery")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/discovery"
                className={cn(
                  "px-3 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5",
                  activeDropdown === "discovery" || pathname.startsWith("/discovery") ? "text-golden-400 bg-white/5" : "text-slate-200 hover:text-white hover:bg-white/5"
                )}
              >
                <span>Discovery</span>
                <span className="text-[9px] font-extrabold px-1 py-0.2 rounded bg-golden-500/20 text-golden-300 border border-golden-500/30">FLAGSHIP</span>
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", activeDropdown === "discovery" && "rotate-180")} />
              </Link>

              {activeDropdown === "discovery" && (
                <div className="absolute top-full left-0 w-96 pt-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div className="glass-panel-dark rounded-xl p-3 shadow-2xl border border-navy-700/80">
                    <div className="text-[11px] font-bold tracking-wider text-golden-400 uppercase px-3 py-1.5 mb-1 border-b border-navy-800 flex items-center justify-between">
                      <span>{DISCOVERY_MENU.title}</span>
                      <Sparkles className="w-3.5 h-3.5 text-golden-400" />
                    </div>
                    <div className="space-y-0.5 max-h-[70vh] overflow-y-auto">
                      {DISCOVERY_MENU.items.map((item) => {
                        const IconComp = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-navy-800/80 text-slate-200 hover:text-white transition-colors group"
                          >
                            <div className="p-1.5 rounded-md bg-navy-900 border border-navy-700/80 text-golden-400 group-hover:border-golden-400/50 shrink-0 mt-0.5">
                              <IconComp className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-white group-hover:text-golden-300">{item.name}</span>
                                {item.badge && (
                                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-golden-500 text-navy-950 ml-2 shrink-0">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              {item.description && (
                                <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 leading-snug">{item.description}</p>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. SOLUTIONS DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("solutions")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/services"
                className={cn(
                  "px-3 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5",
                  activeDropdown === "solutions" || pathname.startsWith("/services") ? "text-golden-400 bg-white/5" : "text-slate-200 hover:text-white hover:bg-white/5"
                )}
              >
                <span>Solutions</span>
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", activeDropdown === "solutions" && "rotate-180")} />
              </Link>

              {activeDropdown === "solutions" && (
                <div className="absolute top-full left-0 w-84 pt-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div className="glass-panel-dark rounded-xl p-3 shadow-2xl border border-navy-700/80">
                    <div className="text-[11px] font-bold tracking-wider text-golden-400 uppercase px-3 py-1.5 mb-1 border-b border-navy-800">
                      {SOLUTIONS_MENU.title}
                    </div>
                    <div className="space-y-0.5">
                      {SOLUTIONS_MENU.items.map((item) => {
                        const IconComp = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center justify-between p-2.5 rounded-lg hover:bg-navy-800/80 text-slate-200 hover:text-white transition-colors group"
                          >
                            <div className="flex items-center gap-2.5">
                              <IconComp className="w-4 h-4 text-golden-400 group-hover:scale-110 transition-transform shrink-0" />
                              <span className="text-xs font-medium text-slate-200 group-hover:text-white">{item.name}</span>
                            </div>
                            {item.badge && (
                              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-navy-700 text-golden-300 border border-golden-500/30 shrink-0">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                      <div className="mt-2 pt-2 border-t border-navy-800">
                        <Link
                          href="/services"
                          className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-golden-400 hover:text-golden-300 transition-colors"
                        >
                          <span>Explore All Solutions</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. INDUSTRIES DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("industries")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/industries"
                className={cn(
                  "px-3 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5",
                  activeDropdown === "industries" || pathname === "/industries" ? "text-golden-400 bg-white/5" : "text-slate-200 hover:text-white hover:bg-white/5"
                )}
              >
                <span>Industries</span>
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", activeDropdown === "industries" && "rotate-180")} />
              </Link>

              {activeDropdown === "industries" && (
                <div className="absolute top-full left-0 w-72 pt-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div className="glass-panel-dark rounded-xl p-3 shadow-2xl border border-navy-700/80">
                    <div className="text-[11px] font-bold tracking-wider text-golden-400 uppercase px-3 py-1.5 mb-1 border-b border-navy-800">
                      {INDUSTRIES_MENU.title}
                    </div>
                    <div className="space-y-0.5">
                      {INDUSTRIES_MENU.items.map((item) => {
                        const IconComp = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-navy-800/80 text-slate-200 hover:text-white transition-colors group"
                          >
                            <IconComp className="w-4 h-4 text-golden-400 group-hover:scale-110 transition-transform shrink-0" />
                            <span className="text-xs font-medium text-slate-200 group-hover:text-white">{item.name}</span>
                          </Link>
                        );
                      })}
                      <div className="mt-2 pt-2 border-t border-navy-800">
                        <Link
                          href="/industries"
                          className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-golden-400 hover:text-golden-300 transition-colors"
                        >
                          <span>View All Industry Solutions</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. RESOURCES DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("resources")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/resources"
                className={cn(
                  "px-3 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5",
                  activeDropdown === "resources" || pathname.startsWith("/resources") ? "text-golden-400 bg-white/5" : "text-slate-200 hover:text-white hover:bg-white/5"
                )}
              >
                <span>Resources</span>
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", activeDropdown === "resources" && "rotate-180")} />
              </Link>

              {activeDropdown === "resources" && (
                <div className="absolute top-full left-0 w-72 pt-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div className="glass-panel-dark rounded-xl p-3 shadow-2xl border border-navy-700/80">
                    <div className="text-[11px] font-bold tracking-wider text-golden-400 uppercase px-3 py-1.5 mb-1 border-b border-navy-800">
                      {RESOURCES_MENU.title}
                    </div>
                    <div className="space-y-0.5">
                      {RESOURCES_MENU.items.map((item) => {
                        const IconComp = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center justify-between p-2.5 rounded-lg hover:bg-navy-800/80 text-slate-200 hover:text-white transition-colors group"
                          >
                            <div className="flex items-center gap-2.5">
                              <IconComp className="w-4 h-4 text-golden-400 group-hover:scale-110 transition-transform shrink-0" />
                              <span className="text-xs font-medium text-slate-200 group-hover:text-white">{item.name}</span>
                            </div>
                            {item.badge && (
                              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 5. COMPANY DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("company")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/about"
                className={cn(
                  "px-3 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5",
                  activeDropdown === "company" || pathname === "/about" ? "text-golden-400 bg-white/5" : "text-slate-200 hover:text-white hover:bg-white/5"
                )}
              >
                <span>Company</span>
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", activeDropdown === "company" && "rotate-180")} />
              </Link>

              {activeDropdown === "company" && (
                <div className="absolute top-full left-0 w-64 pt-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div className="glass-panel-dark rounded-xl p-3 shadow-2xl border border-navy-700/80">
                    <div className="text-[11px] font-bold tracking-wider text-golden-400 uppercase px-3 py-1.5 mb-1 border-b border-navy-800">
                      {COMPANY_MENU.title}
                    </div>
                    <div className="space-y-0.5">
                      {COMPANY_MENU.items.map((item) => {
                        const IconComp = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-navy-800/80 text-slate-200 hover:text-white transition-colors group"
                          >
                            <IconComp className="w-4 h-4 text-golden-400 group-hover:scale-110 transition-transform shrink-0" />
                            <span className="text-xs font-medium text-slate-200 group-hover:text-white">{item.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Link */}
            <Link
              href="/contact"
              className={cn(
                "px-3 py-2 text-sm font-semibold rounded-lg transition-all",
                pathname === "/contact" ? "text-golden-400 bg-white/5" : "text-slate-200 hover:text-white hover:bg-white/5"
              )}
            >
              Contact
            </Link>
          </nav>

          {/* Action CTA: Single Primary CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Button href="/contact?type=discovery-call" variant="primary" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
              Book Discovery Call
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
        <div className="lg:hidden fixed inset-x-0 top-full bg-navy-950/95 backdrop-blur-xl border-b border-navy-800 p-6 shadow-2xl max-h-[85vh] overflow-y-auto z-50">
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg bg-navy-900/60 text-white font-semibold text-sm"
            >
              Home
            </Link>

            {/* Mobile Accordion: Discovery */}
            <div className="rounded-lg bg-navy-900/40 border border-navy-800/80 overflow-hidden">
              <button
                onClick={() => toggleMobileAccordion("discovery")}
                className="w-full px-4 py-3 text-left font-semibold text-sm text-golden-400 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span>Discovery</span>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-golden-500 text-navy-950">FLAGSHIP</span>
                </div>
                <ChevronDown className={cn("w-4 h-4 transition-transform", mobileExpandedSection === "discovery" && "rotate-180")} />
              </button>
              {mobileExpandedSection === "discovery" && (
                <div className="px-4 pb-3 space-y-1 pt-1 border-t border-navy-800/60">
                  {DISCOVERY_MENU.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 px-3 rounded text-xs font-medium text-slate-300 hover:text-white hover:bg-navy-800/60"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Accordion: Solutions */}
            <div className="rounded-lg bg-navy-900/40 border border-navy-800/80 overflow-hidden">
              <button
                onClick={() => toggleMobileAccordion("solutions")}
                className="w-full px-4 py-3 text-left font-semibold text-sm text-slate-200 flex items-center justify-between"
              >
                <span>Solutions</span>
                <ChevronDown className={cn("w-4 h-4 transition-transform", mobileExpandedSection === "solutions" && "rotate-180")} />
              </button>
              {mobileExpandedSection === "solutions" && (
                <div className="px-4 pb-3 space-y-1 pt-1 border-t border-navy-800/60">
                  {SOLUTIONS_MENU.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 px-3 rounded text-xs font-medium text-slate-300 hover:text-white hover:bg-navy-800/60"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Accordion: Industries */}
            <div className="rounded-lg bg-navy-900/40 border border-navy-800/80 overflow-hidden">
              <button
                onClick={() => toggleMobileAccordion("industries")}
                className="w-full px-4 py-3 text-left font-semibold text-sm text-slate-200 flex items-center justify-between"
              >
                <span>Industries</span>
                <ChevronDown className={cn("w-4 h-4 transition-transform", mobileExpandedSection === "industries" && "rotate-180")} />
              </button>
              {mobileExpandedSection === "industries" && (
                <div className="px-4 pb-3 space-y-1 pt-1 border-t border-navy-800/60">
                  {INDUSTRIES_MENU.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 px-3 rounded text-xs font-medium text-slate-300 hover:text-white hover:bg-navy-800/60"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Accordion: Resources */}
            <div className="rounded-lg bg-navy-900/40 border border-navy-800/80 overflow-hidden">
              <button
                onClick={() => toggleMobileAccordion("resources")}
                className="w-full px-4 py-3 text-left font-semibold text-sm text-slate-200 flex items-center justify-between"
              >
                <span>Resources</span>
                <ChevronDown className={cn("w-4 h-4 transition-transform", mobileExpandedSection === "resources" && "rotate-180")} />
              </button>
              {mobileExpandedSection === "resources" && (
                <div className="px-4 pb-3 space-y-1 pt-1 border-t border-navy-800/60">
                  {RESOURCES_MENU.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 px-3 rounded text-xs font-medium text-slate-300 hover:text-white hover:bg-navy-800/60"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Accordion: Company */}
            <div className="rounded-lg bg-navy-900/40 border border-navy-800/80 overflow-hidden">
              <button
                onClick={() => toggleMobileAccordion("company")}
                className="w-full px-4 py-3 text-left font-semibold text-sm text-slate-200 flex items-center justify-between"
              >
                <span>Company</span>
                <ChevronDown className={cn("w-4 h-4 transition-transform", mobileExpandedSection === "company" && "rotate-180")} />
              </button>
              {mobileExpandedSection === "company" && (
                <div className="px-4 pb-3 space-y-1 pt-1 border-t border-navy-800/60">
                  {COMPANY_MENU.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 px-3 rounded text-xs font-medium text-slate-300 hover:text-white hover:bg-navy-800/60"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg bg-navy-900/60 text-white font-semibold text-sm"
            >
              Contact
            </Link>

            <div className="pt-4 border-t border-navy-800">
              <Button href="/contact?type=discovery-call" variant="primary" size="md" className="w-full justify-center">
                Book Discovery Call
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
