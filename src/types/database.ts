export type IndustrySector =
  | 'Technology'
  | 'Healthcare'
  | 'Financial Services'
  | 'Manufacturing'
  | 'Retail'
  | 'Energy'
  | 'Education'
  | 'Government'
  | 'Professional Services'
  | 'Transportation'
  | 'Real Estate'
  | 'Media'
  | 'Other';

export type CompanySize =
  | 'Startup'
  | 'Small'
  | 'Medium'
  | 'Mid-Market'
  | 'Large'
  | 'Enterprise';

export type RevenueRangeOption =
  | '< ₹10 Cr'
  | '₹10 Cr - ₹50 Cr'
  | '₹50 Cr - ₹250 Cr'
  | '₹250 Cr - ₹1,000 Cr'
  | '₹1,000 Cr - ₹5,000 Cr'
  | '> ₹5,000 Cr'
  | 'Prefer not to say';

export type TenantStatus = 'prospect' | 'active' | 'inactive' | 'lost' | 'past';
export type TenantType = 'client' | 'prospect' | 'partner' | 'internal';

export type Tenant = {
  id: string;
  name: string;
  website: string | null;
  industry: string | null;
  sub_industry: string | null;
  industry_sector: IndustrySector | null;
  employee_count: number | null;
  company_size: CompanySize | null;
  revenue_range: RevenueRangeOption | string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  status: TenantStatus;
  tenant_type: TenantType;
  joined_date: string | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
};

export type RevenueRangeDefault = {
  range_label: string;
  mid_point_cr: number | null;
  min_cr: number | null;
  max_cr: number | null;
};
