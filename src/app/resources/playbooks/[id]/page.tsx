import React from "react";
import { notFound } from "next/navigation";
import { PLAYBOOKS } from "@/data/resources";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2 } from "lucide-react";

export async function generateStaticParams() {
  return PLAYBOOKS.map((pb) => ({ id: pb.id }));
}

export default function PlaybookDetail({ params }: { params: { id: string } }) {
  const playbook = PLAYBOOKS.find((pb) => pb.id === params.id);
  
  if (!playbook) {
    notFound();
  }

    return (
      <div className="flex gap-8">
        {/* Sticky Sidebar Navigation */}
        <nav className="hidden lg:block w-48 sticky top-24 h-fit">
          <ul className="space-y-2 text-sm">
            <li><a href="#overview" className="text-navy-600 hover:text-navy-900">Overview</a></li>
            <li><a href="#challenges" className="text-navy-600 hover:text-navy-900">Industry Challenges</a></li>
            <li><a href="#opportunities" className="text-navy-600 hover:text-navy-900">AI Opportunities</a></li>
            <li><a href="#solutions" className="text-navy-600 hover:text-navy-900">Featured Solutions</a></li>
            <li><a href="#journey" className="text-navy-600 hover:text-navy-900">AI Maturity Journey</a></li>
            <li><a href="#roadmap" className="text-navy-600 hover:text-navy-900">Transformation Roadmap</a></li>
            <li><a href="#benefits" className="text-navy-600 hover:text-navy-900">Business Benefits</a></li>
            <li><a href="#services" className="text-navy-600 hover:text-navy-900">Recommended Services</a></li>
            <li><a href="#faq" className="text-navy-600 hover:text-navy-900">FAQ</a></li>
            <li><a href="#cta" className="text-navy-600 hover:text-navy-900 font-bold">Book Workshop</a></li>
          </ul>
        </nav>

        {/* Main Content */}
        <article className="flex-1 max-w-4xl mx-auto py-12 space-y-12">
          {/* Hero */}
          <section id="overview" className="relative rounded-xl overflow-hidden">
            <img src={detail.heroImage} alt={`${playbook.title} hero`} className="w-full h-64 object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex flex-col justify-end p-6">
              <Badge variant="golden" className="mb-2">{playbook.category}</Badge>
              <h1 className="text-4xl font-bold text-white mb-2">{playbook.title}</h1>
              <p className="text-lg text-white mb-4">{detail.purpose}</p>
              <a href="/contact" className="inline-block bg-golden-600 text-white px-6 py-3 rounded-full hover:bg-golden-700 transition-colors">
                Book AI Discovery Workshop
              </a>
            </div>
          </section>

          {/* Why This Playbook */}
          <section id="why" className="space-y-4">
            <h2 className="text-2xl font-semibold text-navy-950">Why This Playbook</h2>
            <p className="text-base text-navy-700">{detail.purpose}</p>
          </section>

          {/* Challenges */}
          <section id="challenges" className="space-y-4">
            <h2 className="text-2xl font-semibold text-navy-950">Industry Challenges</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {detail.challenges.map((c, i) => (
                <div key={i} className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 shadow-sm text-center text-navy-800">
                  {c}
                </div>
              ))}
            </div>
          </section>

          {/* Opportunities */}
          <section id="opportunities" className="space-y-4">
            <h2 className="text-2xl font-semibold text-navy-950">AI Opportunities</h2>
            <table className="w-full table-auto border border-slate-200">
              <thead className="bg-navy-100">
                <tr>
                  <th className="px-4 py-2 text-left">Department</th>
                  <th className="px-4 py-2 text-left">AI Opportunity</th>
                  <th className="px-4 py-2 text-left">Priority</th>
                </tr>
              </thead>
              <tbody>
                {detail.opportunities.map((op, i) => (
                  <tr key={i} className="border-t border-slate-200">
                    <td className="px-4 py-2">{op.department}</td>
                    <td className="px-4 py-2">{op.opportunity}</td>
                    <td className="px-4 py-2">{op.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Featured Solutions */}
          <section id="solutions" className="space-y-4">
            <h2 className="text-2xl font-semibold text-navy-950">Featured AI Solutions</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {detail.featuredSolutions.map((sol, i) => (
                <div key={i} className="glass-panel rounded-2xl p-6 border border-slate-200 shadow-xs">
                  <h3 className="text-xl font-bold text-navy-950 mb-2">{sol.title}</h3>
                  <p className="text-sm text-navy-600 mb-1"><strong>Business Problem:</strong> {sol.businessProblem}</p>
                  <p className="text-sm text-navy-600 mb-1"><strong>Solution:</strong> {sol.solution}</p>
                  <p className="text-sm text-navy-600 mb-1"><strong>Benefits:</strong> {sol.benefits}</p>
                  <p className="text-sm text-navy-600 mb-1"><strong>Technology:</strong> {sol.technology}</p>
                  <p className="text-sm text-navy-600 mb-1"><strong>Timeline:</strong> {sol.timeline}</p>
                  <p className="text-sm text-navy-600 mb-4"><strong>Expected ROI:</strong> {sol.roi}</p>
                  <a href={sol.link} className="inline-block bg-golden-600 text-white px-4 py-2 rounded hover:bg-golden-700 transition-colors">Learn More</a>
                </div>
              ))}
            </div>
          </section>

          {/* Maturity Journey */}
          <section id="journey" className="space-y-4">
            <h2 className="text-2xl font-semibold text-navy-950">AI Maturity Journey</h2>
            <div className="flex items-center justify-between text-sm text-navy-700">
              {detail.maturityJourney.map((stage, i) => (
                <React.Fragment key={i}>
                  <span>{stage}</span>
                  {i < detail.maturityJourney.length - 1 && <span className="mx-2">↓</span>}
                </React.Fragment>
              ))}
            </div>
          </section>

          {/* Roadmap */}
          <section id="roadmap" className="space-y-4">
            <h2 className="text-2xl font-semibold text-navy-950">Transformation Roadmap</h2>
            <ul className="space-y-2">
              {detail.roadmap.map((step, i) => (
                <li key={i} className="flex items-center">
                  <Badge variant="navy" className="mr-2 min-w-[80px] text-center">{step.month}</Badge>
                  <span className="text-navy-800">{step.milestone}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Business Benefits */}
          <section id="benefits" className="space-y-4">
            <h2 className="text-2xl font-semibold text-navy-950">Business Benefits</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {detail.businessBenefits.map((b, i) => (
                <div key={i} className="bg-golden-100 text-golden-800 rounded-full px-4 py-2 text-center text-sm font-medium">
                  {b}
                </div>
              ))}
            </div>
          </section>

          {/* Services */}
          <section id="services" className="space-y-4">
            <h2 className="text-2xl font-semibold text-navy-950">Recommended Services</h2>
            <ul className="list-disc list-inside space-y-2 text-navy-800">
              {detail.services.map((svc, i) => (
                <li key={i}><a href={svc.link} className="text-golden-600 hover:underline">{svc.name}</a></li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section id="faq" className="space-y-4">
            <h2 className="text-2xl font-semibold text-navy-950">FAQ</h2>
            <dl className="space-y-4">
              {detail.faq.map((item, i) => (
                <div key={i}>
                  <dt className="font-medium text-navy-900">{item.q}</dt>
                  <dd className="text-navy-700 ml-4">{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Final CTA */}
          <section id="cta" className="text-center py-12 bg-navy-950 rounded-xl">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your {playbook.title} Business?</h2>
            <a href="/contact" className="inline-block bg-golden-600 text-white px-6 py-3 rounded-full hover:bg-golden-700 transition-colors">
              Book an AI Discovery Workshop
            </a>
          </section>
        </article>
      </div>
    );
}
