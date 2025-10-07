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
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatNumber, formatCurrency, formatPercentage } from "@/lib/utils";
import content from "@/lib/content.json";
import { suicideData, shootingData, crisisStats } from "@/lib/crisis-data";
import SplashIntro from "@/components/splash/SplashIntro";

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

// Tab 1: The Crisis
const TheCrisis: React.FC = () => {
  const crisisContent = (content as any).crisis;

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
                <LineChart data={suicideData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="year"
                    ticks={[2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis domain={[7, 12]} label={{ value: 'Rate per 100k', angle: -90, position: 'insideLeft' }} />
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
                <BarChart data={shootingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: 'Incidents', angle: -90, position: 'insideLeft' }} />
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

      {/* The Common Thread */}
      <Card className="border-l-4 border-l-[#FCC169] bg-white">
        <CardContent className="pt-6">
          <h3 className="text-2xl font-bold text-[#05092B] mb-4">
            {crisisContent.commonThread.title}
          </h3>
          <p className="text-lg text-[#05092B] leading-relaxed mb-4">
            {crisisContent.commonThread.description}
          </p>
          <p className="text-lg font-semibold text-[#1A3859]">
            {crisisContent.commonThread.result}
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
              <a href="https://www.cdc.gov/healthyyouth/data/yrbs/index.htm" target="_blank" rel="noreferrer" className="text-brand-link hover:underline">
                https://www.cdc.gov/healthyyouth/data/yrbs/index.htm
              </a>
            </li>
            <li>
              <strong>CDC NCHS Data Brief 471 (Suicide Rates 2011-2021)</strong> -{' '}
              <a href="https://www.cdc.gov/nchs/data/databriefs/db471-tables.pdf" target="_blank" rel="noreferrer" className="text-brand-link hover:underline">
                https://www.cdc.gov/nchs/data/databriefs/db471-tables.pdf
              </a>
            </li>
            <li>
              <strong>Education Week School Shootings Tracker (2018-2024)</strong> -{' '}
              <a href="https://www.edweek.org/leadership/school-shootings-this-year-how-many-and-where/2025/01" target="_blank" rel="noreferrer" className="text-brand-link hover:underline">
                https://www.edweek.org/leadership/school-shootings-this-year-how-many-and-where/2025/01
              </a>
            </li>
            <li>
              <strong>Everytown Research on School Shootings</strong> -{' '}
              <a href="https://everytownresearch.org" target="_blank" rel="noreferrer" className="text-brand-link hover:underline">
                https://everytownresearch.org
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

// Tab 2: Impact
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
            <BarChart data={mandateTimeline} margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis label={{ value: 'States with Mandates', angle: -90, position: 'insideLeft' }} />
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
            <BarChart data={lawsuitData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis label={{ value: 'Settlement ($M)', angle: -90, position: 'insideLeft' }} />
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
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#05092B] to-[#1A3859] p-12 text-white shadow-2xl"
      >
        <div className="relative z-10">
          <h2 className="text-5xl font-bold">{solutionContent.title}</h2>
          <p className="mt-4 text-2xl text-white/90">{solutionContent.subtitle}</p>
          <p className="mt-6 text-lg text-white/80 max-w-4xl leading-relaxed">{solutionContent.overview}</p>
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

      {/* Future Baseline */}
      <Card className="bg-[#FCC169] shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="pt-6">
          <h3 className="text-2xl font-bold text-[#05092B] mb-4">Establishing the Standard</h3>
          <p className="text-lg text-[#05092B] leading-relaxed">
            {mandatesContent.trendline}
          </p>
        </CardContent>
      </Card>

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

// Tab 7: Business & Traction
const BusinessAndTraction: React.FC = () => {
  const businessContent = (content as any).business;
  const teamContent = (content as any).team;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#05092B] to-[#1A3859] p-12 text-white shadow-2xl"
      >
        <div className="relative z-10">
          <h2 className="text-5xl font-bold">{businessContent.title}</h2>
          <p className="mt-4 text-2xl text-white/90">{businessContent.subtitle}</p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/5 to-transparent" />
      </motion.div>

      {/* Market Size */}
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
                Total Market
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-5xl font-bold text-[#05092B]">{businessContent.marketSize.totalSchools.toLocaleString()}+</p>
                <p className="text-sm text-[#05092B] mt-1">{businessContent.marketSize.description}</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-[#05092B]">{businessContent.marketSize.opportunity}</p>
                <p className="text-sm text-[#05092B] mt-1">{businessContent.marketSize.opportunityDescription}</p>
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
                <p className="text-5xl font-bold text-[#05092B]">{businessContent.mandatedMarket.states}</p>
                <p className="text-sm text-[#05092B] mt-1">States with mandates</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-[#05092B]">{businessContent.mandatedMarket.estimatedSchools.toLocaleString()}+</p>
                <p className="text-sm text-[#05092B] mt-1">Schools in mandate states</p>
              </div>
              <p className="text-sm text-[#05092B] font-semibold">{businessContent.mandatedMarket.trend}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Current Traction */}
      <Card className="border-t-4 border-t-[#FCC169]">
        <CardHeader>
          <CardTitle className="text-2xl text-[#05092B]">Current Traction</CardTitle>
          <CardDescription className="text-[#05092B]">Proven demand and active pipeline</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl shadow-lg p-6 bg-[#FCC169] hover:shadow-xl transition-all duration-300"
            >
              <p className="text-sm font-medium text-[#05092B]">Districts</p>
              <p className="mt-2 text-4xl font-bold text-[#05092B]">{businessContent.traction.districts}</p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="rounded-xl shadow-lg p-6 bg-[#FCC169] hover:shadow-xl transition-all duration-300"
            >
              <p className="text-sm font-medium text-[#05092B]">Students Served</p>
              <p className="mt-2 text-4xl font-bold text-[#05092B]">{businessContent.traction.studentsServed}</p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl shadow-lg p-6 bg-[#FCC169] hover:shadow-xl transition-all duration-300"
            >
              <p className="text-sm font-medium text-[#05092B]">States Served</p>
              <p className="mt-2 text-4xl font-bold text-[#05092B]">{businessContent.traction.statesServed}</p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="rounded-xl shadow-lg p-6 bg-[#FCC169] hover:shadow-xl transition-all duration-300"
            >
              <p className="text-sm font-medium text-[#05092B]">Pipeline</p>
              <p className="mt-2 text-base font-semibold text-[#05092B]">{businessContent.traction.pipeline}</p>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Model */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-l-4 border-l-[#FCC169]">
          <CardHeader>
            <CardTitle className="text-xl text-[#05092B]">Revenue Model</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[#FCC169] mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#05092B]">{businessContent.revenueModel.type}</p>
                <p className="text-xs text-[#05092B] mt-1">{businessContent.revenueModel.pricing}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[#FCC169] mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#05092B]">Enterprise Scalability</p>
                <p className="text-xs text-[#05092B] mt-1">{businessContent.revenueModel.scalability}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[#FCC169] mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#05092B]">State-Level Capability</p>
                <p className="text-xs text-[#05092B] mt-1">{businessContent.revenueModel.capability}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#FCC169]">
          <CardHeader>
            <CardTitle className="text-xl text-[#05092B]">Retention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 flex-shrink-0 text-[#FCC169] mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#05092B]">Compliance-Driven</p>
                <p className="text-xs text-[#05092B] mt-1">{businessContent.retention.driver}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 flex-shrink-0 text-[#FCC169] mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#05092B]">Expected High Retention</p>
                <p className="text-xs text-[#05092B] mt-1">{businessContent.retention.expectation}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Why Now */}
      <Card className="border-t-4 border-t-[#FCC169]">
        <CardHeader>
          <CardTitle className="text-2xl text-[#05092B]">Why Now</CardTitle>
          <CardDescription className="text-[#05092B]">5 converging drivers creating urgent demand</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {businessContent.whyNow.map((reason: string, idx: number) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.08 }}
                className="flex gap-3 rounded-lg bg-slate-50 p-4"
              >
                <Zap className="h-5 w-5 flex-shrink-0 text-[#FCC169]" />
                <span className="text-sm text-[#05092B]">{reason}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team */}
      <Card className="border-t-4 border-t-[#FCC169] bg-gradient-to-br from-white to-slate-50">
        <CardHeader>
          <CardTitle className="text-2xl text-[#05092B] flex items-center gap-2">
            <Users className="h-6 w-6 text-[#FCC169]" />
            Our Team
          </CardTitle>
          <CardDescription className="text-[#05092B]">Execution speed is our competitive advantage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-[#05092B] leading-relaxed">{teamContent.description}</p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border-l-4 border-l-[#FCC169] bg-white p-4">
              <h4 className="text-sm font-semibold text-[#05092B] mb-2">Engineering Agility</h4>
              <p className="text-sm text-[#05092B]">{teamContent.executionSpeed}</p>
            </div>
            <div className="rounded-lg border-l-4 border-l-[#FCC169] bg-white p-4">
              <h4 className="text-sm font-semibold text-[#05092B] mb-2">Core Strength</h4>
              <p className="text-sm text-[#05092B]">{teamContent.coreStrength}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Outlook */}
      <Card className="border-l-4 border-l-[#FCC169] bg-white">
        <CardContent className="pt-6">
          <h3 className="text-2xl font-bold text-[#05092B] mb-4">Market Outlook</h3>
          <p className="text-lg text-[#05092B] leading-relaxed">
            {businessContent.outlook}
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
              <strong>National Center for Education Statistics (NCES)</strong> -{' '}
              <a href="https://nces.ed.gov/programs/digest/d23/tables/dt23_214.10.asp" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://nces.ed.gov/programs/digest/d23/tables/dt23_214.10.asp
              </a>
              {' '}- Approximately 13,500 public school districts in the United States
            </li>
            <li>
              <strong>EdTech Market Analysis Reports</strong> -{' '}
              <em>School safety and compliance technology market sizing</em>
            </li>
            <li>
              <strong>California SB 1241 Fiscal Impact Analysis</strong> -{' '}
              <a href="https://leginfo.legislature.ca.gov" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://leginfo.legislature.ca.gov
              </a>
            </li>
            <li>
              <strong>State Mandate Coverage Analysis</strong> -{' '}
              <em>Based on documented state legislation and school count data</em>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

// Tab 8: The Ask
const TheAsk: React.FC = () => {
  const fundingContent = (content as any).funding;

  // Prepare data for use of funds pie chart
  const useOfFundsData = fundingContent.useOfFunds.map((item: any) => ({
    name: item.category,
    value: item.percentage,
    description: item.description,
  }));

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#05092B] to-[#1A3859] p-12 text-white shadow-2xl"
      >
        <div className="relative z-10">
          <h2 className="text-6xl font-bold mb-6">The Vision</h2>
          <p className="text-3xl font-semibold text-white/90 mb-4">{fundingContent.vision}</p>
          <p className="text-xl text-white/80">{fundingContent.mission}</p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/5 to-transparent" />
      </motion.div>

      {/* The Opportunity */}
      <Card className="border-t-4 border-t-[#FCC169] bg-gradient-to-br from-white to-slate-50">
        <CardHeader>
          <CardTitle className="text-2xl text-[#05092B]">The Opportunity Before Us</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col gap-2 rounded-lg border-l-4 border-l-[#FCC169] bg-white p-4"
            >
              <p className="text-xs font-medium text-[#05092B]">Current</p>
              <p className="text-3xl font-bold text-[#05092B]">{fundingContent.opportunity.current}</p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="flex flex-col gap-2 rounded-lg border-l-4 border-l-[#FCC169] bg-white p-4"
            >
              <p className="text-xs font-medium text-[#05092B]">Trend</p>
              <p className="text-base font-semibold text-[#05092B]">{fundingContent.opportunity.trend}</p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-2 rounded-lg border-l-4 border-l-[#FCC169] bg-white p-4"
            >
              <p className="text-xs font-medium text-[#05092B]">Future</p>
              <p className="text-base font-semibold text-[#05092B]">{fundingContent.opportunity.future}</p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="flex flex-col gap-2 rounded-lg border-l-4 border-l-[#FCC169] bg-white p-4"
            >
              <p className="text-xs font-medium text-[#05092B]">Advantage</p>
              <p className="text-base font-semibold text-[#05092B]">{fundingContent.opportunity.advantage}</p>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Use of Funds */}
      <Card className="border-t-4 border-t-[#FCC169]">
        <CardHeader>
          <CardTitle className="text-2xl text-[#05092B]">Use of Investment Funds</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Pie Chart */}
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={useOfFundsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {useOfFundsData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Breakdown */}
            <div className="space-y-4">
              {fundingContent.useOfFunds.map((item: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-lg border-l-4 border-l-[#FCC169] bg-slate-50 p-4"
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <h4 className="font-semibold text-[#05092B]">{item.category}</h4>
                    <span className="text-2xl font-bold text-[#FCC169]">{item.percentage}%</span>
                  </div>
                  <p className="text-sm text-[#05092B]">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Moral AND Financial Impact */}
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="h-full border-t-4 border-t-[#FCC169] bg-gradient-to-br from-white to-slate-50">
            <CardHeader>
              <CardTitle className="text-xl text-[#05092B] flex items-center gap-2">
                <Users className="h-5 w-5 text-[#FCC169]" />
                Moral Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-[#05092B]">{fundingContent.moralAndFinancial.moral}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full border-t-4 border-t-[#FCC169] bg-gradient-to-br from-white to-slate-50">
            <CardHeader>
              <CardTitle className="text-xl text-[#05092B] flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#FCC169]" />
                Financial Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-[#05092B]">{fundingContent.moralAndFinancial.financial}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Call to Action */}
      <Card className="border-l-4 border-l-[#FCC169] bg-gradient-to-br from-[#05092B] to-[#1A3859] text-white">
        <CardContent className="pt-6">
          <div className="text-center space-y-6 py-8">
            <h3 className="text-4xl font-bold">Join Us</h3>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Help us build the national backbone of school safety and accountability.
              Together, we can ensure no warning sign is missed and no district is left unprotected.
            </p>
            <div className="flex items-center justify-center gap-6 pt-4">
              <div className="text-center">
                <p className="text-sm text-white/70">Investment Opportunity</p>
                <p className="text-2xl font-bold text-[#FCC169] mt-1">Open</p>
              </div>
              <Separator orientation="vertical" className="h-12 bg-white/30" />
              <div className="text-center">
                <p className="text-sm text-white/70">Timing</p>
                <p className="text-2xl font-bold text-[#FCC169] mt-1">Critical</p>
              </div>
              <Separator orientation="vertical" className="h-12 bg-white/30" />
              <div className="text-center">
                <p className="text-sm text-white/70">Impact</p>
                <p className="text-2xl font-bold text-[#FCC169] mt-1">National</p>
              </div>
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
              <strong>Market Size Analysis</strong> -{' '}
              <em>Based on NCES data, state mandate analysis, and EdTech market reports</em>
            </li>
            <li>
              <strong>Compliance Landscape Data</strong> -{' '}
              <em>State legislation analysis and timeline from 11 mandate states</em>
            </li>
            <li>
              <strong>California SB 1241 (SAFE Act)</strong> -{' '}
              <a href="https://leginfo.legislature.ca.gov" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                https://leginfo.legislature.ca.gov
              </a>
              {' '}- July 2027 deadline driving urgency
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default function VCBriefPage() {
  return (
    <SplashIntro>
      <div className="min-h-screen bg-white">
        <BrandHeader />
        <main className="mx-auto max-w-7xl px-6 py-8">
          <Tabs defaultValue="crisis" className="space-y-6">
            <TabsList className="grid w-full grid-cols-8 h-auto gap-1">
              <TabsTrigger value="crisis">The Crisis</TabsTrigger>
              <TabsTrigger value="storm">Impact</TabsTrigger>
              <TabsTrigger value="solution">The Solution</TabsTrigger>
              <TabsTrigger value="mandates">Mandates</TabsTrigger>
              <TabsTrigger value="discovery">Discovery</TabsTrigger>
              <TabsTrigger value="competition">Why We Win</TabsTrigger>
              <TabsTrigger value="business">Market Opportunity</TabsTrigger>
              <TabsTrigger value="funding">The Vision</TabsTrigger>
            </TabsList>

            <TabsContent value="crisis"><TheCrisis /></TabsContent>
            <TabsContent value="storm"><PerfectStorm /></TabsContent>
            <TabsContent value="solution"><TheSolution /></TabsContent>
            <TabsContent value="mandates"><TheMandates /></TabsContent>
            <TabsContent value="discovery"><CaliforniaMomentum /></TabsContent>
            <TabsContent value="competition"><WhyWeWin /></TabsContent>
            <TabsContent value="business"><BusinessAndTraction /></TabsContent>
            <TabsContent value="funding"><TheAsk /></TabsContent>
          </Tabs>

          <footer className="mt-12 flex items-center justify-between border-t border-slate-200 pt-6 text-xs text-slate-600 print:hidden">
            <span>© {new Date().getFullYear()} 4StudentLives. Private investor materials. Confidential.</span>
            <span>Designed for impact • Built for scale</span>
          </footer>
        </main>
      </div>
    </SplashIntro>
  );
}
