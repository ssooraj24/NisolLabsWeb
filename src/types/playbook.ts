// src/types/playbook.ts
import { ReactNode } from "react";

export interface Playbook {
  slug: string;
  industry: string;
  hero: {
    title: string;
    subtitle: string;
    image: string;
    roi: string;
    timeline: string;
    opportunitiesCount: number;
  };
  purpose: string;
  challenges: {
    title: string;
    icon?: ReactNode; // optional
    description?: string; // optional explanatory text
  }[];
  opportunities: {
    department: string;
    opportunity: string;
    priority: "High" | "Medium" | "Low";
    slug: string;
  }[];
  featuredSolutions: {
    title: string;
    businessProblem: string;
    solution: string;
    benefits: string;
    technology: string;
    timeline: string;
    roi: string;
    slug: string;
  }[];
  maturityJourney: string[];
  roadmap: {
    month: string;
    milestone: string;
  }[];
  businessBenefits: string[];
  services: {
    name: string;
    description?: string;
    link: string;
  }[];
  faq: {
    q: string;
    a: string;
  }[];
}