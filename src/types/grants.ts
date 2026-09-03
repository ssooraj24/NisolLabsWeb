export type GrantStatus = 'pending' | 'under_review' | 'shortlisted' | 'awarded' | 'declined';

export type GrantRegistrationType =
  | 'Section 8 Company'
  | 'Trust'
  | 'Society'
  | 'Educational Institution'
  | 'Other';

export interface GrantRubricScores {
  impact: number;        // 1-5 (Weight 35%)
  complexity: number;    // 1-5 (Weight 25%)
  leadership: number;    // 1-5 (Weight 20%)
  amplification: number; // 1-5 (Weight 20%)
  total_weighted: number;// 0-100
}

export interface GrantApplication {
  id: string;
  org_name: string;
  registration_type: GrantRegistrationType | string;
  hq_location: string;
  mission_statement: string;
  
  problem_solved: string;
  tech_bottleneck: string;
  
  leadership_confirmed: boolean;
  grant_use_case: string;
  amplification_pledged: boolean;
  media_reach_link?: string | null;
  deck_url?: string | null;
  
  contact_name: string;
  contact_title: string;
  contact_email: string;
  contact_phone: string;
  
  status: GrantStatus;
  grant_cohort?: string | null;
  
  rubric_impact_score?: number | null;
  rubric_complexity_score?: number | null;
  rubric_leadership_score?: number | null;
  rubric_amplification_score?: number | null;
  rubric_total_weighted?: number | null;
  
  internal_notes?: string | null;
  signed_agreement_url?: string | null;
  reviewed_by?: string | null;
  
  created_at: string;
  updated_at: string;
}

export interface GrantApplicationFormData {
  org_name: string;
  registration_type: string;
  hq_location: string;
  mission_statement: string;
  problem_solved: string;
  tech_bottleneck: string;
  leadership_confirmed: boolean;
  grant_use_case: string;
  amplification_pledged: boolean;
  media_reach_link?: string;
  contact_name: string;
  contact_title: string;
  contact_email: string;
  contact_phone: string;
}
