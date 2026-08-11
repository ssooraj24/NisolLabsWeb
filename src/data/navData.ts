import { 
  Compass, 
  Search, 
  CheckCircle2, 
  FileText, 
  Calculator, 
  HelpCircle, 
  Send,
  Cpu,
  Bot,
  Zap,
  MessageSquareCode,
  ShieldCheck,
  Building2,
  Factory,
  Activity,
  Briefcase,
  ShoppingBag,
  GraduationCap,
  BookOpen,
  Sparkles,
  Layers,
  FileCode,
  Users,
  Info,
  Award,
  Mail
} from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  badge?: string;
  description?: string;
  icon: any;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const DISCOVERY_MENU: NavSection = {
  title: "Nisol Discovery™",
  items: [
    { 
      name: "AI Transformation Discovery", 
      href: "/discovery", 
      badge: "FLAGSHIP",
      description: "Our 62-question, 15-capability engineering audit in 7-11 days.",
      icon: Compass 
    },
    { 
      name: "9-Stage Transformation Lifecycle", 
      href: "/transformation-framework", 
      badge: "FRAMEWORK",
      description: "From Opportunity Discovery & Implementation to Governance & Scale.",
      icon: Sparkles 
    },
    { 
      name: "3 Flexible Delivery Models", 
      href: "/services#delivery-models", 
      badge: "CLIENT CHOICE",
      description: "Full freedom to Build, Manage, or Monitor post-discovery.",
      icon: Layers 
    },
    { 
      name: "15 Board-Ready Deliverables", 
      href: "/discovery#deliverables", 
      description: "Executive summaries, architecture maps, and 5-yr ROI models.",
      icon: FileText 
    },
    { 
      name: "Discovery Methodology", 
      href: "/discovery/methodology", 
      description: "Data readiness, workflow analysis, and security stance mapping.",
      icon: Search 
    },
    { 
      name: "AI Readiness Assessment", 
      href: "/discovery/readiness", 
      description: "Evaluate your data infrastructure and security SLA compliance.",
      icon: CheckCircle2 
    },
    { 
      name: "Interactive ROI Calculator", 
      href: "/resources/roi-calculator", 
      badge: "INTERACTIVE",
      description: "Calculate expected token cost savings and operational efficiency.",
      icon: Calculator 
    },
    { 
      name: "Discovery FAQs", 
      href: "/discovery/faqs", 
      description: "Answers to common timeline, data privacy, and engagement questions.",
      icon: HelpCircle 
    },
    { 
      name: "Request Proposal", 
      href: "/contact?type=proposal", 
      description: "Get a tailored engagement plan and timeline from our architects.",
      icon: Send 
    }
  ]
};

export const SOLUTIONS_MENU: NavSection = {
  title: "Implementation Solutions",
  items: [
    { 
      name: "AI Strategy & Discovery", 
      href: "/services/strategy", 
      description: "Executive roadmap, ROI estimation, and data stance evaluation.",
      icon: Compass 
    },
    { 
      name: "Delivery Models (Build / Manage / Monitor)", 
      href: "/services#delivery-models", 
      badge: "NEW",
      description: "Choose how to execute—full build, team oversight, or QA advisory.",
      icon: Layers 
    },
    { 
      name: "AI Engineering & DevOps", 
      href: "/services/engineering", 
      badge: "DIFFERENTIATOR",
      description: "Custom fine-tuning, latency optimization, and CI/CD LLMEval.",
      icon: Cpu 
    },
    { 
      name: "Agentic AI & Autonomous Agents", 
      href: "/services/agents", 
      badge: "FLAGSHIP",
      description: "Multi-agent orchestration clusters with human-in-the-loop controls.",
      icon: Bot 
    },
    { 
      name: "AI-Powered Automation", 
      href: "/services/automation", 
      description: "Intelligent document processing and vision LLM pipelines.",
      icon: Zap 
    },
    { 
      name: "RAG Systems & Vector Memory", 
      href: "/services/assistants", 
      description: "Enterprise copilots with RBAC and hybrid dense-sparse retrieval.",
      icon: MessageSquareCode 
    },
    { 
      name: "Data Readiness & Engineering", 
      href: "/services/data-readiness", 
      description: "ETL pipelines, PII masking, and vector database indexing.",
      icon: Layers 
    },
    { 
      name: "AI Governance & Security", 
      href: "/services/engineering", 
      description: "Zero-trust guardrails, role permissions, and compliance auditing.",
      icon: ShieldCheck 
    }
  ]
};

export const INDUSTRIES_MENU: NavSection = {
  title: "Vertical Expertise",
  items: [
    { name: "Manufacturing & Supply Chain", href: "/industries", icon: Factory },
    { name: "BFSI & Financial Services", href: "/industries", icon: Building2 },
    { name: "Healthcare & Life Sciences", href: "/industries", icon: Activity },
    { name: "Retail & E-Commerce", href: "/industries", icon: ShoppingBag },
    { name: "Education & EdTech", href: "/industries", icon: GraduationCap },
    { name: "Professional Services & IT", href: "/industries", icon: Briefcase }
  ]
};

export const RESOURCES_MENU: NavSection = {
  title: "Knowledge Hub",
  items: [
    { name: "AI Playbooks", href: "/resources#playbooks", icon: BookOpen },
    { name: "Illustrative Case Studies", href: "/resources#case-studies", icon: Sparkles },
    { name: "Solution Blueprints", href: "/resources#blueprints", icon: Layers },
    { name: "Reference Architecture", href: "/resources#architecture", icon: FileCode },
    { name: "Interactive ROI Calculator", href: "/resources/roi-calculator", badge: "INTERACTIVE", icon: Calculator }
  ]
};

export const COMPANY_MENU: NavSection = {
  title: "Organization",
  items: [
    { name: "About Nisol AI", href: "/about", icon: Info },
    { name: "Leadership & Architects", href: "/about#leadership", icon: Users },
    { name: "Our Core Principles", href: "/about#values", icon: Award },
    { name: "Contact Us", href: "/contact", icon: Mail }
  ]
};
