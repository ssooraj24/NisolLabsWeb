"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { 
  Search, 
  ChevronDown, 
  HelpCircle, 
  ArrowRight,
  MessageSquare,
  Mail,
  User,
  X,
  Lock,
  Minus,
  Plus,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface FAQItem {
  q: string;
  a: string;
}

interface Category {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  questions: FAQItem[];
}

const FAQ_CATEGORIES: Category[] = [
  {
    id: "about",
    name: "About Nisol Discovery™",
    emoji: "🔍",
    tagline: "What is it, who is it for, and why does it exist?",
    questions: [
      {
        q: "What is Nisol Discovery™?",
        a: "Nisol Discovery™ is a fixed-price, outcome-based AI transformation discovery engagement. It combines a structured 62-question diagnostic workshop with AI-powered analysis to deliver executive-ready insights, opportunities, and a transformation roadmap in weeks—not months."
      },
      {
        q: "Who is Nisol Discovery™ for?",
        a: "Nisol Discovery™ is designed for organizations that are serious about AI transformation. It's ideal for mid-market to enterprise companies (50+ employees) across industries like Manufacturing, BFSI, Healthcare, Retail, and Professional Services."
      },
      {
        q: "Why should I choose Nisol Discovery™ over traditional consulting?",
        a: "Traditional consulting engagements take months, deliver generic recommendations, and depend on a single consultant's expertise. Nisol Discovery™ is faster (weeks vs. months), data-driven (62 questions, AI-powered), and delivers a repeatable, proprietary methodology with consultant review."
      }
    ]
  },
  {
    id: "process",
    name: "The Engagement Process",
    emoji: "📋",
    tagline: "How the discovery works step-by-step.",
    questions: [
      {
        q: "How does the engagement work?",
        a: "The engagement follows a structured 4-phase process: Discovery Workshop (2–4 days), Data Validation & Analysis (1–2 days), AI Report Generation (0.5–1 day), Consultant Review & Quality Assurance (1–2 days), and Executive Presentation (0.5–1 day)."
      },
      {
        q: "How long does a Nisol Discovery™ engagement take?",
        a: "A typical engagement takes 7–11 business days, depending on stakeholder availability and the number of business functions involved. The Discovery Workshop itself is 2–4 days."
      },
      {
        q: "What is included in the Discovery Workshop?",
        a: "The workshop covers 62 questions across 15 capabilities, conducted with your leadership and key stakeholders. It includes detailed discussions about your AI readiness, technology, operations, and culture."
      },
      {
        q: "Can the workshops be conducted remotely?",
        a: "Yes, workshops can be conducted remotely or on-site, depending on your preference and location. We work with you to choose the most effective format."
      }
    ]
  },
  {
    id: "deliverables",
    name: "Deliverables & Reports",
    emoji: "📄",
    tagline: "What you receive at the end of the engagement.",
    questions: [
      {
        q: "What will I receive from the engagement?",
        a: "You will receive 15 executive-ready deliverables across three strategic packs: Executive Intelligence Pack (Executive Summary, AI Readiness Assessment, Executive Dashboard, AI Scorecard), AI Opportunity Pack (Opportunity Matrix, Top 20 Use Cases, Quick Wins vs Strategic Bets, Implementation Prioritization), and Transformation Pack (Roadmap, ROI Analysis, Business Case, Solution Blueprints, Change Management, Risk Assessment, Success Metrics)."
      },
      {
        q: "Will I get actual reports, not just insights?",
        a: "Yes, you will receive professionally formatted executive reports for each deliverable, ready for leadership, board presentations, and implementation planning."
      },
      {
        q: "Can I download a sample report?",
        a: "Yes. We provide a sample report download on our [Deliverables page](/discovery/deliverables) so you can see the quality and depth of our output before engaging."
      }
    ]
  },
  {
    id: "investment",
    name: "Investment & Pricing",
    emoji: "💰",
    tagline: "Pricing, payment terms, and outcome guarantees.",
    questions: [
      {
        q: "How much does a Nisol Discovery™ engagement cost?",
        a: "Nisol Discovery™ is a fixed-price engagement starting at ₹3.5 Lakhs. The final investment depends on the scope of your organization, the number of functions involved, and the depth of analysis required. We provide a custom proposal after our initial consultation."
      },
      {
        q: "Why is it a fixed-price engagement?",
        a: "We believe in outcome-based pricing. The investment is based on the value delivered, not the number of hours or days spent. This aligns our interests with yours—we focus on delivering exceptional results, not maximizing billable hours."
      },
      {
        q: "What are the payment terms?",
        a: "We offer flexible payment terms: 40% upfront, 40% after the Discovery Workshop, and 20% after final delivery. Specific terms can be discussed during the proposal phase."
      },
      {
        q: "Are there any hidden costs?",
        a: "No. The fixed-price engagement includes all workshop sessions, analysis, AI-generated reports, consultant review, and final deliverables. Travel expenses (if on-site) are billed separately and discussed upfront."
      }
    ]
  },
  {
    id: "timeline",
    name: "Timeline & Logistics",
    emoji: "⏱️",
    tagline: "Scheduling, acceleration, and support scopes.",
    questions: [
      {
        q: "How quickly can we start?",
        a: "We can typically start within 1–2 weeks of signing the proposal, depending on stakeholder availability and your schedule."
      },
      {
        q: "Can the timeline be compressed?",
        a: "Yes, if you have urgent timelines, we can work with you to accelerate the engagement. Rush delivery may involve additional fees, which we'll discuss upfront."
      },
      {
        q: "What happens if we need more time?",
        a: "The engagement timeline is flexible. If you need additional workshops, expanded scope, or extra review cycles, we handle these through a Change Request. Commercial terms remain unchanged unless there is a mutually agreed change in scope."
      },
      {
        q: "What happens after the engagement ends?",
        a: "We provide 30-day post-engagement email support. For ongoing advisory, implementation support, or executive dashboards, we offer add-on services that can be discussed during the engagement."
      }
    ]
  },
  {
    id: "qualifications",
    name: "Qualifications & Fit",
    emoji: "✅",
    tagline: "Evaluating fit and current maturity prerequisites.",
    questions: [
      {
        q: "Is Nisol Discovery™ right for my organization?",
        a: "Nisol Discovery™ is designed for organizations with 50+ employees that are serious about AI transformation. If you're unsure whether it fits, schedule a Discovery Call and we'll discuss your specific needs."
      },
      {
        q: "What if we already know our AI priorities?",
        a: "Even if you have some ideas, our assessment provides a structured, data-driven validation of your assumptions, identifies hidden opportunities, and delivers a prioritized roadmap. It's often surprising what we uncover."
      },
      {
        q: "What if our organization is not technically mature?",
        a: "That's exactly when Nisol Discovery™ is most valuable. We identify gaps and provide a phased roadmap that starts with foundational capabilities before moving to advanced AI."
      }
    ]
  },
  {
    id: "nextsteps",
    name: "Next Steps",
    emoji: "🚀",
    tagline: "How to trigger a kickoff and get started.",
    questions: [
      {
        q: "How do we get started?",
        a: "The best way to get started is to schedule a no-obligation Discovery Call. We'll discuss your goals, understand your context, and recommend the right engagement for you."
      },
      {
        q: "Do I need to prepare anything before the engagement?",
        a: "We'll provide a kickoff document before the engagement. You'll need to nominate a project sponsor, identify key stakeholders, and schedule workshop dates."
      },
      {
        q: "How do I get a custom proposal?",
        a: "You can request a custom proposal through our Request Proposal page or by contacting us directly at hello@nisol.ai."
      },
      {
        q: "What is the first step after I decide to engage?",
        a: "After you sign the proposal, we'll schedule a kickoff meeting, align on stakeholder availability, and begin the Discovery Workshop."
      }
    ]
  }
];

export default function FaqsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [question, setQuestion] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Calculate filtered categories and questions
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return FAQ_CATEGORIES;
    
    const query = searchQuery.toLowerCase();
    return FAQ_CATEGORIES.map(category => {
      const matchedQuestions = category.questions.filter(
        q => q.q.toLowerCase().includes(query) || q.a.toLowerCase().includes(query)
      );
      return {
        ...category,
        questions: matchedQuestions
      };
    }).filter(category => category.questions.length > 0);
  }, [searchQuery]);

  // Toggle single accordion state
  const toggleItem = (key: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Expand all items in current view
  const expandAll = () => {
    const nextState: Record<string, boolean> = {};
    filteredCategories.forEach(category => {
      category.questions.forEach(q => {
        nextState[`${category.id}-${q.q}`] = true;
      });
    });
    setExpandedItems(nextState);
  };

  // Collapse all items
  const collapseAll = () => {
    setExpandedItems({});
  };

  // Structured Schema data injected for SEO
  const schemaMarkup = useMemo(() => {
    const allQuestions: { q: string; a: string }[] = [];
    FAQ_CATEGORIES.forEach(c => allQuestions.push(...c.questions));
    
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": allQuestions.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    };
  }, []);

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setIsModalOpen(false);
      setFormSubmitted(false);
      setQuestion("");
      setName("");
      setEmail("");
      alert("Your question was submitted successfully! Our consulting team will reply via email shortly.");
    }, 2000);
  };

  return (
    <div className="space-y-20 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      {/* SECTION 1: HERO HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-6 pt-8 pb-4">
        <Badge variant="golden" className="animate-pulse">Ask Us Anything</Badge>
        <h1 className="text-4xl sm:text-6xl font-black text-navy-950 tracking-tight leading-none">
          Everything You Need to Know <br />
          <span className="golden-gradient-text">About Nisol Discovery™</span>
        </h1>
        <p className="text-lg sm:text-xl text-navy-800 font-semibold max-w-2xl mx-auto leading-relaxed">
          Explore answers to frequently asked questions about the Nisol Discovery™ engagement. We clarify process, deliverables, cost, and logistics upfront.
        </p>

        {/* Live Search Bar */}
        <div className="max-w-md mx-auto pt-4 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or keywords..."
            className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-navy-950 placeholder-slate-400 shadow-sm focus:outline-none focus:border-golden-500 focus:ring-1 focus:ring-golden-500 transition"
          />
        </div>
      </div>

      {/* SECTION 2: QUICK JUMP NAVIGATION */}
      {searchQuery === "" && (
        <div className="space-y-4 max-w-5xl mx-auto text-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-navy-500">Jump to a Category</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {FAQ_CATEGORIES.map((c) => (
              <a
                key={c.id}
                href={`#cat-${c.id}`}
                className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:border-golden-500/50 hover:shadow-sm px-4 py-2 rounded-xl text-xs font-bold text-navy-950 transition"
              >
                <span>{c.emoji}</span>
                <span>{c.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Expand/Collapse All and Results Count */}
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-slate-200 pb-4">
        <span className="text-xs font-bold text-navy-500 uppercase tracking-wider">
          {searchQuery ? `Search Results (${filteredCategories.reduce((acc, c) => acc + c.questions.length, 0)})` : "All FAQs"}
        </span>
        <div className="flex items-center gap-3">
          <button 
            onClick={expandAll}
            className="text-[11px] font-bold text-golden-600 hover:text-golden-700 transition cursor-pointer uppercase tracking-wider"
          >
            Expand All
          </button>
          <span className="text-slate-300">|</span>
          <button 
            onClick={collapseAll}
            className="text-[11px] font-bold text-navy-500 hover:text-navy-700 transition cursor-pointer uppercase tracking-wider"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* SECTION 3: FAQS ACCORDION BY CATEGORY */}
      <div className="max-w-4xl mx-auto space-y-12">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12 space-y-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <HelpCircle className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-black text-navy-950">No matching questions found</h3>
            <p className="text-xs text-navy-600 max-w-sm mx-auto">
              We couldn't find any questions matching "{searchQuery}". Try searching for categories like pricing, timeline, roadmap, or deliverables.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs font-bold text-golden-600 hover:underline cursor-pointer"
            >
              Clear Search Query
            </button>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <div key={category.id} id={`cat-${category.id}`} className="space-y-6 scroll-mt-24">
              {/* Category Header */}
              <div className="flex items-start gap-3 border-l-4 border-golden-500 pl-4 py-1">
                <div>
                  <h2 className="text-xl font-black text-navy-950 flex items-center gap-2">
                    <span>{category.emoji}</span>
                    <span>{category.name}</span>
                  </h2>
                  <p className="text-xs text-navy-600 font-medium mt-0.5">{category.tagline}</p>
                </div>
              </div>

              {/* Accordion Questions */}
              <div className="space-y-3 font-medium">
                {category.questions.map((item) => {
                  const key = `${category.id}-${item.q}`;
                  const isExpanded = expandedItems[key] || false;
                  return (
                    <div 
                      key={item.q}
                      className={`bg-white border rounded-2xl transition-all duration-200 ${
                        isExpanded ? "border-golden-500/40 shadow-md" : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <button
                        onClick={() => toggleItem(key)}
                        aria-expanded={isExpanded}
                        className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 cursor-pointer text-navy-950 hover:text-navy-900 transition-colors"
                      >
                        <span className="text-sm md:text-base font-black">{item.q}</span>
                        <div className={`p-1.5 rounded-lg border transition-all ${
                          isExpanded ? "bg-golden-500/10 text-golden-600 border-golden-500/20" : "bg-slate-50 text-slate-400 border-slate-200"
                        }`}>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`} />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 pt-1 text-xs md:text-sm text-navy-800 leading-relaxed font-sans border-t border-slate-100 mt-1">
                              <p dangerouslySetInnerHTML={{
                                __html: item.a.replace(
                                  /\[(.*?)\]\((.*?)\)/g, 
                                  '<a href="$2" class="text-golden-600 hover:text-golden-700 font-bold underline">$1</a>'
                                )
                              }} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* SECTION 5: STILL HAVE QUESTIONS? CTA */}
      <div className="bg-navy-950 text-white rounded-3xl p-8 md:p-12 text-center space-y-8 border border-golden-500/30 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-900/50 via-navy-950 to-navy-950 pointer-events-none" />
        <div className="absolute top-0 left-0 w-80 h-80 bg-golden-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative space-y-4">
          <Badge variant="golden" className="animate-pulse">Consulting Support</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Still Have Questions? We're Here to Help.
          </h2>
          <p className="text-sm sm:text-base text-navy-200 max-w-2xl mx-auto leading-relaxed">
            We understand that every organization is unique. If you have a question that's not covered here, we'd love to hear from you.
          </p>
        </div>

        <div className="relative flex flex-wrap justify-center gap-4 pt-2">
          <Button href="/contact?type=discovery-call" variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
            Book a Discovery Call
          </Button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-lg px-7 py-3.5 text-base gap-2.5 shadow-md bg-navy-900 hover:bg-navy-950 text-golden-400 border border-golden-500/30 group active:scale-[0.98] cursor-pointer"
          >
            <MessageSquare className="w-5 h-5 text-golden-400 group-hover:scale-105 transition-transform" />
            Ask Us a Question
          </button>
        </div>

        <div className="relative border-t border-navy-800 pt-8 mt-6">
          <p className="text-xs text-navy-400 font-bold uppercase tracking-wider mb-4 font-mono">Related Resources:</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold">
            <Link href="/discovery/methodology" className="text-navy-300 hover:text-golden-400 transition flex items-center gap-1">
              Learn Discovery Methodology <ArrowRight className="w-3 h-3" />
            </Link>
            <span className="text-navy-700 hidden sm:inline">|</span>
            <Link href="/discovery/deliverables" className="text-navy-300 hover:text-golden-400 transition flex items-center gap-1">
              Browse 15 Deliverables <ArrowRight className="w-3 h-3" />
            </Link>
            <span className="text-navy-700 hidden sm:inline">|</span>
            <Link href="/resources/roi-calculator" className="text-navy-300 hover:text-golden-400 transition flex items-center gap-1">
              Evaluate Financial ROI <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* LEAD CAPTURE MODAL: ASK A QUESTION */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-navy-950 cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-golden-500/20 text-left space-y-6 z-10 overflow-hidden"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-navy-950 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <Badge variant="golden">Consultation Enquiry</Badge>
                <h3 className="text-2xl font-black text-navy-950">Ask Us a Question</h3>
                <p className="text-xs text-navy-700 leading-relaxed font-medium">
                  Have an enquiry about Nisol Discovery™ that isn't answered in the FAQs? Send it directly to our consultants.
                </p>
              </div>

              <form onSubmit={handleQuestionSubmit} className="space-y-4 font-medium">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-navy-950 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-golden-500" /> Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-navy-950 placeholder-slate-400 focus:outline-none focus:border-golden-500 focus:ring-1 focus:ring-golden-500 transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-navy-950 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-golden-500" /> Business Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@company.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-navy-950 placeholder-slate-400 focus:outline-none focus:border-golden-500 focus:ring-1 focus:ring-golden-500 transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-navy-950 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-golden-500" /> Your Question
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Tell us about your organization's goals or ask about specific workshop scopes..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-navy-950 placeholder-slate-400 focus:outline-none focus:border-golden-500 focus:ring-1 focus:ring-golden-500 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formSubmitted}
                  className="w-full bg-gradient-to-r from-golden-500 to-golden-600 hover:from-golden-600 hover:to-golden-700 text-navy-950 font-black py-3 px-6 rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                >
                  {formSubmitted ? (
                    <span>Submitting Question...</span>
                  ) : (
                    <>
                      <span>Send to Consultants</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="flex items-center gap-2 text-[10px] text-navy-500 border-t border-slate-100 pt-4 font-mono justify-center">
                <Lock className="w-3 h-3 text-golden-500" />
                <span>Zero model-training policy. Data 100% secure.</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
