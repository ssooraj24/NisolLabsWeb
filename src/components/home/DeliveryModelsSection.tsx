"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DELIVERY_MODELS, DeliveryModel } from "@/data/deliveryModels";
import { Wrench, ClipboardCheck, Eye, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

const iconMap = {
  Wrench: Wrench,
  ClipboardCheck: ClipboardCheck,
  Eye: Eye
};

export function DeliveryModelsSection() {
  const [selectedModelId, setSelectedModelId] = useState<string>("build");

  return (
    <section className="py-20 bg-navy-950 text-white relative overflow-hidden border-t border-navy-800/80">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-golden-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-golden-500/10 border border-golden-500/30 text-golden-300 text-xs font-bold uppercase tracking-wider mb-4">
            <span>Flexible Engagement Choice</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
            Your AI Transformation, <span className="gradient-text-gold">Your Way.</span>
          </h2>
          <p className="text-navy-200 text-base sm:text-lg leading-relaxed">
            We don't lock you into a single delivery model. Following the Nisol Discovery™ phase, you choose how to execute based on your internal capabilities.
          </p>
        </div>

        {/* 3 Model Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {DELIVERY_MODELS.map((model) => {
            const IconComp = iconMap[model.iconName as keyof typeof iconMap] || Wrench;
            const isSelected = selectedModelId === model.id;

            return (
              <div
                key={model.id}
                onClick={() => setSelectedModelId(model.id)}
                className={`glass-panel-dark rounded-2xl p-6 sm:p-8 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                  isSelected
                    ? "border-golden-400/80 shadow-[0_0_30px_rgba(235,180,75,0.15)] bg-navy-900/90"
                    : "border-navy-800 hover:border-navy-700 bg-navy-900/40"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-navy-950 border border-navy-800 text-golden-400">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-golden-500/20 text-golden-300 border border-golden-500/30">
                      {model.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{model.title}</h3>
                  <p className="text-xs font-semibold text-golden-400 mb-4">{model.tagline}</p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">{model.description}</p>

                  <div className="mb-6 p-3.5 rounded-xl bg-navy-950/60 border border-navy-800">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-golden-300 block mb-1">
                      Best For:
                    </span>
                    <p className="text-xs text-slate-300 leading-snug">{model.bestFor}</p>
                  </div>

                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Key Deliverables:</h4>
                  <ul className="space-y-2 mb-6">
                    {model.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-golden-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-navy-800">
                  <Button
                    href="/contact?type=discovery-call"
                    variant={isSelected ? "primary" : "outline"}
                    size="sm"
                    className="w-full justify-center"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Discuss {model.title.split(":")[1]} Model
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Zero Lock-in Banner */}
        <div className="p-6 rounded-2xl glass-panel-dark border border-golden-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-golden-500/20 text-golden-300 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Guaranteed Zero Vendor Lock-in</h4>
              <p className="text-xs text-navy-200 mt-0.5">
                Your transformation strategy, architecture, and code are 100% yours. Build with us, manage with us, or monitor with us.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 shrink-0 flex items-center gap-2"
          >
            <span>Learn About Delivery Freedom</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
