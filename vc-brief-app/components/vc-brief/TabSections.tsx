"use client"

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DollarSign,
  TrendingUp,
  Users,
  Target,
  Award,
  Building2,
  ExternalLink,
  Search,
  CheckCircle2,
  Shield,
  FileText,
  Mail,
  Calendar,
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatNumber, formatCurrency, formatPercentage } from "@/lib/utils";
import content from "@/lib/content.json";
import type { VCBriefContent, LegalCase } from "@/lib/types";

const data = content as VCBriefContent;

const COLORS = {
  primary: '#05092B',
  secondary: '#1A3859',
  accent: '#FCC169',
  link: '#007097',
};

const CHART_COLORS = ['#05092B', '#1A3859', '#007097', '#FCC169', '#4A90E2'];

// Business Model Tab
export const BusinessModel: React.FC = () => {
  const revenueData = data.business.revenueStreams.map(stream => ({
    name: stream.name,
    value: stream.percentage,
  }));

  return (
    <div className="space-y-8">
      {/* Revenue Streams */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Revenue Model</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              {data.business.revenueStreams.map((stream, idx) => (
                <div key={idx} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-brand-primary">{stream.name}</h4>
                    <span className="text-2xl font-bold text-brand-accent">{stream.percentage}%</span>
                  </div>
                  <p className="text-sm text-slate-600">{stream.description}</p>
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  dataKey="value"
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Tiers */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Pricing Tiers</CardTitle>
          <CardDescription>Per-student annual pricing based on district size</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {data.business.pricingTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`relative rounded-xl border-2 p-6 ${
                  tier.popular
                    ? 'border-brand-accent bg-brand-accent/5 shadow-lg'
                    : 'border-slate-200 bg-white'
                }`}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-accent text-brand-primary">
                    Most Popular
                  </Badge>
                )}
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-brand-primary">{tier.name}</h4>
                  <div className="mt-3">
                    <span className="text-4xl font-bold text-brand-primary">${tier.price}</span>
                    <span className="text-slate-600">/student/year</span>
                  </div>
                </div>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-600 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Unit Economics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Unit Economics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-slate-600">CAC</p>
              <p className="mt-1 text-2xl font-bold text-brand-primary">
                {formatCurrency(data.business.unitEconomics.cac)}
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-slate-600">LTV</p>
              <p className="mt-1 text-2xl font-bold text-brand-primary">
                {formatCurrency(data.business.unitEconomics.ltv)}
              </p>
            </div>
            <div className="rounded-lg border p-4 bg-green-50">
              <p className="text-sm text-slate-600">LTV:CAC Ratio</p>
              <p className="mt-1 text-2xl font-bold text-green-700">
                {data.business.unitEconomics.ltvCacRatio}:1
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-slate-600">Payback Period</p>
              <p className="mt-1 text-2xl font-bold text-brand-primary">
                {data.business.unitEconomics.paybackPeriod} mo
              </p>
            </div>
            <div className="rounded-lg border p-4 bg-blue-50">
              <p className="text-sm text-slate-600">Gross Margin</p>
              <p className="mt-1 text-2xl font-bold text-blue-700">
                {data.business.unitEconomics.grossMargin}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* GTM Strategy */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Sales Strategy</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-700 leading-relaxed">
            {data.business.salesStrategy}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Go-to-Market Approach</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.business.gtmApproach.map((approach, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Target className="h-5 w-5 flex-shrink-0 text-brand-accent mt-0.5" />
                  <span className="text-sm text-slate-700">{approach}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Traction Tab
export const Traction: React.FC = () => {
  const growthChartData = data.traction.growth.map(g => ({
    period: g.period,
    ARR: g.value,
  }));

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card-premium p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Customers</p>
              <p className="mt-2 text-3xl font-bold text-brand-primary">{data.traction.customers}</p>
            </div>
            <Building2 className="h-8 w-8 text-brand-accent" />
          </div>
        </motion.div>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="card-premium p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">ARR</p>
              <p className="mt-2 text-3xl font-bold text-brand-primary">
                {formatCurrency(data.traction.arr || 0)}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </motion.div>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="card-premium p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">MRR</p>
              <p className="mt-2 text-3xl font-bold text-brand-primary">
                {formatCurrency(data.traction.mrr || 0)}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </motion.div>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="card-premium p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Revenue</p>
              <p className="mt-2 text-3xl font-bold text-brand-primary">
                {formatCurrency(data.traction.revenue)}
              </p>
            </div>
            <Award className="h-8 w-8 text-orange-600" />
          </div>
        </motion.div>
      </div>

      {/* Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">ARR Growth Trajectory</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis tickFormatter={(value) => `$${value / 1000000}M`} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
              <Line
                type="monotone"
                dataKey="ARR"
                stroke={COLORS.primary}
                strokeWidth={3}
                dot={{ fill: COLORS.accent, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Case Studies */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Customer Success Stories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {data.traction.caseStudies.map((study, idx) => (
              <div key={idx} className="rounded-xl border-2 border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-brand-primary">{study.customerName}</h4>
                    <Badge variant="secondary" className="mt-1">{study.industry}</Badge>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <p className="text-xs font-medium text-slate-500">Challenge</p>
                    <p className="mt-1 text-sm text-slate-700">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">Solution</p>
                    <p className="mt-1 text-sm text-slate-700">{study.solution}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">Results</p>
                    <ul className="mt-1 space-y-1">
                      {study.results.map((result, ridx) => (
                        <li key={ridx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-600 mt-0.5" />
                          <span className="text-slate-700">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {study.quote && (
                    <div className="mt-4 border-l-4 border-brand-accent bg-slate-50 p-3">
                      <p className="text-sm italic text-slate-700">"{study.quote}"</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Testimonials */}
      {data.traction.testimonials.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">What Customers Say</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.traction.testimonials.map((testimonial, idx) => (
                <div key={idx} className="rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary p-6 text-white">
                  <p className="text-lg italic">"{testimonial.quote}"</p>
                  <div className="mt-4">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-blue-100">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Legal & Compliance Tab
export const LegalCompliance: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCase, setSelectedCase] = useState<LegalCase | null>(null);

  const filteredCases = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return data.legal.cases;
    return data.legal.cases.filter((c) =>
      [c.title, c.jurisdiction, c.court, c.citation, ...(c.tags || [])]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="space-y-8">
      {/* Cases Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Relevant Legal Cases</CardTitle>
          <CardDescription>Precedent cases supporting our value proposition</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by title, citation, jurisdiction, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {filteredCases.map((legalCase) => (
              <div key={legalCase.id} className="rounded-lg border p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-brand-primary">{legalCase.title}</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="outline">{legalCase.jurisdiction}</Badge>
                      <Badge variant={legalCase.status === 'precedential' ? 'success' : 'secondary'}>
                        {legalCase.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-700">{legalCase.court} • {legalCase.date}</p>
                <p className="mt-2 text-sm text-slate-600 line-clamp-3">{legalCase.summary}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {legalCase.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <Button size="sm" onClick={() => setSelectedCase(legalCase)}>
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Regulations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Key Regulations & Standards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {data.legal.regulations.map((reg) => (
              <div key={reg.id} className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-brand-primary">{reg.title}</h4>
                    <div className="mt-2 flex gap-2">
                      <Badge variant="outline">{reg.jurisdiction}</Badge>
                      <Badge variant={reg.status === 'in-force' ? 'success' : 'warning'}>
                        {reg.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-700">{reg.summary}</p>
                {reg.implications.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-slate-500">Implications:</p>
                    <ul className="mt-1 space-y-1">
                      {reg.implications.map((imp, idx) => (
                        <li key={idx} className="text-xs text-slate-600">• {imp}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <a href={reg.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center text-sm text-brand-link hover:underline">
                  View regulation <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Frameworks */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Compliance & Security</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {data.legal.complianceFrameworks.map((framework, idx) => (
              <div key={idx} className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">{framework}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Case Dialog */}
      <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        <DialogContent className="max-w-3xl">
          {selectedCase && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedCase.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Badge variant="outline">{selectedCase.jurisdiction}</Badge>
                  <Badge variant="secondary">{selectedCase.status}</Badge>
                </div>
                <p className="text-sm text-slate-600">{selectedCase.court} • {selectedCase.date} • {selectedCase.citation}</p>
                <div>
                  <h4 className="font-semibold text-brand-primary">Summary</h4>
                  <p className="mt-2 text-sm text-slate-700">{selectedCase.summary}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-brand-primary">Relevance to 4SL</h4>
                  <p className="mt-2 text-sm text-slate-700">{selectedCase.relevance}</p>
                </div>
                {selectedCase.keyPoints && selectedCase.keyPoints.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-brand-primary">Key Points</h4>
                    <ul className="mt-2 space-y-1">
                      {selectedCase.keyPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-600 mt-0.5" />
                          <span className="text-slate-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="pt-4">
                  <a href={selectedCase.url} target="_blank" rel="noreferrer">
                    <Button>
                      Read Full Case <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Competition Tab
export const Competition: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Competitive Positioning */}
      <Card className="border-t-4 border-t-brand-accent">
        <CardHeader>
          <CardTitle className="text-2xl">Competitive Positioning</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-700 text-lg leading-relaxed">
          {data.competition.positioning}
        </CardContent>
      </Card>

      {/* Competitive Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Feature Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-brand-primary">
                  <th className="pb-3 text-left font-semibold">Feature</th>
                  {data.competition.competitiveMatrix.competitors.map((comp, idx) => (
                    <th key={idx} className={`pb-3 text-center font-semibold ${comp.name === '4StudentLives' ? 'text-brand-accent' : ''}`}>
                      {comp.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.competition.competitiveMatrix.features.map((feature, fidx) => (
                  <tr key={fidx} className="border-b">
                    <td className="py-3 text-slate-700">{feature}</td>
                    {data.competition.competitiveMatrix.competitors.map((comp, cidx) => (
                      <td key={cidx} className="py-3 text-center">
                        {comp.features[fidx] ? (
                          <CheckCircle2 className="mx-auto h-5 w-5 text-green-600" />
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Vendors Detail */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Competitive Landscape</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {data.competition.vendors.map((vendor, idx) => (
              <div key={idx} className="rounded-lg border p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-brand-primary">{vendor.name}</h4>
                    <Badge variant="secondary" className="mt-2">Focus: {vendor.focus}</Badge>
                  </div>
                  <a href={vendor.url} target="_blank" rel="noreferrer" className="text-brand-link hover:underline">
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
                <p className="mt-3 text-sm text-slate-700">{vendor.notes}</p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {vendor.strengths && vendor.strengths.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-slate-500">Strengths</p>
                      <ul className="mt-2 space-y-1">
                        {vendor.strengths.map((strength, sidx) => (
                          <li key={sidx} className="text-sm text-green-700">✓ {strength}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {vendor.weaknesses && vendor.weaknesses.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-slate-500">Weaknesses</p>
                      <ul className="mt-2 space-y-1">
                        {vendor.weaknesses.map((weakness, widx) => (
                          <li key={widx} className="text-sm text-red-700">✗ {weakness}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {vendor.differentiators.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-medium text-slate-500">Key Differentiators</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {vendor.differentiators.map((diff, didx) => (
                        <Badge key={didx} variant="outline" className="text-xs">{diff}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Moat */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Our Competitive Moat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {data.competition.moat.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-lg border-l-4 border-l-brand-accent bg-slate-50 p-4">
                <Shield className="h-5 w-5 flex-shrink-0 text-brand-accent mt-0.5" />
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Funding Ask Tab
export const FundingAsk: React.FC = () => {
  const fundingData = data.funding.useOfFunds.map(item => ({
    name: item.category,
    value: item.amount,
    percentage: item.percentage,
  }));

  const projectionData = data.funding.projections.map(p => ({
    year: p.year.toString(),
    Revenue: p.revenue,
    Expenses: p.expenses,
    Profit: p.profit,
  }));

  return (
    <div className="space-y-8">
      {/* Hero Ask */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl gradient-brand p-12 text-white"
      >
        <div className="relative z-10">
          <p className="text-sm uppercase tracking-wide text-blue-200">Series A Funding Round</p>
          <h2 className="mt-2 text-5xl font-bold">{formatCurrency(data.funding.amount)}</h2>
          {data.funding.valuation && (
            <p className="mt-3 text-xl text-blue-100">
              Post-money valuation: {formatCurrency(data.funding.valuation)}
            </p>
          )}
        </div>
      </motion.div>

      {/* Use of Funds */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Use of Funds</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8 md:grid-cols-2">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={fundingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {fundingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-4">
              {data.funding.useOfFunds.map((item, idx) => (
                <div key={idx} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-brand-primary">{item.category}</h4>
                    <span className="text-lg font-bold text-brand-accent">{item.percentage}%</span>
                  </div>
                  <p className="mt-1 text-2xl font-bold text-slate-900">{formatCurrency(item.amount)}</p>
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Key Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.funding.milestones.map((milestone, idx) => (
              <div key={idx} className="flex gap-4">
                <Badge className="h-fit bg-brand-accent text-brand-primary">{milestone.quarter}</Badge>
                <div className="flex-1">
                  <h4 className="font-semibold text-brand-primary">{milestone.title}</h4>
                  <p className="mt-1 text-sm text-slate-600">{milestone.description}</p>
                  {milestone.metrics && milestone.metrics.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {milestone.metrics.map((metric, midx) => (
                        <li key={midx} className="flex items-center gap-2 text-sm">
                          <Target className="h-3 w-3 text-brand-accent" />
                          <span className="text-slate-700">{metric}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Projections */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Financial Projections</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => `$${value / 1000000}M`} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="Revenue" fill={COLORS.primary} />
              <Bar dataKey="Expenses" fill={COLORS.accent} />
              <Bar dataKey="Profit" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Exit Strategy */}
      {data.funding.exitStrategy && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Exit Strategy</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-700 leading-relaxed">
            {data.funding.exitStrategy}
          </CardContent>
        </Card>
      )}

      {/* Contact Info */}
      <Card className="border-2 border-brand-accent">
        <CardHeader>
          <CardTitle className="text-xl">Let's Connect</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-brand-primary text-lg">{data.funding.contactInfo.name}</h4>
              <p className="text-slate-600">{data.funding.contactInfo.role}</p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-brand-accent" />
                  <a href={`mailto:${data.funding.contactInfo.email}`} className="text-brand-link hover:underline">
                    {data.funding.contactInfo.email}
                  </a>
                </div>
                {data.funding.contactInfo.phone && (
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-brand-accent" />
                    <a href={`tel:${data.funding.contactInfo.phone}`} className="text-brand-link hover:underline">
                      {data.funding.contactInfo.phone}
                    </a>
                  </div>
                )}
                {data.funding.contactInfo.calendly && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-brand-accent" />
                    <a href={data.funding.contactInfo.calendly} target="_blank" rel="noreferrer" className="text-brand-link hover:underline">
                      Schedule a meeting
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Button size="lg" className="w-full md:w-auto">
                <Mail className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
