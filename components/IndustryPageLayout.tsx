// components/IndustryPageLayout.tsx
"use client";

import Link from "next/link";
import type { Industry } from "@/lib/industries.config";

export default function IndustryPageLayout({ data }: { data: Industry }) {
  const faqGroup = `${data.slug}-faq`;

  return (
    <div className="min-h-screen bg-white">
      {/* HERO (matches homepage gradient) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_60%)]" />
          <div className="absolute -top-10 -left-24 h-80 w-[140%] rotate-[8deg] bg-[linear-gradient(90deg,transparent,rgba(99,102,241,0.08),transparent)]" />
          <div className="absolute top-32 -right-24 h-80 w-[140%] -rotate-[12deg] bg-[linear-gradient(90deg,transparent,rgba(16,185,129,0.08),transparent)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:underline">Home</Link> /{" "}
            <Link href="/industries" className="hover:underline">Industries</Link> /{" "}
            <span className="text-gray-700">{data.title}</span>
          </nav>

          <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur p-8 shadow-sm">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">{data.title}</h1>
            {data.subtitle && <p className="mt-2 text-lg text-gray-700">{data.subtitle}</p>}
            <p className="mt-6 text-lg text-gray-700 max-w-3xl">{data.heroCopy}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                POC in 14 days
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-50 text-green-700 border border-green-100">
                Live in ~60 days
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-50 text-purple-700 border border-purple-100">
                Consulting-first TMAP
              </span>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href={data.ctas?.primary?.href ?? "/strategy-call"}
                className="bg-blue-600 text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {data.ctas?.primary?.label ?? "Book a Strategy Call"}
              </Link>
              <Link
                href={data.ctas?.secondary?.href ?? "/services"}
                className="border border-gray-300 text-gray-700 px-8 py-4 rounded-md text-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                {data.ctas?.secondary?.label ?? "See Services"}
              </Link>
            </div>
          </div>

          {/* Proof tiles */}
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {data.proof.map((p) => (
              <div key={p.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="text-2xl font-semibold text-gray-900">{p.value}</div>
                <div className="text-xs uppercase tracking-wide text-gray-500 mt-1">{p.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consulting approach + outcomes */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-semibold text-gray-900">Our Consulting Approach</h2>
            <ul className="mt-4 space-y-3 text-gray-700">
              {data.ownerWhyUs.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-blue-600" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-semibold text-gray-900">Outcomes We Drive</h2>
            <ul className="mt-4 space-y-3 text-gray-700">
              {data.outcomes.map((o) => (
                <li key={o} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-emerald-600" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How we’ve helped */}
      <section className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-semibold text-gray-900">How we’ve helped {data.title}</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {data.helped.map((s) => (
                <div key={s} className="rounded-xl border border-gray-200 p-4 text-gray-700">{s}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-semibold text-gray-900">Timeline</h2>
            <p className="mt-2 text-gray-700">{data.delivery.headline}</p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {data.delivery.phases.map((p) => (
                <div key={p.label} className="rounded-xl border border-gray-200 p-5">
                  <div className="text-sm font-semibold text-blue-700">{p.label}</div>
                  <div className="mt-1 text-sm text-gray-600">{p.weeks}</div>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-600" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {data.delivery.footnote && <p className="mt-4 text-xs text-gray-500">{data.delivery.footnote}</p>}
          </div>
        </div>
      </section>

      {/* FAQs — radio pattern like homepage */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Clear answers on scope, security, KPIs, and ownership.</p>
          </div>

          <input type="radio" name={faqGroup} id={`${faqGroup}-none`} defaultChecked className="hidden" />
          <div className="space-y-4">
            {data.faqs.map((f, i) => {
              const id = `${faqGroup}-${i + 1}`;
              return (
                <div key={id} className="bg-white border border-gray-200 rounded-lg">
                  <input id={id} type="radio" name={faqGroup} className="peer hidden" />
                  <label htmlFor={id} className="flex w-full cursor-pointer items-center justify-between px-6 py-4">
                    <span className="font-semibold text-gray-900">{f.q}</span>
                    <span className="text-gray-400 transition-transform peer-checked:rotate-180">⌄</span>
                  </label>
                  <div className="overflow-hidden max-h-0 peer-checked:max-h-[1200px] transition-all duration-300">
                    <div className="px-6 pb-5 text-gray-700">{f.a}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10">
            <Link
              href={data.ctas?.primary?.href ?? "/strategy-call"}
              className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
            >
              Book a Strategy Call
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to map your fastest path to ROI?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            We’ll show you exactly what to automate first — and validate it in ~14 days.
          </p>
        <Link
            href={data.ctas?.primary?.href ?? "/strategy-call"}
            className="bg-white text-blue-600 px-8 py-4 rounded-md text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Book Your Strategy Call
          </Link>
        </div>
      </section>
    </div>
  );
}