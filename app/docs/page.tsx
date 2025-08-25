// app/docs/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

/** Inline data for now (you can move to lib/faqDocs.ts later) */
type Doc = {
  slug: string;
  question: string;
  answer: string;
  category: "pricing" | "process" | "technology" | "results" | "general";
};

const DOCS: Doc[] = [
  {
    slug: "minimum-investment",
    question: "What's the minimum investment for AI automation services?",
    answer:
      "Our minimum project investment is $5,000 total. This covers strategy, build, and training.",
    category: "pricing",
  },
  {
    slug: "payment-structure",
    question: "How does payment work? Do you offer payment plans?",
    answer:
      "Typical: 50% upfront, 50% on completion. Enterprise can use milestones.",
    category: "pricing",
  },
  {
    slug: "implementation-timeline",
    question: "How long does implementation take?",
    answer:
      "Most projects complete in 30–60 days. Simpler systems in 2–3 weeks.",
    category: "process",
  },
  {
    slug: "integrations",
    question: "What systems and tools do you integrate with?",
    answer:
      "CRMs (HubSpot, Salesforce, Pipedrive), Gmail/Outlook, calendars, WhatsApp/SMS, social, e-commerce, and custom APIs.",
    category: "technology",
  },
  {
    slug: "results-tracking",
    question: "How do you measure and report results?",
    answer:
      "Dashboards for response times, conversion, hours saved, and revenue impact; monthly reports with trends and next steps.",
    category: "results",
  },
  {
    slug: "getting-started",
    question: "What’s the first step to get started?",
    answer:
      "Book a free strategy call. We’ll map quick wins and a custom roadmap.",
    category: "general",
  },
];

const CATEGORIES: Array<{ id: Doc["category"] | "all"; label: string }> = [
  { id: "all", label: "All" },
  { id: "general", label: "Getting Started" },
  { id: "pricing", label: "Pricing" },
  { id: "process", label: "Process" },
  { id: "technology", label: "Technology" },
  { id: "results", label: "Results" },
];

export default function DocsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Doc["category"] | "all">("all");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return DOCS.filter((d) => {
      const inCat = cat === "all" ? true : d.category === cat;
      const inText =
        !term ||
        d.question.toLowerCase().includes(term) ||
        d.answer.toLowerCase().includes(term);
      return inCat && inText;
    });
  }, [q, cat]);

  const grouped = useMemo(() => {
    const map: Record<string, Doc[]> = {};
    for (const d of filtered) (map[d.category] ||= []).push(d);
    return map;
  }, [filtered]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <header className="bg-gradient-to-br from-blue-50 via-purple-50 to-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900">
            Documentation
          </h1>
          <p className="mt-3 text-slate-700 max-w-3xl">
            Practical, no-fluff answers about pricing, process, integrations, and results.
          </p>

          {/* Search */}
          <div className="mt-6 max-w-2xl">
            <div className="relative">
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={'Search docs, e.g. "lead response"'}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Search docs"
              />
              {q && (
                <button
                  aria-label="Clear search"
                  onClick={() => setQ("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-sm text-slate-500 hover:bg-slate-100"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id as any)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  cat === c.id
                    ? c.id === "all"
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-blue-50"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20 border rounded-2xl">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No results</h3>
            <p className="text-slate-600">Try a different search or switch categories.</p>
            <div className="mt-6">
              <button
                onClick={() => {
                  setQ("");
                  setCat("all");
                }}
                className="rounded-xl bg-blue-600 px-5 py-2 text-white font-semibold hover:bg-blue-700"
              >
                Reset filters
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {(cat === "all"
              ? ["general", "pricing", "process", "technology", "results"]
              : [cat]
            ).map((section) => {
              const items = grouped[section] || [];
              if (items.length === 0) return null;
              const label =
                CATEGORIES.find((c) => c.id === section)?.label ?? section;

              return (
                <section key={section} className="bg-white border rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-slate-900">{label}</h2>
                  <ul className="mt-4 divide-y">
                    {items.map((d) => (
                      <li key={d.slug} className="py-4">
                        <Link
                          href={`/docs/${d.slug}`}
                          className="text-blue-700 font-semibold hover:underline"
                        >
                          {d.question}
                        </Link>
                        <p className="text-slate-600 mt-2 line-clamp-2">{d.answer}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border">
          <h3 className="text-2xl font-bold text-slate-900">Still have questions?</h3>
          <p className="text-slate-700 mt-2">
            Get a tailored walkthrough of how automation fits your workflows.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/strategy-call"
              className="inline-block rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700"
            >
              Book a Strategy Call
            </Link>
            <Link
              href="/services"
              className="inline-block rounded-xl border border-blue-600 px-6 py-3 text-blue-700 font-semibold hover:bg-blue-50"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}