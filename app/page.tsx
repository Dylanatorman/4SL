"use client"

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  Shield,
  Brain,
  Zap,
  ChevronRight,
  ExternalLink,
  Search,
  CheckCircle2,
  Clock,
  Building2,
  Briefcase,
  Award,
  FileText,
  BarChart3,
  Printer,
  Star,
  AlertTriangle,
  Wrench,
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import { formatNumber, formatCurrency, formatPercentage } from "@/lib/utils";
import content from "@/lib/content.json";
import { suicideData, shootingData, crisisStats } from "@/lib/crisis-data";
import {
  mrrGrowthData,
  contractVelocityData,
  revenueTrajectoryData,
  revenueMixData,
  profitabilityPathData,
  cashFlowData,
  fiscalYearSummary
} from "@/lib/financial-data";

// Note: content.json structure doesn't match VCBriefContent type, using any
const data = content as any;

// Brand Colors - EXACT 4SL Palette ONLY
const COLORS = {
  primary: '#05092B',      // e-global-color-primary
  secondary: '#1A3859',    // e-global-color-secondary
  text: '#7A7A7A',         // e-global-color-text
  accent: '#FCC169',       // e-global-color-accent
  link: '#007097',         // e-global-color-fb89c3d
};

const CHART_COLORS = ['#05092B', '#1A3859', '#007097', '#FCC169', '#7A7A7A'];

// Header Component
const BrandHeader: React.FC = () => (
  <motion.header
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="sticky top-0 z-30 bg-[#1A3859] border-b border-white/10 shadow-lg"
  >
    <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
      <Image src="/4SL_logo.png" alt="4StudentLives" width={200} height={56} className="h-10 w-auto" />
      <Separator orientation="vertical" className="h-8 bg-white/30" />
      <h1 className="text-lg font-semibold tracking-tight text-white">VC Brief</h1>
      <div className="ml-auto flex items-center gap-3">
        <Badge variant="outline" className="border-white/30 text-white bg-white/5">Private • Confidential</Badge>
        <Button variant="ghost" size="sm" className="text-white print:hidden hover:bg-white/10" onClick={() => window.print()}>
          <Printer className="mr-2 h-4 w-4" />
          Print / PDF
        </Button>
      </div>
    </div>
  </motion.header>
);

// Animated Stat Card
const StatCard: React.FC<{
  label: string;
  value: string | number;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}> = ({ label, value, description, trend, icon }) => (
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="card-premium p-6"
  >
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-600">{label}</p>
        <p className="mt-2 text-3xl font-bold text-brand-primary">{value}</p>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
      {icon && <div className="rounded-lg bg-brand-accent/10 p-3 text-brand-primary">{icon}</div>}
      {trend && !icon && (
        <div className={`rounded-lg p-2 ${trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {trend === 'up' ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
        </div>
      )}
    </div>
  </motion.div>
);

// Tab 1: The Problem (Combined Crisis + Impact)
const TheProblem: React.FC = () => {
  const crisisContent = (content as any).crisis;
  const stormContent = (content as any).perfectStorm;

  // Lawsuit data for visualization
  const lawsuitData = [
    { case: 'Virginia Tech', year: 2007, amount: 11, label: '$11M' },
    { case: 'Marysville, WA', year: 2014, amount: 18, label: '$18M' },
    { case: 'Parkland, FL', year: 2018, amount: 152.5, label: '$152.5M' },
    { case: 'Cleveland v. Taft', year: 2022, amount: 2, label: '$2M' },
  ];

  // State mandate adoption timeline
  const mandateTimeline = [
    { year: 2013, states: 1, label: 'Virginia (First)' },
    { year: 2018, states: 2, label: 'Florida (Post-Parkland)' },
    { year: 2020, states: 5, label: '5 States' },
    { year: 2023, states: 11, label: '11 States' },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#05092B] to-[#1A3859] p-12 text-white shadow-2xl"
      >
        <div className="relative z-10">
          <h2 className="text-5xl font-bold">{crisisContent.title}</h2>
          <p className="mt-4 text-2xl text-white/90">{crisisContent.subtitle}</p>
          <p className="mt-6 text-lg text-white/80 max-w-3xl">{crisisContent.overview}</p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/5 to-transparent" />
      </motion.div>

      {/* Key Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {crisisContent.keyStats.map((stat: any, idx: number) => (
          <motion.div
            key={idx}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="rounded-xl shadow-lg p-6 bg-[#FCC169] hover:shadow-xl transition-all duration-300"
          >
            <p className="text-sm font-medium text-[#05092B]">{stat.label}</p>
            <p className="mt-2 text-4xl font-bold text-[#05092B]">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-[#05092B]">{stat.description}</p>
          </motion.div>
        ))}
      </div>

      {/* The Data Tells the Story - Two Graphs Side by Side */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-[#05092B]">The Data Tells the Story</CardTitle>
          <CardDescription className="text-[#05092B]">Undeniable evidence of an urgent crisis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Suicide Rate Graph */}
            <div>
              <h4 className="mb-4 text-lg font-semibold text-[#05092B]">
                Youth Suicide Rate (Ages 10-24)
              </h4>
              <p className="mb-4 text-sm text-[#05092B]">
                <strong>39% increase</strong> from 2011 to 2021
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={suicideData} margin={{ left: 20, right: 10, top: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="year"
                    ticks={[2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis domain={[7, 12]} label={{ value: 'Rate per 100k', angle: -90, position: 'insideLeft', offset: -5 }} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#05092B"
                    strokeWidth={3}
                    dot={{ fill: '#FCC169', r: 5 }}
                    name="Suicide Rate"
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="mt-3 text-xs text-[#05092B]">
                Source: CDC NCHS Data Brief 471, National Vital Statistics System
              </p>
            </div>

            {/* School Shootings Graph */}
            <div>
              <h4 className="mb-4 text-lg font-semibold text-[#05092B]">
                School Shootings with Injuries/Deaths
              </h4>
              <p className="mb-4 text-sm text-[#05092B]">
                <strong>410% increase</strong> from 2020 to 2022
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={shootingData} margin={{ left: 20, right: 10, top: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: 'Incidents', angle: -90, position: 'insideLeft', offset: -5 }} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="incidents" fill="#1A3859" name="Incidents" />
                </BarChart>
              </ResponsiveContainer>
              <p className="mt-3 text-xs text-[#05092B]">
                Source: Education Week K-12 School Shooting Tracker
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* The Common Thread - Enhanced */}
      <Card className="border-l-4 border-l-[#FCC169] bg-white">
        <CardContent className="pt-6">
          <h3 className="text-2xl font-bold text-[#05092B] mb-4">
            {crisisContent.commonThread.title}
          </h3>
          <p className="text-lg text-[#05092B] leading-relaxed mb-4">
            {crisisContent.commonThread.description}
          </p>
          <p className="text-lg text-[#05092B] leading-relaxed mb-4">
            <strong className="text-[#007097]">Students rarely "snap."</strong> They show warning signs. Threat and risk assessments catch them before harm happens: <span className="text-[#007097] font-semibold">these tools save lives by identifying kids in crisis early</span>. Schools are <strong className="text-[#007097]">legally and ethically obligated</strong> to intervene before escalation. When districts miss warning signs, <span className="text-[#007097] font-semibold">the consequences are catastrophic</span>: for students, families, and the district itself.
          </p>
          <p className="text-lg font-semibold text-[#1A3859]">
            {crisisContent.commonThread.result}
          </p>
        </CardContent>
      </Card>

      {/* The Broken System */}
      <Card className="border-t-4 border-t-[#FCC169] bg-gradient-to-br from-white to-[#007097]/5">
        <CardContent className="pt-6">
          <p className="text-lg text-[#05092B] leading-relaxed mb-4">
            Today, <span className="text-[#007097] font-semibold">threat assessments are documented on paper and locked in filing cabinets</span>. Critical information is scattered, lost, or tied to individuals who leave. Teams make life-altering decisions without complete student history. There's no data, no analytics, no trend visibility: <span className="text-[#007097] font-semibold">districts are flying blind</span>.
          </p>
          <p className="text-lg text-[#05092B] leading-relaxed mb-4">
            A safety workflow that depends on printing, scanning, and passing papers around is guaranteed to fail when it matters most. This creates a cascade of problems:
          </p>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 mt-4">
            <div className="flex gap-2">
              <span className="text-red-600 font-bold">•</span>
              <p className="text-[#05092B]">Students fall through cracks because <span className="text-[#007097] font-semibold">no one sees the full picture</span></p>
            </div>
            <div className="flex gap-2">
              <span className="text-red-600 font-bold">•</span>
              <p className="text-[#05092B]">Districts can't <span className="text-[#007097] font-semibold">track at-risk students over years or across campuses</span></p>
            </div>
            <div className="flex gap-2">
              <span className="text-red-600 font-bold">•</span>
              <p className="text-[#05092B]">Leadership has <span className="text-[#007097] font-semibold">no insight into rising risks</span> or intervention effectiveness</p>
            </div>
            <div className="flex gap-2">
              <span className="text-red-600 font-bold">•</span>
              <p className="text-[#05092B]">Missing or incomplete documentation exposes districts to <span className="text-[#007097] font-semibold">extreme liability</span></p>
            </div>
            <div className="flex gap-2">
              <span className="text-red-600 font-bold">•</span>
              <p className="text-[#05092B]">Delays and errors happen because <span className="text-[#007097] font-semibold">paper slows everything down</span></p>
            </div>
            <div className="flex gap-2">
              <span className="text-red-600 font-bold">•</span>
              <p className="text-[#05092B]">When staff turns over, <span className="text-[#007097] font-semibold">institutional memory disappears instantly</span></p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Three Forces Converging */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#05092B] to-[#1A3859] p-12 text-white shadow-2xl"
      >
        <div className="relative z-10">
          <h2 className="text-5xl font-bold">{stormContent.title}</h2>
          <p className="mt-4 text-2xl text-white/90">{stormContent.subtitle}</p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/5 to-transparent" />
      </motion.div>

      {/* Three Forces */}
      <div className="grid gap-6 lg:grid-cols-3">
        {stormContent.forces.map((force: any, idx: number) => (
          <motion.div
            key={force.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.15 }}
          >
            <div className="h-full rounded-xl shadow-lg p-6 bg-[#FCC169] hover:shadow-xl transition-all duration-300">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-white/30">
                {force.id === 'mental-health' && <Brain className="h-6 w-6 text-[#05092B]" />}
                {force.id === 'legal-regulatory' && <Shield className="h-6 w-6 text-[#05092B]" />}
                {force.id === 'financial-liability' && <DollarSign className="h-6 w-6 text-[#05092B]" />}
              </div>
              <h3 className="text-xl font-semibold text-[#05092B] mb-2">{force.title}</h3>
              <p className="text-[#05092B] font-medium mb-4">{force.subtitle}</p>
              <p className="text-sm text-[#05092B] leading-relaxed mb-4">{force.description}</p>
              <ul className="space-y-2">
                {force.keyPoints.map((point: string, pidx: number) => (
                  <li key={pidx} className="flex gap-2 text-sm text-[#05092B]">
                    <ChevronRight className="h-4 w-4 flex-shrink-0 text-[#05092B] mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legal Timeline Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-[#05092B]">Mandate Adoption Accelerating</CardTitle>
          <CardDescription className="text-[#05092B]">From 1 state in 2013 to 11 states by 2023</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mandateTimeline} margin={{ left: 20, right: 10, top: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis label={{ value: 'States with Mandates', angle: -90, position: 'insideLeft', offset: -5 }} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="states" fill="#1A3859" name="States" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {mandateTimeline.map((item, idx) => (
              <div key={idx} className="rounded-lg bg-slate-50 p-3 text-center">
                <p className="text-2xl font-bold text-[#05092B]">{item.year}</p>
                <p className="text-sm text-[#05092B]">{item.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Liability Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-[#05092B]">Escalating Financial Liability</CardTitle>
          <CardDescription className="text-[#05092B]">Major settlements for failure to identify and document threats</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={lawsuitData} margin={{ left: 20, right: 10, top: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis label={{ value: 'Settlement ($M)', angle: -90, position: 'insideLeft', offset: -5 }} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value: number) => `$${value}M`} />
              <Bar dataKey="amount" fill="#05092B" name="Settlement Amount" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {lawsuitData.map((lawsuit, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-xl shadow-lg p-4 bg-[#FCC169] hover:shadow-xl transition-all duration-300"
              >
                <p className="text-xs font-medium text-[#05092B]">{lawsuit.case}</p>
                <p className="mt-1 text-2xl font-bold text-[#05092B]">{lawsuit.label}</p>
                <p className="mt-1 text-xs text-[#05092B]">{lawsuit.year}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Convergence Statement */}
      <Card className="border-l-4 border-l-[#FCC169] bg-white">
        <CardContent className="pt-6">
          <h3 className="text-2xl font-bold text-[#05092B] mb-4">The Convergence</h3>
          <p className="text-lg text-[#05092B] leading-relaxed">
            {stormContent.convergence}
          </p>
        </CardContent>
      </Card>

      {/* Sources */}
      <Card className="bg-slate-50">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Sources & Citations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-xs text-slate-600">
            <li>
              <strong>CDC Youth Risk Behavior Surveillance System (2023)</strong> -{' '}
              <a href="https://www.cdc.gov/healthyyouth/data/yrbs/index.htm" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://www.cdc.gov/healthyyouth/data/yrbs/index.htm
              </a>
            </li>
            <li>
              <strong>CDC NCHS Data Brief 471 (Suicide Rates 2011-2021)</strong> -{' '}
              <a href="https://www.cdc.gov/nchs/data/databriefs/db471-tables.pdf" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://www.cdc.gov/nchs/data/databriefs/db471-tables.pdf
              </a>
            </li>
            <li>
              <strong>Education Week School Shootings Tracker (2018-2024)</strong> -{' '}
              <a href="https://www.edweek.org/leadership/school-shootings-this-year-how-many-and-where/2025/01" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://www.edweek.org/leadership/school-shootings-this-year-how-many-and-where/2025/01
              </a>
            </li>
            <li>
              <strong>Everytown Research on School Shootings</strong> -{' '}
              <a href="https://everytownresearch.org" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://everytownresearch.org
              </a>
            </li>
            <li>
              <strong>Virginia Tech Settlement (2007)</strong> -{' '}
              <a href="https://www.edweek.org" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                Education Week Legal Analysis
              </a>
            </li>
            <li>
              <strong>Parkland Settlements ($152.5M Total)</strong> -{' '}
              <a href="https://www.edweek.org" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                Education Week Coverage
              </a>
            </li>
            <li>
              <strong>U.S. Department of Homeland Security - School Safety Guidance</strong> -{' '}
              <a href="https://www.dhs.gov" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://www.dhs.gov
              </a>
            </li>
            <li>
              <strong>U.S. Secret Service NTAC - Threat Assessment Guidelines</strong> -{' '}
              <a href="https://www.secretservice.gov/reports" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://www.secretservice.gov/reports
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

// Tab 2: Impact (DEPRECATED - Now merged into TheProblem)
const PerfectStorm: React.FC = () => {
  const stormContent = (content as any).perfectStorm;

  // Lawsuit data for visualization
  const lawsuitData = [
    { case: 'Virginia Tech', year: 2007, amount: 11, label: '$11M' },
    { case: 'Marysville, WA', year: 2014, amount: 18, label: '$18M' },
    { case: 'Parkland, FL', year: 2018, amount: 152.5, label: '$152.5M' },
    { case: 'Cleveland v. Taft', year: 2022, amount: 2, label: '$2M' },
  ];

  // State mandate adoption timeline
  const mandateTimeline = [
    { year: 2013, states: 1, label: 'Virginia (First)' },
    { year: 2018, states: 2, label: 'Florida (Post-Parkland)' },
    { year: 2020, states: 5, label: '5 States' },
    { year: 2023, states: 11, label: '11 States' },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#05092B] to-[#1A3859] p-12 text-white shadow-2xl"
      >
        <div className="relative z-10">
          <h2 className="text-5xl font-bold">{stormContent.title}</h2>
          <p className="mt-4 text-2xl text-white/90">{stormContent.subtitle}</p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/5 to-transparent" />
      </motion.div>

      {/* Three Forces */}
      <div className="grid gap-6 lg:grid-cols-3">
        {stormContent.forces.map((force: any, idx: number) => (
          <motion.div
            key={force.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.15 }}
          >
            <div className="h-full rounded-xl shadow-lg p-6 bg-[#FCC169] hover:shadow-xl transition-all duration-300">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-white/30">
                {force.id === 'mental-health' && <Brain className="h-6 w-6 text-[#05092B]" />}
                {force.id === 'legal-regulatory' && <Shield className="h-6 w-6 text-[#05092B]" />}
                {force.id === 'financial-liability' && <DollarSign className="h-6 w-6 text-[#05092B]" />}
              </div>
              <h3 className="text-xl font-semibold text-[#05092B] mb-2">{force.title}</h3>
              <p className="text-[#05092B] font-medium mb-4">{force.subtitle}</p>
              <p className="text-sm text-[#05092B] leading-relaxed mb-4">{force.description}</p>
              <ul className="space-y-2">
                {force.keyPoints.map((point: string, pidx: number) => (
                  <li key={pidx} className="flex gap-2 text-sm text-[#05092B]">
                    <ChevronRight className="h-4 w-4 flex-shrink-0 text-[#05092B] mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legal Timeline Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-[#05092B]">Mandate Adoption Accelerating</CardTitle>
          <CardDescription className="text-[#05092B]">From 1 state in 2013 to 11 states by 2023</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mandateTimeline} margin={{ left: 20, right: 10, top: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis label={{ value: 'States with Mandates', angle: -90, position: 'insideLeft', offset: -5 }} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="states" fill="#1A3859" name="States" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {mandateTimeline.map((item, idx) => (
              <div key={idx} className="rounded-lg bg-slate-50 p-3 text-center">
                <p className="text-2xl font-bold text-[#05092B]">{item.year}</p>
                <p className="text-sm text-[#05092B]">{item.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Liability Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-[#05092B]">Escalating Financial Liability</CardTitle>
          <CardDescription className="text-[#05092B]">Major settlements for failure to identify and document threats</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={lawsuitData} margin={{ left: 20, right: 10, top: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis label={{ value: 'Settlement ($M)', angle: -90, position: 'insideLeft', offset: -5 }} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value: number) => `$${value}M`} />
              <Bar dataKey="amount" fill="#05092B" name="Settlement Amount" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {lawsuitData.map((lawsuit, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-xl shadow-lg p-4 bg-[#FCC169] hover:shadow-xl transition-all duration-300"
              >
                <p className="text-xs font-medium text-[#05092B]">{lawsuit.case}</p>
                <p className="mt-1 text-2xl font-bold text-[#05092B]">{lawsuit.label}</p>
                <p className="mt-1 text-xs text-[#05092B]">{lawsuit.year}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Convergence Statement */}
      <Card className="border-l-4 border-l-[#FCC169] bg-white">
        <CardContent className="pt-6">
          <h3 className="text-2xl font-bold text-[#05092B] mb-4">The Convergence</h3>
          <p className="text-lg text-[#05092B] leading-relaxed">
            {stormContent.convergence}
          </p>
        </CardContent>
      </Card>

      {/* Sources */}
      <Card className="bg-slate-50">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Sources & Citations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-xs text-slate-600">
            <li>
              <strong>CDC Youth Risk Behavior Surveillance System (2023)</strong> -{' '}
              <a href="https://www.cdc.gov/healthyyouth/data/yrbs/index.htm" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://www.cdc.gov/healthyyouth/data/yrbs/index.htm
              </a>
            </li>
            <li>
              <strong>CDC NCHS Data Brief 471 (Suicide Rates)</strong> -{' '}
              <a href="https://www.cdc.gov/nchs/data/databriefs/db471-tables.pdf" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://www.cdc.gov/nchs/data/databriefs/db471-tables.pdf
              </a>
            </li>
            <li>
              <strong>Education Week School Shooting Tracker</strong> -{' '}
              <a href="https://www.edweek.org/leadership/school-shootings-this-year-how-many-and-where/2025/01" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://www.edweek.org/leadership/school-shootings-this-year-how-many-and-where/2025/01
              </a>
            </li>
            <li>
              <strong>Virginia Tech Settlement (2007)</strong> -{' '}
              <a href="https://www.edweek.org" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                Education Week Legal Analysis
              </a>
            </li>
            <li>
              <strong>Parkland Settlements ($152.5M Total)</strong> -{' '}
              <a href="https://www.edweek.org" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                Education Week Coverage
              </a>
            </li>
            <li>
              <strong>U.S. Department of Homeland Security - School Safety Guidance</strong> -{' '}
              <a href="https://www.dhs.gov" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://www.dhs.gov
              </a>
            </li>
            <li>
              <strong>U.S. Secret Service NTAC - Threat Assessment Guidelines</strong> -{' '}
              <a href="https://www.secretservice.gov/reports" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://www.secretservice.gov/reports
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

// Tab 3: The Solution
const TheSolution: React.FC = () => {
  const solutionContent = (content as any).solution;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#05092B] to-[#1A3859] p-8 text-white shadow-2xl"
      >
        <div className="relative z-10">
          <p className="text-lg text-white/80 max-w-4xl leading-relaxed">{solutionContent.overview}</p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/5 to-transparent" />
      </motion.div>

      {/* Mission Statement */}
      <Card className="border-l-4 border-l-[#FCC169] bg-gradient-to-br from-white to-slate-50">
        <CardContent className="pt-6">
          <div className="flex gap-4 items-start">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#FCC169]/20">
              <Target className="h-6 w-6 text-[#05092B]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#05092B] mb-3">Our Mission</h3>
              <p className="text-[#05092B] leading-relaxed">{solutionContent.mission}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What We Replace - Before/After Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-[#05092B]">What We Replace</CardTitle>
          <CardDescription className="text-[#05092B]">From fragmented chaos to unified system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {solutionContent.whatWeReplace.map((item: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-lg bg-[#FCC169] p-4 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <p className="text-sm text-[#05092B] line-through">{item.old}</p>
                <div className="my-2 flex justify-center">
                  <ChevronRight className="h-4 w-4 text-[#05092B]" />
                </div>
                <p className="text-sm font-semibold text-[#05092B]">{item.new}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Core Capabilities by Category */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-[#05092B]">Core Capabilities</h3>
        {solutionContent.coreCapabilities.map((category: any, idx: number) => (
          <motion.div
            key={idx}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="border-t-4 border-t-[#FCC169]">
              <CardHeader>
                <CardTitle className="text-xl text-[#05092B] flex items-center gap-2">
                  {idx === 0 && <Brain className="h-5 w-5 text-[#FCC169]" />}
                  {idx === 1 && <Shield className="h-5 w-5 text-[#FCC169]" />}
                  {idx === 2 && <CheckCircle2 className="h-5 w-5 text-[#FCC169]" />}
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {category.features.map((feature: any, fidx: number) => (
                    <div key={fidx} className="flex gap-3 rounded-lg bg-slate-50 p-4">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[#FCC169]" />
                      <div>
                        <h5 className="font-semibold text-[#05092B]">{feature.title}</h5>
                        <p className="mt-1 text-sm text-[#05092B]">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* What 4StudentLives Delivers */}
      <Card className="border-t-4 border-t-[#FCC169] bg-gradient-to-br from-white to-[#007097]/5">
        <CardContent className="pt-6">
          <p className="text-lg text-[#05092B] leading-relaxed mb-4">
            4StudentLives delivers a <strong className="text-[#007097]">centralized, districtwide safety record that never gets lost</strong>. Every team member sees the same case instantly through <span className="text-[#007097] font-semibold">real-time collaboration</span>. <span className="text-[#007097] font-semibold">Automated workflows eliminate missed steps</span> and delayed responses.
          </p>
          <p className="text-lg text-[#05092B] leading-relaxed mb-4">
            For the first time, districts have <strong className="text-[#007097]">data, analytics, and reporting that provide true visibility</strong> into student safety trends. Secure, compliant digital storage with full audit trails ensures nothing is ever lost. Most importantly, <strong className="text-[#007097]">permanent institutional memory protects students no matter who leaves</strong>: the knowledge stays with the district, not in someone's filing cabinet.
          </p>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 mt-4">
            <div className="flex gap-2">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[#007097] mt-0.5" />
              <p className="text-[#05092B]"><span className="text-[#007097] font-semibold">Centralized safety records</span> that never get lost</p>
            </div>
            <div className="flex gap-2">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[#007097] mt-0.5" />
              <p className="text-[#05092B]"><span className="text-[#007097] font-semibold">Real-time collaboration</span> across all team members</p>
            </div>
            <div className="flex gap-2">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[#007097] mt-0.5" />
              <p className="text-[#05092B]"><span className="text-[#007097] font-semibold">Automated workflows</span> that eliminate missed steps</p>
            </div>
            <div className="flex gap-2">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[#007097] mt-0.5" />
              <p className="text-[#05092B]"><span className="text-[#007097] font-semibold">Data, analytics, and reporting</span> for district visibility</p>
            </div>
            <div className="flex gap-2">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[#007097] mt-0.5" />
              <p className="text-[#05092B]">Secure, compliant digital storage with <span className="text-[#007097] font-semibold">full audit trails</span></p>
            </div>
            <div className="flex gap-2">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[#007097] mt-0.5" />
              <p className="text-[#05092B]"><span className="text-[#007097] font-semibold">Permanent institutional memory</span> that survives staff turnover</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* The Core Value */}
      <Card className="border-l-4 border-l-[#FCC169] bg-gradient-to-br from-[#FCC169]/10 to-[#007097]/5">
        <CardContent className="pt-6">
          <p className="text-xl text-[#05092B] leading-relaxed mb-3">
            <strong>We replace a <span className="text-[#007097]">broken paper system</span> with a <span className="text-[#007097]">modern, accountable safety platform</span>.</strong>
          </p>
          <p className="text-lg text-[#05092B] leading-relaxed mb-3">
            We give districts the <span className="text-[#007097] font-semibold">visibility and speed</span> needed to prevent tragedies. We ensure <strong className="text-[#007097]">no student in crisis ever gets lost in a filing cabinet again</strong>.
          </p>
          <p className="text-lg font-semibold text-[#1A3859]">
            This is the transformation that <span className="text-[#007097]">saves lives</span> and <span className="text-[#007097]">protects districts</span>.
          </p>
        </CardContent>
      </Card>

      {/* Sources */}
      <Card className="bg-slate-50">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Sources & Citations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-xs text-slate-600">
            <li>
              <strong>U.S. Department of Homeland Security - School Safety Resources</strong> -{' '}
              <a href="https://www.dhs.gov" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://www.dhs.gov
              </a>
            </li>
            <li>
              <strong>U.S. Secret Service NTAC - Comprehensive School Threat Assessment Guidelines</strong> -{' '}
              <a href="https://www.secretservice.gov/reports" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://www.secretservice.gov/reports
              </a>
            </li>
            <li>
              <strong>California SB 906 (2023) - Homicidal Threat Reporting Requirements</strong> -{' '}
              <a href="https://leginfo.legislature.ca.gov" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://leginfo.legislature.ca.gov
              </a>
            </li>
            <li>
              <strong>California SB 1241 (SAFE Act) - Threat Assessment Team Mandate</strong> -{' '}
              <a href="https://leginfo.legislature.ca.gov" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://leginfo.legislature.ca.gov
              </a>
            </li>
            <li>
              <strong>Florida CSTAG Model - Comprehensive School Threat Assessment Guidelines</strong> -{' '}
              <a href="https://www.fldoe.org/safe-schools" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://www.fldoe.org/safe-schools
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

// Tab 4: The Mandate Landscape
const TheMandates: React.FC = () => {
  const mandatesContent = (content as any).mandates;
  const [searchQuery, setSearchQuery] = useState("");

  // Filter states based on search
  const filteredStates = mandatesContent.states.filter((state: any) =>
    state.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#05092B] to-[#1A3859] p-12 text-white shadow-2xl"
      >
        <div className="relative z-10">
          <h2 className="text-5xl font-bold">{mandatesContent.title}</h2>
          <p className="mt-4 text-2xl text-white/90">{mandatesContent.subtitle}</p>
          <p className="mt-6 text-lg text-white/80 max-w-4xl leading-relaxed">{mandatesContent.overview}</p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/5 to-transparent" />
      </motion.div>

      {/* 11 States Summary */}
      <Card className="border-t-4 border-t-[#FCC169]">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-[#FCC169]/20">
              <p className="text-4xl font-bold text-[#05092B]">11</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#05092B]">States Now Mandate Threat Assessment Programs</h3>
              <p className="mt-2 text-[#05092B]">
                Virginia (2013) → Florida (2018) → 9 more states (2019-2023) → California pending (2027)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search States */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-[#05092B]">State-by-State Requirements</CardTitle>
          <CardDescription className="text-[#05092B]">Search and explore mandate details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex items-center gap-2">
            <Search className="h-5 w-5 text-[#05092B]" />
            <Input
              type="text"
              placeholder="Search states..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredStates.map((state: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="h-full border-l-4 border-l-[#FCC169] hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg text-[#05092B]">{state.state}</CardTitle>
                      {state.year && (
                        <Badge variant="outline" className="border-[#FCC169] text-[#05092B]">
                          {state.year}
                        </Badge>
                      )}
                    </div>
                    {state.statute && (
                      <p className="text-xs text-[#05092B] font-mono mt-1">{state.statute}</p>
                    )}
                    {state.act && (
                      <p className="text-xs text-[#007097] font-semibold mt-1">{state.act}</p>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {state.significance && (
                      <p className="text-sm text-[#05092B] font-semibold italic">{state.significance}</p>
                    )}
                    {state.requirements && (
                      <ul className="space-y-1.5">
                        {state.requirements.map((req: string, ridx: number) => (
                          <li key={ridx} className="flex gap-2 text-xs text-[#05092B]">
                            <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-[#FCC169] mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {state.legislation && (
                      <p className="text-xs text-[#05092B] italic">
                        See California Deep Dive section below for detailed requirements
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* California Header */}
      <div className="mt-8 mb-6">
        <h2 className="text-4xl font-bold text-[#05092B] text-center">California</h2>
      </div>

      {/* California Compliance - SB 906 */}
      <Card className="border-t-4 border-t-[#FCC169] bg-gradient-to-br from-white to-slate-50">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl text-[#05092B]">📋 SB 906</CardTitle>
              <CardDescription className="text-[#05092B] mt-2">
                Homicidal Threat Reporting Requirements
              </CardDescription>
            </div>
            <Badge className="bg-green-600 text-white">Enacted 2023</Badge>
          </div>
          <p className="text-sm text-[#05092B] mt-3">
            Requires school officials to report any homicidal threat to law enforcement, which must immediately conduct a threat assessment
          </p>
        </CardHeader>
        <CardContent>
          {/* Column Headers */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="text-center py-2 bg-slate-200 rounded-lg">
              <h3 className="font-bold text-[#05092B]">SB 906 Requires</h3>
            </div>
            <div className="text-center py-2 bg-[#FCC169] rounded-lg">
              <h3 className="font-bold text-[#05092B]">4StudentLives</h3>
            </div>
          </div>

          <div className="space-y-3">
            {/* SB 906 Requirements */}
            {[
              {
                solution: "Automated Alert System",
                description: "Instant notifications to administrators and designated staff when threats are flagged",
                mandate: "Mandatory reporting of homicidal threats (grades 6-12)"
              },
              {
                solution: "Law Enforcement Integration",
                description: "One-click notification system with documented communication logs",
                mandate: "Immediate law enforcement involvement"
              },
              {
                solution: "Digital Workflow Engine",
                description: "Every step timestamped, logged, and audit-ready with full compliance documentation",
                mandate: "Documented procedures required"
              },
              {
                solution: "Team Collaboration Portal",
                description: "Secure space for counselors, administrators, SROs, and external partners to coordinate",
                mandate: "Multidisciplinary coordination expected"
              }
            ].map((item, idx) => (
              <div key={idx} className="grid md:grid-cols-2 gap-4 rounded-lg overflow-hidden border border-slate-200">
                {/* SB 906 Requirement - LEFT */}
                <div className="bg-slate-50 border-l-2 border-l-[#05092B] p-4 flex items-center">
                  <div className="flex items-start gap-3 w-full">
                    <Shield className="h-5 w-5 flex-shrink-0 text-[#05092B] mt-0.5" />
                    <p className="text-sm text-[#05092B] font-medium">{item.mandate}</p>
                  </div>
                </div>

                {/* 4StudentLives Solution - RIGHT */}
                <div className="bg-white border-r-4 border-r-[#FCC169] p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-[#05092B]">{item.solution}</h4>
                      <p className="text-sm text-[#05092B] mt-1">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* California Compliance - SB 1241 */}
      <Card className="border-t-4 border-t-[#FCC169] bg-gradient-to-br from-white to-slate-50">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl text-[#05092B]">📋 SB 1241 (SAFE Act)</CardTitle>
              <CardDescription className="text-[#05092B] mt-2">
                Threat Assessment Team Mandate
              </CardDescription>
            </div>
            <Badge variant="outline" className="border-[#007097] text-[#007097]">Pending</Badge>
          </div>
          <p className="text-sm text-[#05092B] mt-3">
            Would mandate every middle and high school to establish a multidisciplinary threat assessment team
          </p>
          <p className="text-sm font-semibold text-[#05092B] mt-2">
            Deadline: July 2027
          </p>
        </CardHeader>
        <CardContent>
          {/* Column Headers */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="text-center py-2 bg-slate-200 rounded-lg">
              <h3 className="font-bold text-[#05092B]">SB 1241 Requires</h3>
            </div>
            <div className="text-center py-2 bg-[#FCC169] rounded-lg">
              <h3 className="font-bold text-[#05092B]">4StudentLives</h3>
            </div>
          </div>

          <div className="space-y-3">
            {/* SB 1241 Requirements */}
            {[
              {
                solution: "Team Management Module",
                description: "Create, assign, and manage multidisciplinary teams with role-based access",
                mandate: "Threat assessment teams at all middle/high schools",
                completed: true
              },
              {
                solution: "Built-in Training Resources",
                description: "Evidence-based protocols and best practices embedded in platform",
                mandate: "Certified training for team members",
                completed: true
              },
              {
                solution: "Comprehensive Digital Records",
                description: "Complete audit trail from initial concern through intervention and follow-up",
                mandate: "Digital record of assessments and outcomes",
                completed: true
              },
              {
                solution: "Currently in Development",
                description: "Expected Q2 2026",
                mandate: "24/7 anonymous reporting line",
                completed: false
              }
            ].map((item, idx) => (
              <div key={idx} className="grid md:grid-cols-2 gap-4 rounded-lg overflow-hidden border border-slate-200">
                {/* SB 1241 Requirement - LEFT */}
                <div className="bg-slate-50 border-l-2 border-l-[#05092B] p-4 flex items-center">
                  <div className="flex items-start gap-3 w-full">
                    <Shield className="h-5 w-5 flex-shrink-0 text-[#05092B] mt-0.5" />
                    <p className="text-sm text-[#05092B] font-medium">{item.mandate}</p>
                  </div>
                </div>

                {/* 4StudentLives Solution - RIGHT */}
                <div className="bg-white border-r-4 border-r-[#FCC169] p-4">
                  <div className="flex items-start gap-3">
                    {item.completed ? (
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600 mt-0.5" />
                    ) : (
                      <Wrench className="h-5 w-5 flex-shrink-0 text-[#FCC169] mt-0.5" />
                    )}
                    <div>
                      <h4 className="font-bold text-[#05092B]">{item.solution}</h4>
                      <p className="text-sm text-[#05092B] mt-1">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Federal Guidance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-[#05092B]">Federal Guidance</CardTitle>
          <CardDescription className="text-[#05092B]">National recommendations supporting state mandates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {mandatesContent.federalGuidance.map((guidance: any, idx: number) => (
              <div key={idx} className="rounded-lg border-l-4 border-l-[#FCC169] bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 flex-shrink-0 text-[#05092B]" />
                  <div>
                    <h4 className="font-semibold text-[#05092B]">{guidance.agency}</h4>
                    {guidance.model && <p className="text-xs text-[#05092B] mt-1">{guidance.model}</p>}
                    <p className="mt-2 text-sm text-[#05092B]">{guidance.recommendation}</p>
                    <a
                      href={guidance.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#007097] hover:underline mt-2"
                    >
                      View Resources
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sources */}
      <Card className="bg-slate-50">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Sources & Citations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-xs text-slate-600">
            <li>
              <strong>Florida CSTAG Model</strong> -{' '}
              <a href="https://www.fldoe.org/safe-schools" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://www.fldoe.org/safe-schools
              </a>
            </li>
            <li>
              <strong>California SB 906 (Bill Status)</strong> -{' '}
              <a href="https://leginfo.legislature.ca.gov/faces/billStatusClient.xhtml?bill_id=202320240SB906" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://leginfo.legislature.ca.gov/faces/billStatusClient.xhtml?bill_id=202320240SB906
              </a>
            </li>
            <li>
              <strong>California SB 906 (Full Text)</strong> -{' '}
              <a href="https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202320240SB906" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202320240SB906
              </a>
            </li>
            <li>
              <strong>California SB 1241 - SAFE Act (Bill Status)</strong> -{' '}
              <a href="https://leginfo.legislature.ca.gov/faces/billStatusClient.xhtml?bill_id=202320240SB1241" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://leginfo.legislature.ca.gov/faces/billStatusClient.xhtml?bill_id=202320240SB1241
              </a>
            </li>
            <li>
              <strong>California SB 1241 - SAFE Act (Full Text)</strong> -{' '}
              <a href="https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202320240SB1241" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202320240SB1241
              </a>
            </li>
            <li>
              <strong>Virginia Code §22.1-79.4</strong> -{' '}
              <a href="https://law.lis.virginia.gov" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://law.lis.virginia.gov
              </a>
            </li>
            <li>
              <strong>Texas Education Code §37.115</strong> -{' '}
              <a href="https://statutes.capitol.texas.gov" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://statutes.capitol.texas.gov
              </a>
            </li>
            <li>
              <strong>Illinois 105 ILCS 128/45</strong> -{' '}
              <a href="https://www.ilga.gov" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://www.ilga.gov
              </a>
            </li>
            <li>
              <strong>U.S. Department of Homeland Security</strong> -{' '}
              <a href="https://www.dhs.gov" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://www.dhs.gov
              </a>
            </li>
            <li>
              <strong>U.S. Secret Service NTAC</strong> -{' '}
              <a href="https://www.secretservice.gov/reports" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://www.secretservice.gov/reports
              </a>
            </li>
            <li>
              <em>Additional state statute citations available in state cards above</em>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

// Tab 5: California Momentum
const CaliforniaMomentum: React.FC = () => {
  const californiaContent = (content as any).california;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#05092B] to-[#1A3859] p-12 text-white shadow-2xl"
      >
        <div className="relative z-10">
          <h2 className="text-5xl font-bold">{californiaContent.title}</h2>
          <p className="mt-4 text-2xl text-white/90">{californiaContent.subtitle}</p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/5 to-transparent" />
      </motion.div>

      {/* Overview */}
      <Card className="border-l-4 border-l-[#FCC169]">
        <CardContent className="pt-6">
          <p className="text-lg text-[#05092B] leading-relaxed">{californiaContent.overview}</p>
        </CardContent>
      </Card>

      {/* Stats at a Glance */}
      <div className="space-y-4">
        <h3 className="text-3xl font-bold text-[#05092B]">Stats at a Glance</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {californiaContent.statsAtAGlance.map((stat: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="rounded-xl shadow-lg p-6 bg-[#FCC169] hover:shadow-xl transition-all duration-300">
                <p className="text-sm font-medium text-[#05092B]">{stat.label}</p>
                <p className="mt-2 text-4xl font-bold text-[#05092B]">{stat.value}</p>
                <p className="mt-2 text-sm text-[#05092B]">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Discovery Findings */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-[#05092B]">Discovery Findings</h3>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Mandate Readiness & Gaps */}
          <Card className="border-t-4 border-t-[#FCC169]">
            <CardHeader>
              <CardTitle className="text-xl text-[#05092B]">Mandate Readiness & Gaps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {californiaContent.mandateReadiness.map((item: any, idx: number) => {
                // Color based on percentage ranges
                const getColor = (percentage: number) => {
                  if (percentage >= 90 && percentage < 100) return { text: 'text-green-600', bg: 'bg-green-500' };
                  if (percentage >= 70 && percentage < 80) return { text: 'text-[#FCC169]', bg: 'bg-[#FCC169]' };
                  if (percentage >= 20 && percentage < 30) return { text: 'text-red-600', bg: 'bg-red-500' };
                  // Fallback for other ranges (like 97%)
                  if (percentage >= 90) return { text: 'text-green-600', bg: 'bg-green-500' };
                  return { text: 'text-red-600', bg: 'bg-red-500' };
                };
                const colors = getColor(item.percentage);

                return (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-sm text-[#05092B] flex-1">{item.metric}</p>
                    <p className={`text-lg font-bold ${colors.text}`}>
                      {item.percentage}%
                    </p>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colors.bg}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  {item.status === 'gap' && (
                    <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                      <span className="h-3 w-3 flex items-center justify-center rounded-full bg-red-100 text-xs">!</span>
                      THE GAP
                    </p>
                  )}
                  {item.status === 'opportunity' && (
                    <p className="text-xs text-[#FCC169] font-medium flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      THE OPPORTUNITY
                    </p>
                  )}
                </div>
              );
              })}
            </CardContent>
          </Card>

          {/* Current State */}
          <Card className="border-t-4 border-t-[#FCC169]">
            <CardHeader>
              <CardTitle className="text-xl text-[#05092B]">Current State of Case Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {californiaContent.currentState.map((item: any, idx: number) => {
                // Color based on percentage ranges
                const getColor = (percentage: number) => {
                  if (percentage >= 90 && percentage < 100) return { text: 'text-green-600', bg: 'bg-green-500' };
                  if (percentage >= 70 && percentage < 80) return { text: 'text-[#FCC169]', bg: 'bg-[#FCC169]' };
                  if (percentage >= 20 && percentage < 30) return { text: 'text-red-600', bg: 'bg-red-500' };
                  // Fallback for other ranges
                  if (percentage >= 90) return { text: 'text-green-600', bg: 'bg-green-500' };
                  return { text: 'text-red-600', bg: 'bg-red-500' };
                };
                const colors = getColor(item.percentage);

                return (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-sm text-[#05092B] flex-1">{item.finding}</p>
                    <p className={`text-lg font-bold ${colors.text}`}>
                      {item.percentage}%
                    </p>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colors.bg}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  {item.impact === 'high' && (
                    <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      HIGH RISK
                    </p>
                  )}
                  {item.impact === 'opportunity' && (
                    <p className="text-xs text-[#FCC169] font-medium flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      OPPORTUNITY
                    </p>
                  )}
                </div>
              );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* The Opportunity Statement */}
      <Card className="border-t-4 border-t-[#FCC169] bg-gradient-to-br from-[#FCC169]/5 to-[#FCC169]/10">
        <CardContent className="pt-6 text-center">
          <div className="flex gap-4 items-center justify-center">
            <Star className="h-8 w-8 text-[#FCC169] flex-shrink-0" />
            <p className="text-2xl font-bold text-[#05092B]">{californiaContent.theOpportunity}</p>
            <Star className="h-8 w-8 text-[#FCC169] flex-shrink-0" />
          </div>
        </CardContent>
      </Card>

      {/* Partnership Letter */}
      <Card className="border-l-4 border-l-[#FCC169] bg-gradient-to-br from-white to-amber-50/30">
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#FCC169]/20">
              <FileText className="h-6 w-6 text-[#05092B]" />
            </div>
            <div>
              <CardTitle className="text-2xl text-[#05092B]">{californiaContent.partnershipLetter.subject}</CardTitle>
              <CardDescription className="text-[#05092B] mt-2">
                <strong>{californiaContent.partnershipLetter.source}</strong><br />
                {californiaContent.partnershipLetter.date}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Partnership Letter Image */}
            <div className="w-full border border-slate-200 rounded-lg overflow-hidden bg-white">
              <img
                src="/partnership-letter.png"
                alt="California County Superintendents Partnership Letter"
                className="w-full h-auto"
              />
            </div>
            {/* Download Link */}
            <div className="flex justify-center">
              <a
                href="/CA Superintendent Partnership Letter.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FCC169] text-[#05092B] font-semibold rounded-lg hover:bg-[#FCC169]/90 transition-colors"
              >
                <FileText className="h-5 w-5" />
                Download Partnership Letter (PDF)
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sources & Citations */}
      <Card className="bg-slate-50">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Sources & Citations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-xs text-slate-600">
            <li>
              <strong>California County Superintendents Educational Services Association</strong> -{' '}
              <em>12-month discovery engagement (2024-2025)</em>
            </li>
            <li>
              <strong>Discovery Data Collection</strong> -{' '}
              <em>100+ sessions with 480-520 respondents across 45 of 58 California counties</em>
            </li>
            <li>
              <strong>California SB 906 (2023)</strong> -{' '}
              <a href="https://leginfo.legislature.ca.gov" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://leginfo.legislature.ca.gov
              </a>
            </li>
            <li>
              <strong>California SB 1241 (SAFE Act)</strong> -{' '}
              <a href="https://leginfo.legislature.ca.gov" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://leginfo.legislature.ca.gov
              </a>
              {' '}- Pending with July 2027 deadline
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

// Tab 6: Why We Win
const WhyWeWin: React.FC = () => {
  const competitionContent = (content as any).competition;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#05092B] to-[#1A3859] p-12 text-white shadow-2xl"
      >
        <div className="relative z-10">
          <h2 className="text-5xl font-bold">{competitionContent.title}</h2>
          <p className="mt-4 text-2xl text-white/90">{competitionContent.subtitle}</p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/5 to-transparent" />
      </motion.div>

      {/* Positioning Statement */}
      <Card className="border-l-4 border-l-[#FCC169] bg-gradient-to-br from-white to-slate-50">
        <CardContent className="pt-6">
          <div className="flex gap-4 items-start">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#FCC169]/20">
              <Target className="h-6 w-6 text-[#05092B]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#05092B] mb-3">Our Position</h3>
              <p className="text-[#05092B] leading-relaxed">{competitionContent.positioning}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competitor Analysis */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-[#05092B]">Competitive Landscape</h3>
        {competitionContent.competitors.map((competitor: any, idx: number) => (
          <motion.div
            key={idx}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="border-l-4 border-l-[#FCC169]">
              <CardHeader>
                <CardTitle className="text-2xl text-[#05092B]">{competitor.name}</CardTitle>
                <CardDescription className="text-[#05092B] font-medium text-base">{competitor.focus}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Strengths */}
                  <div className="rounded-lg bg-green-50/50 border border-green-200/50 p-4">
                    <h4 className="text-sm font-semibold text-[#05092B] mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Strengths
                    </h4>
                    <ul className="space-y-2">
                      {competitor.strengths.map((strength: string, sidx: number) => (
                        <li key={sidx} className="flex gap-2 text-sm text-[#05092B]">
                          <span className="text-green-600 font-bold">+</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="rounded-lg bg-red-50/30 border border-red-200/50 p-4">
                    <h4 className="text-sm font-semibold text-[#05092B] mb-3 flex items-center gap-2">
                      <span className="h-4 w-4 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-xs">✕</span>
                      Weaknesses
                    </h4>
                    <ul className="space-y-2">
                      {competitor.weaknesses.map((weakness: string, widx: number) => (
                        <li key={widx} className="flex gap-2 text-sm text-[#05092B]">
                          <span className="text-red-600 font-bold">−</span>
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Gap Summary */}
                <div className="mt-4 rounded-lg bg-[#FCC169]/10 border border-[#FCC169]/30 p-4">
                  <h4 className="text-sm font-semibold text-[#05092B] mb-2">The Gap</h4>
                  <p className="text-sm text-[#05092B]">{competitor.gap}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Our Moat */}
      <Card className="border-t-4 border-t-[#FCC169] bg-gradient-to-br from-white to-slate-50">
        <CardHeader>
          <CardTitle className="text-2xl text-[#05092B] flex items-center gap-2">
            <Shield className="h-6 w-6 text-[#FCC169]" />
            Our Competitive Moat
          </CardTitle>
          <CardDescription className="text-[#05092B]">7 key advantages that make 4SL defensible</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {competitionContent.ourMoat.map((advantage: string, idx: number) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.08 }}
                className="flex gap-3 rounded-lg border-l-4 border-l-[#FCC169] bg-white p-4 shadow-sm"
              >
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[#FCC169]" />
                <span className="text-sm text-[#05092B]">{advantage}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pull Quote */}
      <Card className="border-l-4 border-l-[#FCC169] bg-slate-50">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="text-6xl text-[#FCC169] leading-none">&ldquo;</div>
            <div>
              <p className="text-lg text-[#05092B] italic leading-relaxed">
                {competitionContent.quote}&rdquo;
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sources */}
      <Card className="bg-slate-50">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Sources & Citations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-xs text-slate-600">
            <li>
              <strong>Navigate360 Platform Overview</strong> -{' '}
              <em>Competitive intelligence from public sources and market analysis</em>
            </li>
            <li>
              <strong>STOPit Solutions Product Documentation</strong> -{' '}
              <em>Public product information and market positioning</em>
            </li>
            <li>
              <strong>Raptor Technologies Features</strong> -{' '}
              <em>Public feature comparison and market presence data</em>
            </li>
            <li>
              <strong>EdTech Market Analysis Reports</strong> -{' '}
              <em>School safety technology market landscape</em>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

// Tab 7: Business & Traction (REMOVED/MERGED)
// Content merged into MarketTraction


// Tab 9A: Market Traction
const MarketTraction: React.FC = () => {
  const tractionContent = (content as any).traction;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#05092B] to-[#1A3859] p-12 text-white shadow-2xl"
      >
        <div className="relative z-10">
          <h2 className="text-5xl font-bold">{tractionContent.title}</h2>
          <p className="mt-4 text-2xl text-white/90">{tractionContent.subtitle}</p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/5 to-transparent" />
      </motion.div>

      {/* Current Traction Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-[#05092B]">Current Traction</CardTitle>
          <CardDescription className="text-[#05092B]">Demonstrating rapid growth and strong early market validation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Recent Momentum - 4 Month MRR Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl shadow-lg p-6 bg-white border-2 border-[#05092B]/10 hover:shadow-xl transition-all duration-300"
            >
              <p className="text-sm font-medium text-[#05092B]/60">September 2025</p>
              <p className="mt-2 text-4xl font-bold text-[#05092B]">$12,500</p>
              <p className="mt-2 text-sm text-[#05092B]">1 contract</p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl shadow-lg p-6 bg-gradient-to-br from-[#FCC169]/20 to-[#FCC169]/10 hover:shadow-xl transition-all duration-300 border border-[#FCC169]/30"
            >
              <p className="text-sm font-medium text-[#05092B]/80">October 2025</p>
              <p className="mt-2 text-4xl font-bold text-[#05092B]">$20,000</p>
              <p className="mt-1 text-sm text-[#05092B]">1 contract</p>
              <div className="mt-2 inline-block rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                +60% MoM
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl shadow-lg p-6 bg-gradient-to-br from-[#FCC169] to-[#FCC169]/80 hover:shadow-xl transition-all duration-300"
            >
              <p className="text-sm font-medium text-[#05092B]">November 2025</p>
              <p className="mt-2 text-4xl font-bold text-[#05092B]">$25,000</p>
              <p className="mt-1 text-sm text-[#05092B]">1 contract</p>
              <div className="mt-2 inline-block rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                +25% MoM
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="rounded-xl shadow-lg p-6 bg-gradient-to-br from-[#007097] to-[#007097]/80 text-white hover:shadow-xl transition-all duration-300"
            >
              <p className="text-sm font-medium text-white/80">December 2025</p>
              <p className="mt-2 text-4xl font-bold">$48,000</p>
              <p className="mt-1 text-sm">2 contracts</p>
              <div className="mt-2 inline-block rounded-full bg-green-600 px-3 py-1 text-xs font-semibold">
                +134% MoM
              </div>
            </motion.div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total ARR" value="$105,000" description="Achieved in 4 months" trend="up" />
            <StatCard label="Contract Velocity" value="1 → 2 / month" description="Accelerating deal flow" trend="up" />
            <StatCard label="Avg Contract Value" value="$21,100" description="Enterprise-grade pricing" trend="neutral" />
            <StatCard label="Avg MoM Growth" value="75%" description="Average monthly growth rate" trend="up" />
          </div>
        </CardContent>
      </Card>

      {/* Merged Market Opportunity Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="h-full border-t-4 border-t-[#FCC169]">
            <CardHeader>
              <CardTitle className="text-xl text-[#05092B] flex items-center gap-2">
                <Building2 className="h-5 w-5 text-[#FCC169]" />
                Total Addressable Market (TAM)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-5xl font-bold text-[#05092B]">{(content as any).business.marketSize.totalSchools.toLocaleString()}+</p>
                <p className="text-sm text-[#05092B] mt-1">{(content as any).business.marketSize.description}</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-[#05092B]">{(content as any).business.marketSize.opportunity}</p>
                <p className="text-sm text-[#05092B] mt-1">{(content as any).business.marketSize.opportunityDescription}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full border-t-4 border-t-[#FCC169]">
            <CardHeader>
              <CardTitle className="text-xl text-[#05092B] flex items-center gap-2">
                <Target className="h-5 w-5 text-[#FCC169]" />
                Mandated Market
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-5xl font-bold text-[#05092B]">{(content as any).business.mandatedMarket.states}</p>
                <p className="text-sm text-[#05092B] mt-1">States with mandates</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-[#05092B]">{(content as any).business.mandatedMarket.estimatedSchools.toLocaleString()}+</p>
                <p className="text-sm text-[#05092B] mt-1">Schools in mandate states</p>
              </div>
              <p className="text-sm text-[#05092B] font-semibold">{(content as any).business.mandatedMarket.trend}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Expanded Traction Tiles */}
      <Card className="border-t-4 border-t-[#FCC169]">
        <CardContent className="pt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="rounded-xl shadow-lg p-6 bg-[#FCC169] hover:shadow-xl transition-all duration-300"
            >
              <p className="text-sm font-medium text-[#05092B]">Districts Served</p>
              <p className="mt-2 text-4xl font-bold text-[#05092B]">29</p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="rounded-xl shadow-lg p-6 bg-[#FCC169] hover:shadow-xl transition-all duration-300"
            >
              <p className="text-sm font-medium text-[#05092B]">Students Protected</p>
              <p className="mt-2 text-4xl font-bold text-[#05092B]">56,300</p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="rounded-xl shadow-lg p-6 bg-[#FCC169] hover:shadow-xl transition-all duration-300"
            >
              <p className="text-sm font-medium text-[#05092B]">Total ARR</p>
              <p className="mt-2 text-4xl font-bold text-[#05092B]">$105,000</p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="rounded-xl shadow-lg p-6 bg-[#FCC169] hover:shadow-xl transition-all duration-300"
            >
              <p className="text-sm font-medium text-[#05092B]">States Served</p>
              <p className="mt-2 text-4xl font-bold text-[#05092B]">2</p>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Chart 1: MRR Growth & Contract Velocity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-[#05092B]">Growth Momentum</CardTitle>
          <CardDescription className="text-[#05092B]">Monthly recurring revenue and contract acquisition</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8 md:grid-cols-2">
            {/* MRR Growth Chart */}
            <div>
              <h4 className="mb-4 text-lg font-semibold text-[#05092B]">MRR Growth Trajectory</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mrrGrowthData} margin={{ left: 20, right: 10, top: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" angle={-45} textAnchor="end" height={80} />
                  <YAxis label={{ value: 'MRR ($)', angle: -90, position: 'insideLeft', dx: -10, dy: 75 }} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                  <Line
                    type="monotone"
                    dataKey="mrr"
                    stroke="#05092B"
                    strokeWidth={3}
                    dot={(props: any) => {
                      const { cx, cy, payload } = props;
                      return (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={6}
                          fill={payload.actual ? '#FCC169' : '#007097'}
                          stroke={payload.actual ? '#05092B' : '#007097'}
                          strokeWidth={2}
                        />
                      );
                    }}
                    name="MRR"
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="mt-3 text-xs text-[#05092B]">
                36-month MRR projection based on customer acquisition model
              </p>
            </div>

            {/* Contract Velocity Chart */}
            <div>
              <h4 className="mb-4 text-lg font-semibold text-[#05092B]">Contract Velocity</h4>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={contractVelocityData} margin={{ left: 20, right: 10, top: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" angle={-45} textAnchor="end" height={80} />
                  <YAxis label={{ value: 'Contracts', angle: -90, position: 'insideLeft', dx: -10, dy: 75 }} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="newContracts" fill="#FCC169" name="New Contracts" />
                  <Line type="monotone" dataKey="totalContracts" stroke="#05092B" strokeWidth={2} name="Total" />
                </ComposedChart>
              </ResponsiveContainer>
              <p className="mt-3 text-xs text-[#05092B]">
                Bars: New contracts per month | Line: Cumulative total
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Unit Economics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-[#05092B]">Unit Economics</CardTitle>
          <CardDescription className="text-[#05092B]">Capital-efficient growth with strong fundamentals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tractionContent.unitEconomics.map((econ: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-xl shadow-lg p-6 bg-gradient-to-br from-[#05092B]/5 to-[#007097]/5 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-3xl mb-2">{econ.icon}</div>
                <p className="text-sm font-medium text-[#05092B]/60">{econ.label}</p>
                <p className="mt-2 text-3xl font-bold text-[#05092B]">{econ.value}</p>
                <p className="mt-1 text-sm font-semibold text-[#007097]">{econ.highlight}</p>
                <p className="mt-2 text-xs text-[#05092B]">{econ.description}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Milestones Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-[#05092B]">Key Milestones</CardTitle>
          <CardDescription className="text-[#05092B]">18-month runway to sustained profitability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tractionContent.milestones.map((milestone: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex items-start gap-4 p-4 rounded-lg ${
                  milestone.status === 'completed' ? 'bg-green-50 border-l-4 border-green-600' :
                  milestone.highlight ? 'bg-[#FCC169]/20 border-l-4 border-[#FCC169]' :
                  'bg-gray-50 border-l-4 border-gray-300'
                }`}
              >
                <div className="flex-shrink-0">
                  {milestone.status === 'completed' ? (
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  ) : (
                    <Clock className="h-6 w-6 text-[#007097]" />
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-[#05092B]">{milestone.label}</h4>
                    {milestone.month > 0 && (
                      <span className="text-xs text-[#05092B]/60">(Month {milestone.month})</span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-[#007097] mt-1">{milestone.metric}</p>
                  <p className="text-sm text-[#05092B]/60 mt-1">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Tab 9B: Financial Model
const FinancialModel: React.FC = () => {
  const tractionContent = (content as any).traction;

  return (
    <div className="space-y-8">
      {/* 36-Month Projections */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-[#05092B]">36-Month Financial Outlook</CardTitle>
          <CardDescription className="text-[#05092B]">Path to $7.5M revenue and profitability</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Fiscal Year Summary Cards */}
          <div className="grid gap-6 mb-8 sm:grid-cols-3">
            {fiscalYearSummary.map((year: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-xl shadow-lg p-6 ${
                  idx === 0 ? 'bg-white border-2 border-[#05092B]/10' :
                  idx === 1 ? 'bg-gradient-to-br from-[#FCC169]/20 to-[#FCC169]/10' :
                  'bg-gradient-to-br from-[#007097]/20 to-[#007097]/10'
                }`}
              >
                <h4 className="text-sm font-medium text-[#05092B]/60">{year.year}</h4>
                <p className="mt-2 text-3xl font-bold text-[#05092B]">
                  ${(year.revenue / 1000000).toFixed(1)}M
                </p>
                {year.growth && (
                  <p className="mt-1 text-sm font-semibold text-green-600">+{year.growth}% YoY</p>
                )}
                <div className="mt-4 space-y-1 text-sm text-[#05092B]">
                  <p>{year.customers} customers</p>
                  <p>{year.grossMargin}% gross margin</p>
                  <p className={year.netIncome > 0 ? 'text-green-600 font-semibold' : 'text-red-600'}>
                    {year.netMargin}% net margin
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Revenue Trajectory Chart */}
          <div className="mb-8">
            <h4 className="mb-4 text-lg font-semibold text-[#05092B]">Projected Revenue Growth</h4>
            <ResponsiveContainer width="100%" height={450}>
              <LineChart data={revenueTrajectoryData} margin={{ bottom: 60, left: 20, right: 10, top: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={true} />
                <XAxis
                  dataKey="month"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  label={{ value: 'Revenue ($)', angle: -90, position: 'insideLeft', dx: -10, dy: 75 }}
                  tickFormatter={(value: number) => `$${(value / 1000).toFixed(0)}K`}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
                          <p className="font-semibold text-gray-900 mb-2">{label}</p>
                          <p className="text-sm text-[#007097]">
                            New Revenue: <span className="font-medium">${data.totalRevenue.toLocaleString()}</span>
                          </p>
                          <p className="text-sm text-[#10b981]">
                            Total Revenue: <span className="font-medium">${data.cumulativeRevenue.toLocaleString()}</span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="totalRevenue"
                  stroke="#007097"
                  strokeWidth={3}
                  dot={{ fill: '#007097', r: 3 }}
                  name="New Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Profitability Path */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-[#05092B]">
              Path to Profitability
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={profitabilityPathData} margin={{ left: 20, right: 10, top: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={true} />
                <XAxis dataKey="month" angle={-45} textAnchor="end" height={80} interval={0} tick={{ fontSize: 11 }} />
                <YAxis label={{ value: 'Net Income ($)', angle: -90, position: 'insideLeft', dx: -10, dy: 75 }} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                <Bar dataKey="netIncome" name="Net Income">
                  {profitabilityPathData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.netIncome >= 0 ? '#10b981' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="mt-3 text-xs text-[#05092B]">
              Red: Investment phase | Green: Profitable growth
            </p>
          </div>
        </CardContent>
      </Card>

      {/* NEW: Operational Cashflow Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-[#05092B]">
            Cash Runway <span className="text-base font-normal text-[#05092B]/70">(assuming $750K investment)</span>
          </CardTitle>
          <CardDescription className="text-[#05092B]">
            Ending cash balance over 36 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cashFlowData} margin={{ left: 20, right: 10, top: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={true} />
              <XAxis
                dataKey="month"
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                label={{ value: 'Cash Balance ($)', angle: -90, position: 'insideLeft', dx: -10, dy: 75 }}
                tick={{ fontSize: 11 }}
                tickFormatter={(value: number) => `$${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              <Bar dataKey="endingCash" name="Ending Cash Balance" fill="#007097" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue Mix Evolution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-[#05092B]">Revenue Mix Evolution</CardTitle>
          <CardDescription className="text-[#05092B]">Recurring revenue becomes majority by Year 3</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={revenueMixData} margin={{ left: 20, right: 10, top: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" angle={-45} textAnchor="end" height={80} />
              <YAxis label={{ value: 'Revenue ($)', angle: -90, position: 'insideLeft', dx: -10, dy: 75 }} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="new" stackId="a" fill="#007097" name="New Customer Revenue" />
              <Bar dataKey="renewal" stackId="a" fill="#10b981" name="Renewal Revenue" />
              <Bar dataKey="ai" stackId="a" fill="#8b5cf6" name="AI Add-on Revenue" />
              <Bar dataKey="onboarding" stackId="a" fill="#FCC169" name="Onboarding Fees" />
            </BarChart>
          </ResponsiveContainer>
          <p className="mt-4 text-sm text-[#05092B]">
            <strong>Key Insight:</strong> Renewal revenue (green) grows from 0% to 46% of total revenue by Year 3,
            creating a sustainable, predictable revenue base.
          </p>
          <p className="mt-2 text-xs text-[#05092B]/70 italic">
            Note: New customer revenue (blue) is prorated based on contract start dates and accumulates throughout each fiscal year.
            The decrease from June to July reflects the fiscal year reset, where Year 1's accumulated new customer revenue transitions
            to renewal revenue in Year 2, demonstrating the platform's strong retention and recurring revenue model.
          </p>
        </CardContent>
      </Card>

      {/* Investment Opportunity */}
      <Card className="border-2 border-[#007097]">
        <CardHeader className="bg-gradient-to-r from-[#05092B] to-[#007097] text-white">
          <CardTitle className="text-2xl">Pre-Seed Investment Opportunity</CardTitle>
          <CardDescription className="text-white/90">{tractionContent.investment.amount} to accelerate growth</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Use of Funds */}
            <div>
              <h4 className="mb-4 text-lg font-semibold text-[#05092B]">Use of Funds</h4>
              <div className="space-y-3">
                {tractionContent.investment.useOfFunds.map((fund: any, idx: number) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-[#FCC169] flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#05092B]">{fund.percentage}%</span>
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold text-[#05092B]">{fund.category}</p>
                      <p className="text-sm text-[#05092B]/60">{fund.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm font-medium text-[#007097]">
                Runway: {tractionContent.investment.runway}
              </p>
            </div>

            {/* Why Invest Now */}
            <div>
              <h4 className="mb-4 text-lg font-semibold text-[#05092B]">Why Invest Now</h4>
              <ul className="space-y-3">
                {tractionContent.investment.whyNow.map((reason: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#05092B]">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-[#05092B]">
            <FileText className="h-5 w-5" />
            Data Sources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-[#05092B]">
            <li>
              • Financial projections:{' '}
              <a
                href="https://docs.google.com/spreadsheets/d/1Dl30rXunoZ_Z7pev3ZMxQkOFODQKCAaW/edit?gid=1283445731#gid=1283445731"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#007097] hover:underline inline-flex items-center gap-1"
              >
                4SL 36-Month Model
                <ExternalLink className="h-3 w-3" />
              </a>
              {' '}(November 2025)
            </li>
            <li>• Recent traction: Actual contract data (August-October 2025)</li>
            <li>• Market sizing: Analysis of K-12 enrollment and state mandate compliance requirements</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default function VCBriefPage() {
  return (
    <div className="min-h-screen bg-white">
      <BrandHeader />
      <main className="mx-auto max-w-7xl px-6 py-8 portrait-compact">
        <Tabs defaultValue="problem" className="space-y-6">
          <TabsList className="grid grid-cols-4 grid-rows-2 w-full h-auto gap-2 portrait-tabs">
            <TabsTrigger value="problem">The Problem</TabsTrigger>
            <TabsTrigger value="solution">Our Solution</TabsTrigger>
            <TabsTrigger value="mandates">State Mandates</TabsTrigger>
            <TabsTrigger value="discovery">4SL Market Research</TabsTrigger>
            <div className="col-span-4 flex justify-center gap-2">
              <TabsTrigger value="competition" className="w-[calc((100%-0.5rem*3)/4)]">Competitor Analysis</TabsTrigger>
              <TabsTrigger value="market-traction" className="w-[calc((100%-0.5rem*3)/4)]">Market Traction</TabsTrigger>
              <TabsTrigger value="financial-model" className="w-[calc((100%-0.5rem*3)/4)]">Financial Forecast</TabsTrigger>
            </div>
          </TabsList>

          <TabsContent value="problem"><TheProblem /></TabsContent>
          <TabsContent value="solution"><TheSolution /></TabsContent>
          <TabsContent value="mandates"><TheMandates /></TabsContent>
          <TabsContent value="discovery"><CaliforniaMomentum /></TabsContent>
          <TabsContent value="competition"><WhyWeWin /></TabsContent>
          <TabsContent value="market-traction"><MarketTraction /></TabsContent>
          <TabsContent value="financial-model"><FinancialModel /></TabsContent>
        </Tabs>

        <footer className="mt-12 flex items-center justify-between border-t border-slate-200 pt-6 text-xs text-slate-600 print:hidden">
          <span>© {new Date().getFullYear()} 4StudentLives. Private investor materials. Confidential.</span>
          <span>Designed for impact • Built for scale</span>
        </footer>
      </main>
    </div>
  );
}
