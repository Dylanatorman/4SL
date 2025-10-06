import React, { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Search, ExternalLink, Filter } from "lucide-react";

/**
 * HOW TO USE
 * 1) Drop your logo URL, primary/neutral colors, and company name into THEME below.
 * 2) Replace SAMPLE_CONTENT with your content.json export.
 * 3) Deploy as a Next.js page or a standalone React app. Tailwind is assumed.
 * 4) Optional: Gate with basic auth and add noindex in your host.
 */

const THEME = {
  company: "YourCo",
  logoUrl: "https://placehold.co/200x56?text=YourCo",
  brand: {
    primary: "#05092B", // e-global-color-primary
    secondary: "#1A3859", // e-global-color-secondary
    accent: "#FCC169", // e-global-color-accent
    link: "#007097", // e-global-color-fb89c3d
    surface: "bg-white",
    text: "text-[#7A7A7A]",
    chip: "bg-[#FCC169]/20 text-[#05092B]",
  },
  typography: {
    family: '"Space Grotesk", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto',
    weightPrimary: 600,
    weightSecondary: 400,
    weightAccent: 500,
  },
};

// Replace this object with your real content.json
const SAMPLE_CONTENT = {
  overview: {
    title: "Threat and Suicide Assessment Platforms",
    problem:
      "Districts face liability and coordination gaps across threat and suicide risk workflows.",
    why_now:
      "Post-incident scrutiny, new guidance, and maturing vendor ecosystems are driving adoption.",
    summary:
      "This brief aggregates cases, statutes, and market signals to clarify buyer risk and required controls.",
  },
  cases: [
    {
      id: "ca-doe-2023-001",
      title: "Doe v. District",
      jurisdiction: "CA",
      court: "Cal. Ct. App.",
      date: "2023-11-14",
      citation: "123 Cal.App.5th 456",
      status: "precedential",
      url: "https://example.com",
      summary:
        "Court outlined duty of care for K-12 when staff are on notice of credible threats and mandated documentation.",
      relevance:
        "Clarifies documentation and escalation duties. Supports need for auditable workflows and role-based access.",
      tags: ["duty-of-care", "records", "privacy"],
      key_points: ["Notice standard refined", "Escalation timelines"],
    },
  ],
  regulations: [
    {
      id: "ca-edcode-XYZ",
      title: "Ed. Code § XYZ",
      jurisdiction: "CA",
      type: "statute",
      status: "in-force",
      url: "https://example.com",
      summary: "Requires LEA policies for threat and suicide risk assessment and training cadence.",
      implications: ["Policy templates", "Training logs", "Parent notification records"],
    },
  ],
  vendors: [
    {
      name: "Vendor A",
      url: "https://example.com",
      focus: "threat",
      notes: "Legacy SIS integrations. Strong audit trails.",
      differentiators: ["Role-based narratives", "One-click law enforcement packet"],
    },
  ],
  market: {
    tamsam: "8–12k U.S. districts. Budget from safety, counseling, or IT.",
    buyers: "Superintendents, Student Services, Safety, Counselors.",
    budget_cycles: "Late spring to early fall, often grant-driven.",
  },
  appendix: [{ title: "Glossary", url: "https://example.com" }],
};

// ---------- UI helpers ----------
const BrandHeader: React.FC = () => (
  <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
    <div className="mx-auto flex max-w-6xl items-center gap-4 p-4">
      <img src={THEME.logoUrl} alt={THEME.company} className="h-8 w-auto" />
      <Separator orientation="vertical" className="h-6" />
      <h1 className="text-lg font-semibold tracking-tight">VC Brief</h1>
      <div className="ml-auto text-sm text-slate-500">Private • No Index</div>
    </div>
  </header>
);

const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${THEME.brand.chip}`}>{children}</span>
);

// ---------- Sections ----------
const Overview: React.FC<{ data: typeof SAMPLE_CONTENT.overview }> = ({ data }) => (
  <div className="grid gap-6 md:grid-cols-2">
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Problem</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-slate-700">{data.problem}</CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Why Now</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-slate-700">{data.why_now}</CardContent>
    </Card>
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="text-base">Summary</CardTitle>
      </CardHeader>
      <CardContent className="text-sm leading-6 text-slate-700">{data.summary}</CardContent>
    </Card>
  </div>
);

const Cases: React.FC<{ data: typeof SAMPLE_CONTENT.cases }> = ({ data }) => {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<null | (typeof data)[number]>(null);

  const results = useMemo(() => {
    const k = q.trim().toLowerCase();
    if (!k) return data;
    return data.filter((c) =>
      [c.title, c.jurisdiction, c.court, c.citation, ...(c.tags || [])]
        .join(" ")
        .toLowerCase()
        .includes(k)
    );
  }, [q, data]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
          <Input placeholder="Search by title, citation, tag" value={q} onChange={(e) => setQ(e.target.value)} className="pl-8" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {results.map((c) => (
          <Card key={c.id} className="hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-base">
                <span>{c.title}</span>
                <Badge variant="secondary">{c.jurisdiction}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="text-slate-600">{c.court} • {c.date} • {c.citation}</div>
              <div className="flex flex-wrap gap-2">
                {(c.tags || []).map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
              <p className="line-clamp-3 text-slate-700">{c.summary}</p>
              <div className="flex justify-end">
                <Button size="sm" onClick={() => setActive(c)}>
                  Details <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={() => setActive(null)}>
        <DialogContent className="max-w-2xl">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg">{active.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-2 text-sm text-slate-700">
                <div className="text-slate-500">{active.court} • {active.date} • {active.citation}</div>
                <p>{active.summary}</p>
                {active.relevance && (
                  <div>
                    <h4 className="mb-1 font-medium">Why it matters</h4>
                    <p>{active.relevance}</p>
                  </div>
                )}
                {active.key_points?.length ? (
                  <div>
                    <h4 className="mb-1 font-medium">Key points</h4>
                    <ul className="list-disc pl-5">
                      {active.key_points.map((k) => (
                        <li key={k}>{k}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                <div className="pt-2">
                  <a href={active.url} target="_blank" rel="noreferrer">
                    <Button>
                      Open case <ExternalLink className="ml-2 h-4 w-4" />
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

const Regulations: React.FC<{ data: typeof SAMPLE_CONTENT.regulations }> = ({ data }) => (
  <div className="grid gap-4 md:grid-cols-2">
    {data.map((r) => (
      <Card key={r.id}>
        <CardHeader>
          <CardTitle className="text-base">{r.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-700">
          <div className="text-slate-500">{r.jurisdiction} • {r.type} • {r.status}</div>
          <p>{r.summary}</p>
          {r.implications?.length ? (
            <ul className="list-disc pl-5">
              {r.implications.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          ) : null}
          <div className="pt-2">
            <a href={r.url} target="_blank" rel="noreferrer" className="inline-flex items-center text-emerald-700 hover:underline">
              View source <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const Vendors: React.FC<{ data: typeof SAMPLE_CONTENT.vendors }> = ({ data }) => (
  <div className="grid gap-4 md:grid-cols-2">
    {data.map((v) => (
      <Card key={v.name}>
        <CardHeader>
          <CardTitle className="text-base">{v.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-700">
          <div className="text-slate-500">Focus: {v.focus}</div>
          <p>{v.notes}</p>
          {v.differentiators?.length ? (
            <ul className="list-disc pl-5">
              {v.differentiators.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          ) : null}
          <div className="pt-2">
            <a href={v.url} target="_blank" rel="noreferrer" className="inline-flex items-center text-emerald-700 hover:underline">
              Visit site <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const Market: React.FC<{ data: typeof SAMPLE_CONTENT.market }> = ({ data }) => (
  <div className="grid gap-4">
    <Card>
      <CardHeader>
        <CardTitle className="text-base">TAM/SAM/SOM</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-slate-700">{data.tamsam}</CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Buyers</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-slate-700">{data.buyers}</CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Budget cycles</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-slate-700">{data.budget_cycles}</CardContent>
    </Card>
  </div>
);

const Appendix: React.FC<{ data: typeof SAMPLE_CONTENT.appendix }> = ({ data }) => (
  <div className="space-y-3">
    {data.map((a) => (
      <div key={a.title} className="flex items-center justify-between rounded-lg border p-3">
        <div>
          <div className="font-medium">{a.title}</div>
        </div>
        {a.url && (
          <a href={a.url} target="_blank" rel="noreferrer">
            <Button size="sm" variant="secondary">
              Open <ExternalLink className="ml-1 h-4 w-4" />
            </Button>
          </a>
        )}
      </div>
    ))}
  </div>
);

export default function VCBriefApp() {
  const data = SAMPLE_CONTENT; // swap with your imported JSON

  return (
    <div className={`min-h-screen ${THEME.brand.surface} ${THEME.brand.text}`}>
      <BrandHeader />
      <main className="mx-auto max-w-6xl p-4 md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{data.overview.title}</h2>
            <p className="text-sm text-slate-600">A private, interactive dossier for investors</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" className="print:hidden" onClick={() => window.print()}>Print / PDF</Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cases">Cases</TabsTrigger>
            <TabsTrigger value="regulations">Regulations</TabsTrigger>
            <TabsTrigger value="market">Market</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="appendix">Appendix</TabsTrigger>
          </TabsList>

        <TabsContent value="overview"><Overview data={data.overview} /></TabsContent>
        <TabsContent value="cases"><Cases data={data.cases} /></TabsContent>
        <TabsContent value="regulations"><Regulations data={data.regulations} /></TabsContent>
        <TabsContent value="market"><Market data={data.market} /></TabsContent>
        <TabsContent value="vendors"><Vendors data={data.vendors} /></TabsContent>
        <TabsContent value="appendix"><Appendix data={data.appendix} /></TabsContent>
        </Tabs>

        <footer className="mt-12 flex items-center justify-between border-t pt-4 text-xs text-slate-500">
          <span>
            © {new Date().getFullYear()} {THEME.company}. Private investor materials. Do not distribute.
          </span>
          <span>Styled with Tailwind • Accessible by keyboard • Print-friendly</span>
        </footer>
      </main>

      <style>{`
        /* Brand tokens */
        :root {
          --brand: ${THEME.brand.primary};
          --brand-secondary: ${THEME.brand.secondary};
          --brand-accent: ${THEME.brand.accent};
          --brand-link: ${THEME.brand.link};
        }
        @font-face {
          font-family: 'Space Grotesk';
          font-style: normal;
          font-weight: 400 700;
          font-display: swap;
          src: local('Space Grotesk'), url('https://fonts.gstatic.com/s/spacegrotesk/v16/QGYyz_wNahGAdqQ43RhFsdQ.woff2') format('woff2');
        }
        body, .space-grotesk {
          font-family: ${THEME.typography.family};
        }
        .brand-bg { background: var(--brand); }
        .brand-text { color: var(--brand); }
        a { color: var(--brand-link); }
        @media print {
          .print\\:hidden { display: none !important; }
          header, footer, .grid-cols-6 { break-inside: avoid; }
          main { padding: 0; }
          body { color: #111827; }
        }
      `}</style>
    </div>
  );
}
