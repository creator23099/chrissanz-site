"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import PremiumROI from "@/components/PremiumROI";

/* =========================================================
   Shared styles
   ========================================================= */
const colorMap = {
  blue: { chip: "bg-blue-600 text-white", bg: "bg-blue-50", text: "text-blue-700" },
  green: { chip: "bg-green-600 text-white", bg: "bg-green-50", text: "text-green-700" },
  purple: { chip: "bg-purple-600 text-white", bg: "bg-purple-50", text: "text-purple-700" },
  orange: { chip: "bg-orange-600 text-white", bg: "bg-orange-50", text: "text-orange-700" },
} as const;

/* =========================================================
   Lightweight ROI inputs (kept as-is; not used after swap)
   ========================================================= */
type IndustryKey = "medspa" | "home_services" | "agency_consulting";

const INDUSTRY_PRESETS: Record<
  IndustryKey,
  {
    label: string;
    hoursPerLead: number;
    bookedCallsFactor: number;
    recoveryFactor: number;
    defaultAvgDeal: number;
    avgEmployeeCost: number;
    employeeEfficiencyReplace: number;
    note: string;
  }
> = {
  medspa: {
    label: "Med Spa / Aesthetics",
    hoursPerLead: 0.5,
    bookedCallsFactor: 0.45,
    recoveryFactor: 0.3,
    defaultAvgDeal: 1200,
    avgEmployeeCost: 5500,
    employeeEfficiencyReplace: 20,
    note: "High intent leads, premium procedures, and strong upsells.",
  },
  home_services: {
    label: "High-Ticket Home Services",
    hoursPerLead: 0.6,
    bookedCallsFactor: 0.35,
    recoveryFactor: 0.25,
    defaultAvgDeal: 6500,
    avgEmployeeCost: 6200,
    employeeEfficiencyReplace: 25,
    note: "Expensive leads — one extra job often covers months of fees.",
  },
  agency_consulting: {
    label: "Agency / Consulting / B2B",
    hoursPerLead: 0.4,
    bookedCallsFactor: 0.3,
    recoveryFactor: 0.2,
    defaultAvgDeal: 3000,
    avgEmployeeCost: 7500,
    employeeEfficiencyReplace: 30,
    note: "High-margin retainers and calendar bookings drive fast ROI.",
  },
};

/* =========================================================
   Page
   ========================================================= */
export default function Pricing() {
  // ROI calc state (kept but unused after swap—safe to remove later if you want)
  const [industry, setIndustry] = useState<IndustryKey>("medspa");
  const [leadVolume, setLeadVolume] = useState(50);
  const [conversionRate, setConversionRate] = useState(2);
  const [avgDealValue, setAvgDealValue] = useState(INDUSTRY_PRESETS["medspa"].defaultAvgDeal);
  const [currentRevenue, setCurrentRevenue] = useState(100000); // monthly revenue

  const preset = INDUSTRY_PRESETS[industry];

  const impact = useMemo(() => {
    const hoursSaved = Math.round(leadVolume * preset.hoursPerLead);
    const bookedCallsIncrease = Math.round(leadVolume * preset.bookedCallsFactor);
    const missedLeadsRecovered = Math.round(leadVolume * preset.recoveryFactor);

    const recoveredLeadsRevenue = Math.round(
      missedLeadsRecovered * (conversionRate / 100) * avgDealValue
    );

    const weeksPerMonth = 4.33;
    const totalHoursSavedPerMonth = hoursSaved * weeksPerMonth;
    const halfEmployeeThreshold = 40 * weeksPerMonth * 0.5;

    const employeeCostSavings =
      totalHoursSavedPerMonth > halfEmployeeThreshold
        ? Math.round(preset.avgEmployeeCost * 0.5)
        : Math.round((totalHoursSavedPerMonth / (40 * weeksPerMonth)) * preset.avgEmployeeCost);

    const totalMonthlyImpact = recoveredLeadsRevenue + employeeCostSavings;
    const annualRevenueGrowth = Math.round(currentRevenue * 12 * 0.05);

    return {
      hoursSaved,
      bookedCallsIncrease,
      missedLeadsRecovered,
      recoveredLeadsRevenue,
      employeeCostSavings,
      totalMonthlyImpact,
      annualRevenueGrowth,
    };
  }, [leadVolume, conversionRate, avgDealValue, currentRevenue, preset]);

  const fmtCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero background to match home */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_60%)]" />
          <div className="absolute -top-10 -left-24 h-80 w-[140%] rotate-[8deg] bg-[linear-gradient(90deg,transparent,rgba(99,102,241,0.08),transparent)]" />
          <div className="absolute top-32 -right-24 h-80 w-[140%] -rotate-[12deg] bg-[linear-gradient(90deg,transparent,rgba(16,185,129,0.08),transparent)]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Pricing That Grows With Your Success</h1>
          <p className="text-xl text-gray-600">
            We only win when you win. Our outcome-based partnership model ensures every dollar invested drives measurable ROI.
          </p>
        </div>
      </section>

      {/* Partner package intro (your copy) */}
      <section className="py-10 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">AI Development Partner Package</h2>
          <p className="text-lg text-gray-700">
            At ChrisSanz, we act as an extension of your team — a true partner in uncovering and executing the highest-ROI
            opportunities for automation. We don’t just deliver a system and walk away. We design, launch, and continuously refine
            intelligent workflows that free up hours each week, sharpen operations, and create lasting capacity for growth.
            With us, you gain more than automation. You gain a dedicated AI partner committed to measurable outcomes,
            compounding efficiency, and long-term scalability.
          </p>
        </div>
      </section>

      {/* Pricing grid — 3 options */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-3">Choose the Right Engagement</h3>
            <p className="text-lg text-gray-600">Start with a blueprint, scale with a partner, or scope a focused build.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Partnership Program — Recommended */}
            <TierCard
              highlight
              badge="Most Popular"
              title="AI Partnership Program"
              priceLine="Discovery & Setup: $5,000 • Monthly: from $1,000"
              subtitle="Outcome-based monthly execution"
              bullets={[
                "Discovery, systems audit, and ROI mapping (TMAP)",
                "Proof-of-concept built and validated in your environment",
                "Fixed monthly rate based on TMAP (no scope creep)",
                "Ongoing improvements, analytics, and enablement",
              ]}
              cta={{ href: "/strategy-call", label: "Book Strategy Session", variant: "blue" }}
              footerNote="Best fit for teams ready to eliminate manual work and scale."
            />

            {/* Enterprise Program */}
            <TierCard
              highlight={false}
              badge="For High-Growth"
              title="Enterprise Partnership"
              priceLine="Starting at $10,000 / month"
              subtitle="Multi-department automation program"
              bullets={[
                "Custom development + orchestration at scale",
                "Bi-weekly strategy sessions & roadmap",
                "Advanced analytics & predictive modeling",
                "White-glove rollout, training, documentation",
              ]}
              cta={{ href: "/strategy-call", label: "Request Enterprise Consult", variant: "dark" }}
            />

            {/* Custom One-Time Build — no price, CTA only */}
            <TierCard
              highlight={false}
              badge=""
              title="Custom One-Time Build"
              priceLine="Scoped fixed bid after discovery"
              subtitle="Focused automation project"
              bullets={[
                "Ideal for a single, high-impact workflow",
                "Examples: document parsing, data entry, reporting",
                "Delivered with testing, guardrails, and handover",
                "Future-proofed so you can expand later",
              ]}
              cta={{ href: "/strategy-call", label: "Request Custom Quote", variant: "indigo" }}
            />
          </div>

          <div className="max-w-5xl mx-auto mt-10 grid md:grid-cols-3 gap-6 text-sm">
            <BadgeBox title="Implementation" body="Typical 30–60 days from discovery to rollout (scope dependent)." />
            <BadgeBox title="Pricing Model" body="Outcome-based monthly rate tied to your TMAP — no hourly surprises." />
            <BadgeBox title="Capacity" body="We onboard up to 3 new clients per month to maintain quality." />
          </div>
        </div>
      </section>

      {/* ROI — swapped to use the premium component */}
      <PremiumROI />

      {/* Closing CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready To Move From Ideas To Impact?</h2>
          <p className="text-xl text-blue-100 mb-8">
            We’ll map your highest-ROI automations, build a clear plan, and ship a working system quickly.
          </p>
          <Link
            href="/strategy-call"
            className="bg-white text-blue-600 px-8 py-4 rounded-md text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Book Your Strategy Call
          </Link>
        </div>
      </section>

      
    </div>
  );
}

/* =========================================================
   Components
   ========================================================= */
function TierCard({
  highlight,
  badge,
  title,
  priceLine,
  subtitle,
  bullets,
  cta,
  footerNote,
}: {
  highlight: boolean;
  badge?: string;
  title: string;
  priceLine: string;
  subtitle: string;
  bullets: string[];
  cta: { href: string; label: string; variant: "blue" | "dark" | "indigo" };
  footerNote?: string;
}) {
  const ring = highlight ? "border-2 border-blue-500 bg-blue-50 relative lg:scale-[1.03]" : "border border-gray-200 bg-white";
  const btn =
    cta.variant === "blue"
      ? "bg-blue-600 hover:bg-blue-700 text-white"
      : cta.variant === "indigo"
      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
      : "bg-gray-900 hover:bg-black text-white";

  return (
    <div className={`rounded-2xl p-8 shadow-sm ${ring}`}>
      {badge ? (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">{badge}</span>
        </div>
      ) : null}
      <div className="text-center mb-7">
        <h4 className="text-2xl font-bold text-gray-900 mb-1">{title}</h4>
        <div className="text-xl font-semibold text-blue-700">{priceLine}</div>
        <div className="text-gray-600 mt-1">{subtitle}</div>
      </div>
      <ul className="space-y-3 mb-7 text-gray-800">
        {bullets.map((b) => (
          <li key={b} className="flex items-start">
            <CheckIcon />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <Link href={cta.href} className={`block w-full text-center py-3 rounded-md font-semibold transition-colors ${btn}`}>
        {cta.label}
      </Link>
      {footerNote ? <p className="text-xs text-gray-600 mt-3 text-center">{footerNote}</p> : null}
    </div>
  );
}

function BadgeBox({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="inline-flex items-center gap-2">
        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-900 text-white">{title}</span>
      </div>
      <p className="mt-2 text-gray-700">{body}</p>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function Metric({
  color,
  title,
  value,
}: {
  color: "blue" | "green" | "purple" | "orange";
  title: string;
  value: string;
}) {
  const c = colorMap[color];
  return (
    <div className={`${c.bg} p-4 rounded-lg border border-gray-200`}>
      <h4 className={`font-semibold ${c.text} mb-1`}>{title}</h4>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  );
}

function Range({
  label,
  min,
  max,
  value,
  onChange,
  suffix = "",
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (n: number) => void;
  suffix?: string;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-900 mb-2">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-700 font-medium">{min}</span>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          aria-label={label}
        />
        <span className="text-sm text-gray-700 font-medium">{max}</span>
      </div>
      <div className="text-center mt-2 text-2xl font-bold text-blue-600">
        {value}
        {suffix}
      </div>
    </div>
  );
}

function LabeledNumber({
  id,
  label,
  prefix,
  value,
  onChange,
  step = 100,
  hint,
}: {
  id: string;
  label: string;
  prefix?: string;
  value: number;
  onChange: (n: number) => void;
  step?: number;
  hint?: string;
}) {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-900 mb-2">
        {label}
      </label>
      <div className="flex gap-3 items-center">
        {prefix ? <span className="text-gray-700">{prefix}</span> : null}
        <input
          id={id}
          type="number"
          min={0}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value || 0))}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 bg-white focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {hint ? (
        <p className="text-sm text-gray-700 mt-2 p-3 bg-gray-50 rounded-md">
          {hint}
        </p>
      ) : null}
    </div>
  );
}