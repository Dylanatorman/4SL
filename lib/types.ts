// Core Types for VC Brief Content

export interface CompanyOverview {
  title: string;
  tagline: string;
  mission: string;
  vision: string;
  problem: string;
  solution: string;
  keyMetrics: Metric[];
  team?: TeamMember[];
  timeline?: TimelineItem[];
}

export interface Metric {
  label: string;
  value: string | number;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedin?: string;
}

export interface TimelineItem {
  date: string;
  title: string;
  description: string;
}

export interface MarketData {
  tam: number;
  sam: number;
  som: number;
  marketTrends: string[];
  buyers: BuyerPersona[];
  budgetCycles: string;
  growthDrivers: GrowthDriver[];
}

export interface BuyerPersona {
  title: string;
  description: string;
  painPoints: string[];
  icon?: string;
}

export interface GrowthDriver {
  title: string;
  description: string;
  icon?: string;
}

export interface ProductInfo {
  overview: string;
  features: Feature[];
  differentiators: string[];
  techStack: TechStackItem[];
  roadmap: RoadmapItem[];
  screenshots?: string[];
  integrations?: Integration[];
}

export interface Feature {
  title: string;
  description: string;
  icon?: string;
  category?: string;
}

export interface TechStackItem {
  name: string;
  category: string;
  logo?: string;
}

export interface RoadmapItem {
  quarter: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
}

export interface Integration {
  name: string;
  logo?: string;
  description?: string;
}

export interface BusinessModel {
  revenueStreams: RevenueStream[];
  pricingTiers: PricingTier[];
  unitEconomics: UnitEconomics;
  salesStrategy: string;
  gtmApproach: string[];
}

export interface RevenueStream {
  name: string;
  percentage: number;
  description: string;
}

export interface PricingTier {
  name: string;
  price: number;
  billingPeriod: 'monthly' | 'annually';
  features: string[];
  popular?: boolean;
}

export interface UnitEconomics {
  cac: number;
  ltv: number;
  ltvCacRatio: number;
  paybackPeriod: number;
  grossMargin: number;
}

export interface TractionMetrics {
  customers: number;
  revenue: number;
  mrr?: number;
  arr?: number;
  growth: GrowthMetric[];
  caseStudies: CaseStudy[];
  testimonials: Testimonial[];
  customerLogos?: string[];
  geographicDistribution?: GeographicData[];
}

export interface GrowthMetric {
  period: string;
  metric: string;
  value: number;
}

export interface CaseStudy {
  id: string;
  customerName: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  quote?: string;
  logo?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: string;
}

export interface GeographicData {
  region: string;
  percentage: number;
  customers: number;
}

export interface LegalInfo {
  cases: LegalCase[];
  regulations: Regulation[];
  complianceFrameworks: string[];
  riskMitigation: RiskItem[];
  ip?: IntellectualProperty[];
}

export interface LegalCase {
  id: string;
  title: string;
  jurisdiction: string;
  court: string;
  date: string;
  citation: string;
  status: 'precedential' | 'non-precedential' | 'pending';
  url: string;
  summary: string;
  relevance: string;
  tags: string[];
  keyPoints?: string[];
}

export interface Regulation {
  id: string;
  title: string;
  jurisdiction: string;
  type: 'statute' | 'regulation' | 'guidance';
  status: 'in-force' | 'proposed' | 'sunset';
  url: string;
  summary: string;
  implications: string[];
  effectiveDate?: string;
}

export interface RiskItem {
  category: string;
  risk: string;
  mitigation: string;
  status: 'addressed' | 'in-progress' | 'planned';
}

export interface IntellectualProperty {
  type: 'patent' | 'trademark' | 'copyright';
  title: string;
  number?: string;
  status: string;
  filingDate?: string;
}

export interface CompetitiveAnalysis {
  vendors: Vendor[];
  competitiveMatrix: CompetitiveMatrix;
  positioning: string;
  moat: string[];
  partnerships?: Partnership[];
}

export interface Vendor {
  name: string;
  url: string;
  focus: string;
  notes: string;
  differentiators: string[];
  strengths?: string[];
  weaknesses?: string[];
  logo?: string;
}

export interface CompetitiveMatrix {
  features: string[];
  competitors: CompetitorComparison[];
}

export interface CompetitorComparison {
  name: string;
  features: boolean[];
}

export interface Partnership {
  name: string;
  type: string;
  description: string;
  logo?: string;
}

export interface FundingAsk {
  amount: number;
  stage: string;
  valuation?: number;
  useOfFunds: FundAllocation[];
  milestones: Milestone[];
  projections: FinancialProjection[];
  exitStrategy?: string;
  contactInfo: ContactInfo;
}

export interface FundAllocation {
  category: string;
  amount: number;
  percentage: number;
  description: string;
}

export interface Milestone {
  quarter: string;
  title: string;
  description: string;
  metrics?: string[];
}

export interface FinancialProjection {
  year: number;
  revenue: number;
  expenses: number;
  profit: number;
  customers: number;
}

export interface ContactInfo {
  name: string;
  role: string;
  email: string;
  phone?: string;
  calendly?: string;
}

// Main content structure
export interface VCBriefContent {
  company: CompanyOverview;
  market: MarketData;
  product: ProductInfo;
  business: BusinessModel;
  traction: TractionMetrics;
  legal: LegalInfo;
  competition: CompetitiveAnalysis;
  funding: FundingAsk;
}
