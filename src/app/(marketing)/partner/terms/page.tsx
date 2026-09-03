import React from "react";
import Link from "next/link";
import { Handshake, ShieldCheck, FileText, CheckCircle2, Clock, Scale, ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Partner Program Terms & Conditions | Nisol AI",
  description: "Official legal terms, commission schedules, deal registration policies, 90-day protection rules, and SLA commitments for the Nisol AI Partner Program.",
};

export default function PartnerTermsPage() {
  return (
    <div className="space-y-12 py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div>
        <Link href="/partner" className="inline-flex items-center gap-2 text-xs font-bold text-golden-600 hover:text-golden-700 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Partner Program</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4 border-b border-slate-200 pb-8">
        <Badge variant="golden">Legal Framework</Badge>
        <h1 className="text-3xl sm:text-5xl font-black text-navy-950 tracking-tight">
          Nisol AI Partner Program <br />
          <span className="golden-gradient-text">Terms & Conditions</span>
        </h1>
        <p className="text-sm sm:text-base text-navy-700 leading-relaxed max-w-3xl">
          Effective Date: September 3, 2026. This Agreement governs participation in the Nisol AI Partner Program ("Program") between Nisol AI ("Company") and the participating partner organization or individual ("Partner").
        </p>
      </div>

      {/* Main Legal Content */}
      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-200 space-y-10 text-navy-900 text-sm leading-relaxed shadow-sm">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-golden-100 text-golden-800 flex items-center justify-center text-xs font-black">1</span>
            Program Overview & Qualification
          </h2>
          <p>
            1.1 <strong>Program Purpose:</strong> The Nisol AI Partner Program enables approved consultants, system integrators, managed service providers (MSPs), and industry advisors to market, co-sell, or refer Nisol AI enterprise solutions (including Nisol One, Nisol Enterprise, Autonomous Agentic Clusters, and custom AI implementations).
          </p>
          <p>
            1.2 <strong>No Fee to Join:</strong> Participation in the Program is completely free. There are no registration fees, annual maintenance fees, or mandatory purchasing quotas required to maintain active partner status.
          </p>
          <p>
            1.3 <strong>Partner Tracks:</strong> Partners are categorized into two primary tracks based on engagement level:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-xs text-navy-800">
            <li><strong>Referral Partner (Passive):</strong> Sourced lead introductions with zero delivery responsibility.</li>
            <li><strong>Implementation Partner (Active):</strong> Co-sells, solutions, and participates in technical scoping and delivery.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 border-t border-slate-200 pt-8">
          <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-golden-100 text-golden-800 flex items-center justify-center text-xs font-black">2</span>
            Commission Structure & Renewal Rules
          </h2>
          <p>
            2.1 <strong>Founding Partner Rate (Months 1–6):</strong> Partners onboarded during the Founding Partner period (first 10 active partners) receive a <strong>permanently grandfathered 30% commission rate</strong> on Year 1 contract value across all closed deals, exempt from future tier resets.
          </p>
          <p>
            2.2 <strong>Standard Tiered Structure (Month 7+):</strong> Partners onboarded after the Founding Cohort enter the volume-tiered commission structure:
          </p>

          <div className="overflow-x-auto py-2">
            <table className="w-full text-xs text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-navy-950 text-white font-bold">
                <tr>
                  <th className="p-3">Tier</th>
                  <th className="p-3">Active Closed Accounts</th>
                  <th className="p-3">Year 1 Commission</th>
                  <th className="p-3">Year 2+ Renewal Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                <tr>
                  <td className="p-3 font-bold text-navy-950">Silver</td>
                  <td className="p-3">1 – 5 Deals</td>
                  <td className="p-3 text-golden-600 font-bold">20%</td>
                  <td className="p-3 text-emerald-600 font-bold">20%</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-navy-950">Gold</td>
                  <td className="p-3">6 – 20 Deals</td>
                  <td className="p-3 text-golden-600 font-bold">25%</td>
                  <td className="p-3 text-emerald-600 font-bold">20%</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-navy-950">Platinum</td>
                  <td className="p-3">21+ Deals</td>
                  <td className="p-3 text-golden-600 font-bold">30%</td>
                  <td className="p-3 text-emerald-600 font-bold">20%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            2.3 <strong>Renewal Commissions (Year 2 Onward):</strong> Partners earn a recurring <strong>20% commission</strong> on annual contract renewal value starting in Year 2 for as long as the client remains active with Nisol AI.
          </p>
          <p>
            2.4 <strong>Upsell Commissions:</strong> If a Partner actively expands an existing account (e.g., Nisol One ➔ Nisol Enterprise), the Partner receives <strong>30% commission on incremental revenue</strong> for Year 1 of the upsell, reverting to 20% on subsequent renewals.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 border-t border-slate-200 pt-8">
          <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-golden-100 text-golden-800 flex items-center justify-center text-xs font-black">3</span>
            Deal Registration, Timestamping & 90-Day Protection
          </h2>
          <p>
            3.1 <strong>Deal Registration Requirement:</strong> To qualify for commission and deal protection, Partners must register target prospect accounts via the Partner Portal or written registration form prior to initiating executive introductions.
          </p>
          <p>
            3.2 <strong>First-to-Register Conflict Rule:</strong> Deal protection is awarded strictly on a timestamped, first-come, first-served basis using domain-level deduplication (`domain.com`). If two Partners register the same target company, the Partner with the earlier timestamp receives exclusive protection.
          </p>
          <p>
            3.3 <strong>90-Day Protection Window:</strong> Approved deal registrations grant the Partner exclusive protection for <strong>90 calendar days</strong>. If the internal Nisol AI sales team has already engaged the prospect within the prior 60 days, Nisol AI will notify the Partner within 48 hours and mark the registration as an internal conflict.
          </p>
          <p>
            3.4 <strong>Extension of Protection:</strong> If an enterprise procurement process exceeds 90 days, protection may be extended by an additional 30 days upon mutual written agreement if active negotiation is demonstrated.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 border-t border-slate-200 pt-8">
          <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-golden-100 text-golden-800 flex items-center justify-center text-xs font-black">4</span>
            Company Service Level Agreement (48-Hour SLA)
          </h2>
          <p>
            4.1 <strong>48-Hour SLA Guarantee:</strong> Nisol AI commits to contacting all partner-referred leads within <strong>48 business hours</strong> of deal registration approval.
          </p>
          <p>
            4.2 <strong>Pipeline Transparency:</strong> Partners receive real-time status notifications via the Partner Dashboard whenever a registered deal advances through discovery, proposal, security audit, or contract signing.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 border-t border-slate-200 pt-8">
          <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-golden-100 text-golden-800 flex items-center justify-center text-xs font-black">5</span>
            Territory & Priority Protection Guidelines
          </h2>
          <p>
            5.1 <strong>Non-Exclusive General Policy:</strong> Program partnerships are non-exclusive unless explicitly granted under a Founding Partner agreement.
          </p>
          <p>
            5.2 <strong>Priority Territory Declaration:</strong> Partners may declare a primary vertical or regional focus (e.g., "BFSI India" or "Dubai Healthcare"). Priority Territory status grants a 48-hour first right of refusal on inbound matching leads.
          </p>
          <p>
            5.3 <strong>Dubai / Middle East Soft-Exclusivity:</strong> The inaugural Dubai partner receives a 6-month soft-exclusivity subject to maintaining a minimum performance benchmark of 3 qualified enterprise leads per quarter.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3 border-t border-slate-200 pt-8">
          <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-golden-100 text-golden-800 flex items-center justify-center text-xs font-black">6</span>
            Payment Terms & Payout Mechanics
          </h2>
          <p>
            6.1 <strong>Monthly Net-30 Payout Schedule:</strong> Commissions are calculated at month-end and disbursed on a <strong>Net-30 schedule</strong> following receipt of client invoice payment by Nisol AI.
          </p>
          <p>
            6.2 <strong>Minimum Payout Threshold:</strong> Minimum single payout threshold is <strong>₹10,000 INR (or $120 USD)</strong>. Balances below the threshold roll forward to the subsequent billing cycle.
          </p>
          <p>
            6.3 <strong>Tax & Currency:</strong> Payouts are made in INR or USD via direct bank transfer. Partners are responsible for applicable local withholding or GST taxes in their operating jurisdiction.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3 border-t border-slate-200 pt-8">
          <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-golden-100 text-golden-800 flex items-center justify-center text-xs font-black">7</span>
            Brand Usage & Search Engine Advertising Restrictions
          </h2>
          <p>
            7.1 <strong>Accurate Representation:</strong> Partners agree to represent Nisol AI capabilities, SLA guarantees, and pricing strictly in accordance with official collateral.
          </p>
          <p>
            7.2 <strong>Paid Keyword Prohibition:</strong> Partners are strictly prohibited from bidding on trademarked "Nisol AI", "RoSense AI", or related product keywords on Google Ads, Bing Ads, or paid search platforms without prior written authorization.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3 border-t border-slate-200 pt-8">
          <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-golden-100 text-golden-800 flex items-center justify-center text-xs font-black">8</span>
            Confidentiality & Non-Disclosure (NDA)
          </h2>
          <p>
            8.1 <strong>Proprietary Information:</strong> Both parties agree to protect proprietary client lists, pricing schedules, architecture designs, and technical documentation with strict confidentiality.
          </p>
          <p>
            8.2 <strong>Data Protection:</strong> Partner shall not retain, harvest, or sell client PII or enterprise data encountered during referral or implementation engagements.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3 border-t border-slate-200 pt-8">
          <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-golden-100 text-golden-800 flex items-center justify-center text-xs font-black">9</span>
            Term, Termination & Survival Rights
          </h2>
          <p>
            9.1 <strong>Termination Notice:</strong> Either party may terminate this agreement at any time by providing <strong>30 days' written notice</strong> to `partners@nisolai.com`.
          </p>
          <p>
            9.2 <strong>Survival of Renewal Commissions:</strong> Termination of the agreement does not forfeit commissions earned prior to the termination date. <strong>Year 2+ renewal commissions (20%) remain fully payable</strong> for clients acquired during active partnership status.
          </p>
        </section>

        {/* Callout Box */}
        <div className="p-6 rounded-2xl bg-golden-50 border border-golden-300 text-golden-900 space-y-2">
          <h4 className="font-bold text-sm flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-golden-700" />
            Questions regarding Partner Terms?
          </h4>
          <p className="text-xs text-golden-800 leading-relaxed">
            For legal inquiries, partnership modifications, or custom enterprise agreements, contact our Partner Legal Team at <strong>partners@nisolai.com</strong>.
          </p>
        </div>

      </div>

      {/* Bottom CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-8 rounded-3xl bg-navy-950 text-white border border-golden-500/30">
        <div>
          <h3 className="text-lg font-bold">Ready to become a Founding Partner?</h3>
          <p className="text-xs text-slate-300">Lock in your permanent 30% rate before the 10 cohort spots fill up.</p>
        </div>
        <Button href="/partner" variant="primary" size="md" className="font-bold shrink-0">
          Apply Now →
        </Button>
      </div>
    </div>
  );
}
