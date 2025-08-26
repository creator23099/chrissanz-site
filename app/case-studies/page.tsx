// app/case-studies/page.tsx
import Link from "next/link";

/** ---------- Types ---------- */
type Study = {
  id: string;
  slug: string;
  client: string;
  industry: string;
  title: string;
  summary: string;
  metrics: Array<{ label: string; value: string }>;
  coverImage?: string;
  date?: string;        // ISO
  anonymized?: boolean;
};

/** ---------- Realistic placeholder data (edit later) ---------- */
const ALL_STUDIES: Study[] = [
  {
    id: "law-qual-routing",
    slug: "law-firm-qualification-routing",
    client: "Regional Injury Firm (Anonymized)",
    industry: "Legal",
    title: "Faster intake & qualification lift consult show-rates",
    summary:
      "Replaced callback-based intake with an AI triage flow: captures matter details, checks fit, and books directly to attorney calendars. Added reminders and document prep links.",
    metrics: [
      { label: "First Response", value: "→ 45s (from 2h+)" },
      { label: "Consult Show-Rate", value: "+24%" },
      { label: "Weekly Hours Saved", value: "12–18" },
      { label: "Payback", value: "≈ 5 weeks" },
    ],
    coverImage: "/images/case-studies/legal.jpg",
    date: "2025-02-10",
    anonymized: true,
  },
  {
    id: "medspa-triage-booking",
    slug: "med-spa-triage-and-booking",
    client: "Glow Clinic (2 locations)",
    industry: "Med Spas",
    title: "Price-shopper filtering + instant booking improves close rate",
    summary:
      "Built a WhatsApp + web widget that qualifies by service, budget, and timing, routes A-leads to consults, and nurtures B/C leads with tailored sequences.",
    metrics: [
      { label: "Lead Response", value: "→ 20s (from same-day)" },
      { label: "Close Rate", value: "+17%" },
      { label: "No-Shows", value: "-28%" },
      { label: "Payback", value: "< 1 month" },
    ],
    coverImage: "/images/case-studies/medspa.jpg",
    date: "2024-11-22",
  },
  {
    id: "contractor-intake-ops",
    slug: "contractor-intake-and-ops-automation",
    client: "Elite Home Solutions",
    industry: "Contractors",
    title: "Ops automation removes ~$6.5K/mo in wasted time",
    summary:
      "Unified phones, CRM, and scheduling; automated estimates, reminders, and follow-ups. Dispatch sees capacity, and customers self-book reschedules.",
    metrics: [
      { label: "Monthly Time Savings", value: "$6.5K equiv." },
      { label: "Weekly Hours Saved", value: "18–25" },
      { label: "Win Rate", value: "+12%" },
      { label: "Time to Value", value: "6 weeks" },
    ],
    coverImage: "/images/case-studies/contractor.jpg",
    date: "2025-03-05",
  },
];

/** ---------- Helpers ---------- */
const INDUSTRIES = ["All", ...Array.from(new Set(ALL_STUDIES.map(s => s.industry))).sort()];
function clsx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** ---------- Metadata ---------- */
export const metadata = {
  title: "Case Studies • Tropiq Automations",
  description:
    "Real outcomes from AI systems in services, healthcare, legal, and operations. Hours saved, faster revenue cycles, and measurable ROI.",
};

/** ---------- Page Component (DEFAULT EXPORT) ---------- */
export default function CaseStudiesPage(props: any) {
  const searchParams = (props && props.searchParams) || {};
  const qParam = searchParams.q;
  const indParam = searchParams.industry;
  const pageParam = searchParams.page;

  const q = (Array.isArray(qParam) ? qParam[0] : qParam) ?? "";
  const industry = (Array.isArray(indParam) ? indParam[0] : indParam) ?? "All";
  const page = Math.max(1, parseInt((Array.isArray(pageParam) ? pageParam[0] : pageParam) ?? "1", 10));
  const PAGE = 9;

  const filtered = ALL_STUDIES.filter((s) => {
    const qq = q.toLowerCase();
    const matchQ =
      !qq ||
      s.title.toLowerCase().includes(qq) ||
      s.summary.toLowerCase().includes(qq) ||
      s.client.toLowerCase().includes(qq) ||
      s.industry.toLowerCase().includes(qq);
    const matchInd = industry === "All" || s.industry === industry;
    return matchQ && matchInd;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const slice = filtered.slice((page - 1) * PAGE, page * PAGE);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <header className="bg-gradient-to-br from-blue-50 via-purple-50 to-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Case Studies</p>
            <h1 className="mt-2 text-4xl md:text-6xl font-bold leading-[1.15] md:leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900">
              Systems that create advantage
            </h1>
            <p className="mt-5 text-lg text-slate-700">
              Real implementations, real outcomes—faster response, leaner ops, and measurable ROI.
              Figures reflect typical ranges and are rounded. Many client names are anonymized.
            </p>
          </div>

          {/* Controls */}
          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center">
            {/* Search */}
            <form action="/case-studies" className="relative w-full md:max-w-md">
              <input
                type="search"
                name="q"
                defaultValue={q}
                placeholder='Search, e.g. "follow-up"'
                className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-10 text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Search case studies"
              />
              <input type="hidden" name="industry" value={industry} />
              <input type="hidden" name="page" value="1" />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-sm text-slate-600 hover:bg-slate-100"
                aria-label="Search"
              >
                Go
              </button>
            </form>

            {/* Industry Filter */}
            <form action="/case-studies" className="flex items-center gap-2">
              <input type="hidden" name="q" value={q} />
              <input type="hidden" name="page" value="1" />
              <select
                name="industry"
                defaultValue={industry}
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Filter by industry"
              >
                {INDUSTRIES.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              <button className="rounded-xl bg-blue-600 px-4 py-3 text-white text-sm font-semibold hover:bg-blue-700">
                Apply
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Grid */}
      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {slice.length === 0 ? (
            <div className="rounded-2xl border border-dashed p-10 text-center text-slate-600">
              No matching studies yet. Try clearing filters or check back soon—new implementations are added regularly.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {slice.map((s) => (
                <article key={s.id} className="border rounded-2xl overflow-hidden hover:shadow-md transition-shadow bg-white">
                  <Link href={`/case-studies/${s.slug}`} className="block">
                    {s.coverImage ? (
                      <img src={s.coverImage} alt={s.title} className="h-44 w-full object-cover" />
                    ) : (
                      <div className="h-44 w-full bg-gradient-to-r from-blue-100 to-purple-100" />
                    )}
                  </Link>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="inline-flex items-center rounded-full border border-slate-300 px-2 py-0.5">{s.industry}</span>
                      {s.date && <time dateTime={s.date}>{new Date(s.date).toLocaleDateString()}</time>}
                      {s.anonymized && (
                        <span className="ml-auto inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
                          anonymized
                        </span>
                      )}
                    </div>
                    <h2 className="mt-2 text-lg font-semibold text-slate-900">
                      <Link href={`/case-studies/${s.slug}`}>{s.title}</Link>
                    </h2>
                    <p className="mt-2 text-slate-700 line-clamp-3">{s.summary}</p>
                    <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
                      {s.metrics.map((m, i) => (
                        <li key={i} className="rounded-lg border px-3 py-2">
                          <div className="text-slate-500">{m.label}</div>
                          <div className="font-semibold text-slate-900">{m.value}</div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      <Link href={`/case-studies/${s.slug}`} className="text-blue-700 font-semibold hover:underline">
                        Read details →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <Link
                href={`/case-studies?${new URLSearchParams({
                  q,
                  industry,
                  page: String(Math.max(1, page - 1)),
                }).toString()}`}
                className={clsx("px-3 py-2 rounded-lg border", page === 1 && "pointer-events-none opacity-50")}
              >
                Prev
              </Link>
              <span className="text-sm text-slate-600">Page {page} of {totalPages}</span>
              <Link
                href={`/case-studies?${new URLSearchParams({
                  q,
                  industry,
                  page: String(Math.min(totalPages, page + 1)),
                }).toString()}`}
                className={clsx("px-3 py-2 rounded-lg border", page === totalPages && "pointer-events-none opacity-50")}
              >
                Next
              </Link>
            </div>
          )}

          {/* CTA */}
          <section className="mt-14">
            <div className="rounded-2xl border p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
              <h3 className="text-2xl font-bold text-slate-900">Want a system like these?</h3>
              <p className="mt-2 text-slate-700">
                We’ll map your fastest path to ROI and ship a proof-of-concept within 14 days. Most clients see payback in 4–8 weeks once fully integrated.
              </p>
              <div className="mt-5">
                <Link href="/strategy-call" className="inline-block rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700">
                  Book a Strategy Call
                </Link>
              </div>
              <p className="mt-3 text-xs text-slate-500">
                Figures reflect observed ranges across 300+ deployments. Results vary by channel mix, lead quality, and adoption.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}