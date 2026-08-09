"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, Unlock, FileCheck2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ZeroLockInGuarantee() {
  return (
    <section className="py-16 bg-navy-950 text-white relative overflow-hidden border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel-dark rounded-3xl p-8 sm:p-12 border border-golden-500/30 relative overflow-hidden">
          
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-golden-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-golden-500/20 text-golden-300 border border-golden-500/40 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero Lock-in Guarantee</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Your Strategy. Your Code. <span className="gradient-text-gold">Your Choice.</span>
              </h3>
              <p className="text-navy-200 text-sm sm:text-base leading-relaxed">
                Traditional consulting locks you into proprietary platforms and opaque codebases. Nisol AI guarantees complete intellectual property ownership, open data standards, and total execution freedom.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-200 font-semibold">
                  <Unlock className="w-4 h-4 text-golden-400 shrink-0" />
                  <span>100% Client IP Ownership</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200 font-semibold">
                  <FileCheck2 className="w-4 h-4 text-golden-400 shrink-0" />
                  <span>Full Code & Architecture Specs</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-golden-400 shrink-0" />
                  <span>Flexible Delivery Models</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
              <Button href="/contact?type=discovery-call" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Get Freedom Guaranteed
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
