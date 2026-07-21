import React from "react";
import Link from "next/link";
import { Bot, ArrowRight, ShieldCheck, Mail, MapPin, Globe } from "lucide-react";
import { COMPANY } from "@/data/company";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-800/80 pt-16 pb-12 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-golden-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-800 via-navy-900 to-golden-600 p-0.5 shadow-md">
                <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-golden-400" />
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

            <p className="text-sm text-navy-200/80 leading-relaxed max-w-sm">
              {COMPANY.vision} Enterprise-grade AI Strategy, Autonomous Multi-Agent Orchestration, LLMOps, and Intelligent Document Processing.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs font-semibold text-golden-400">
              <div className="flex items-center gap-1.5 bg-navy-900/90 px-3 py-1.5 rounded-lg border border-navy-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Enterprise SOC-2 Security Ready</span>
              </div>
            </div>
          </div>

          {/* Quick Links: Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-golden-400 mb-4">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-300">
              <li>
                <Link href="/services/agents" className="hover:text-golden-300 transition-colors flex items-center gap-1">
                  <span>Autonomous AI Agents</span>
                  <span className="text-[9px] bg-golden-500/20 text-golden-300 px-1 rounded">FLAGSHIP</span>
                </Link>
              </li>
              <li>
                <Link href="/services/engineering" className="hover:text-golden-300 transition-colors">
                  AI Engineering & DevOps
                </Link>
              </li>
              <li>
                <Link href="/services/strategy" className="hover:text-golden-300 transition-colors">
                  AI Strategy & Discovery
                </Link>
              </li>
              <li>
                <Link href="/services/assistants" className="hover:text-golden-300 transition-colors">
                  Enterprise AI Assistants
                </Link>
              </li>
              <li>
                <Link href="/services/automation" className="hover:text-golden-300 transition-colors">
                  AI-Powered Automation
                </Link>
              </li>
              <li>
                <Link href="/services/data-readiness" className="hover:text-golden-300 transition-colors">
                  Data Readiness for AI
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links: Resources & Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-golden-400 mb-4">
              Resources & Tools
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-300">
              <li>
                <Link href="/resources/roi-calculator" className="text-golden-400 hover:text-golden-300 transition-colors font-bold">
                  Interactive AI ROI Calculator
                </Link>
              </li>
              <li>
                <Link href="/resources#blueprints" className="hover:text-golden-300 transition-colors">
                  Solution Blueprints (5)
                </Link>
              </li>
              <li>
                <Link href="/resources#playbooks" className="hover:text-golden-300 transition-colors">
                  Enterprise AI Playbooks (6)
                </Link>
              </li>
              <li>
                <Link href="/resources#case-studies" className="hover:text-golden-300 transition-colors">
                  Illustrative Case Studies (7)
                </Link>
              </li>
              <li>
                <Link href="/resources#architecture" className="hover:text-golden-300 transition-colors">
                  Enterprise Reference Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-golden-400 mb-4">
              Organization
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-300 mb-6">
              <li>
                <Link href="/about" className="hover:text-golden-300 transition-colors">
                  About & Leadership
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-golden-300 transition-colors">
                  Industries We Serve
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-golden-300 transition-colors">
                  Book AI Discovery Call
                </Link>
              </li>
            </ul>

            <div className="space-y-2 text-xs text-navy-200/80">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-golden-400" />
                <span>contact@nisollabs.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-golden-400" />
                <span>www.nisollabs.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-navy-300">
          <div>
            © {new Date().getFullYear()} Nisol Labs. All rights reserved. The Core of Intelligence.
          </div>

          <div className="flex items-center gap-6 font-medium">
            <Link href="/contact" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Security & Compliance
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
