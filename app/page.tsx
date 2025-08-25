// app/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/** Count-up span that animates when it enters the viewport */
function CountUpSpan({
  to,
  suffix = "",
  duration = 1200,
  className = "",
  ariaLabel,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let started = false;

    const run = () => {
      if (started) return;
      started = true;

      const start = 0;
      const t0 = performance.now();

      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        const val = Math.round(start + (to - start) * p);
        el.textContent = `${val}${suffix}`;
        if (p < 1) raf = requestAnimationFrame(tick);
        else setDone(true);
      };

      raf = requestAnimationFrame(tick);
    };

    // If already visible (e.g., fast nav), just run.
    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((e) => {
                if (e.isIntersecting) {
                  run();
                  io.disconnect();
                }
              });
            },
            { threshold: 0.2 }
          )
        : null;

    if (io) io.observe(el);
    else run();

    return () => {
      if (io) io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [to, suffix, duration]);

  return (
    <span
      ref={ref}
      className={className}
      aria-label={ariaLabel}
      // fallback content before animation starts
    >
      {done ? `${to}${suffix}` : `0${suffix}`}
    </span>
  );
}

/** ----------------------------------------------------------------
 *  Reusable logo badge for the integrations marquee — with hover effects
 *  ---------------------------------------------------------------- */
function LogoBadge({
  src,
  label,
  href,
  variant = "tile", // "tile" | "plain"
}: {
  src: string;
  label: string;
  href?: string;
  variant?: "tile" | "plain";
}) {
  const content = (
    <div
      className={[
        "group mx-8 flex items-center gap-3 opacity-90 hover:opacity-100 transition",
        "hover:-translate-y-0.5",
      ].join(" ")}
    >
      {variant === "tile" ? (
        <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-transform group-hover:scale-105">
          <Image
            src={src}
            alt={label}
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
        </div>
      ) : (
        <Image
          src={src}
          alt={label}
          width={44}
          height={44}
          className="h-11 w-11 object-contain transition-transform group-hover:scale-[1.06] group-hover:drop-shadow"
          priority
        />
      )}
      <span className="text-sm md:text-base text-gray-700">{label}</span>
    </div>
  );

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} integration`}
      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-md"
    >
      {content}
    </a>
  ) : (
    content
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20">
        {/* Subtle premium background (radial glow + soft light beams) */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_60%)] blur-0" />
          <div className="absolute -top-10 -left-24 h-80 w-[140%] rotate-[8deg] bg-[linear-gradient(90deg,transparent,rgba(99,102,241,0.08),transparent)]" />
          <div className="absolute top-32 -right-24 h-80 w-[140%] -rotate-[12deg] bg-[linear-gradient(90deg,transparent,rgba(16,185,129,0.08),transparent)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            We Build AI Systems That Save Time &amp; Drive Growth
          </h1>

          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            We audit your workflows, pinpoint the highest-ROI automations, and deploy
            production systems that reclaim <span className="font-semibold text-gray-800">15+ hours weekly</span> and
            accelerate revenue—without disrupting your ops.
          </p>

          {/* Timeline / Promise strip */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 mb-8">
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-50 text-blue-700 border border-blue-100">
              POC in 14 days
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-50 text-green-700 border border-green-100">
              Live in 60 days
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-50 text-purple-700 border border-purple-100">
              5× ROI guarantee
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/strategy-call"
              className="bg-blue-600 text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Your AI Roadmap
            </Link>
            <Link
              href="/services"
              className="border border-gray-300 text-gray-700 px-8 py-4 rounded-md text-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              See What’s Possible
            </Link>
          </div>

          {/* Micro-proof row (now powered by a client counter) */}
          <div id="micro-proof" className="mt-8 max-w-3xl mx-auto">
            {/* Desktop */}
            <div className="hidden sm:flex items-center justify-center gap-10 text-gray-700">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium">
                  <CountUpSpan
                    to={15}
                    suffix="+"
                    className="font-semibold text-gray-900 mr-1"
                    ariaLabel="15 plus"
                  />
                  hours reclaimed weekly across ops &amp; sales
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-600" />
                <span className="text-sm font-medium">
                  <CountUpSpan
                    to={3}
                    suffix="×"
                    className="font-semibold text-gray-900 mr-1"
                    ariaLabel="3 times"
                  />
                  faster lead response → higher win rates
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-purple-600" />
                <span className="text-sm font-medium">
                  <CountUpSpan
                    to={30}
                    suffix="%"
                    className="font-semibold text-gray-900 mr-1"
                    ariaLabel="30 percent"
                  />
                  cost savings with automation-first systems
                </span>
              </div>
            </div>

            {/* Mobile */}
            <div className="sm:hidden grid grid-cols-1 gap-3 text-center text-gray-700 mt-2">
              <div className="inline-flex items-center justify-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                <CountUpSpan to={15} suffix="+" className="font-semibold text-gray-900 mr-1" />
                <span className="text-sm">hours reclaimed weekly</span>
              </div>
              <div className="inline-flex items-center justify-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-600" />
                <CountUpSpan to={3} suffix="×" className="font-semibold text-gray-900 mr-1" />
                <span className="text-sm">faster response times</span>
              </div>
              <div className="inline-flex items-center justify-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-purple-600" />
                <CountUpSpan to={30} suffix="%" className="font-semibold text-gray-900 mr-1" />
                <span className="text-sm">cost savings</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            30-minute strategy call • No sales pitch • Actionable next steps
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Save hours. Close more leads. Automate the grind.
            </h2>
            <p className="text-lg text-gray-600">
              Operational AI that actually ships and delivers measurable results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth={2} />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Save 15+ Hours Weekly</h3>
              <p className="text-gray-600">Cut repetitive tasks across ops, sales, and support.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none">
                  <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" stroke="currentColor" strokeWidth={2} />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Close More Leads</h3>
              <p className="text-gray-600">Instant responses and intelligent, on-brand follow-up.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    stroke="currentColor"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Scale Without Overhead</h3>
              <p className="text-gray-600">Systems that grow with you and stay maintainable.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Transform Your Business</h2>
            <p className="text-lg text-gray-600">
              A proven, step-by-step path from audit → working system → measurable ROI.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Audit &amp; Discovery</h3>
              <p className="text-gray-600">
                Deep-dive into your workflows and tech stack to uncover bottlenecks, hidden costs, and quick-win automation opportunities. 
                You’ll walk away with a clear map of where AI creates the most impact.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Build &amp; Test</h3>
              <p className="text-gray-600">
                We ship a working proof-of-concept in as little as 14 days, then iterate rapidly into a production-ready system. 
                Every build includes testing, guardrails, and clear documentation so it scales with your team.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Launch &amp; Optimize</h3>
              <p className="text-gray-600">
                Smooth rollout with training, monitoring, and analytics baked in. 
                We continue optimizing post-launch to ensure adoption, security, and long-term ROI—backed by our 5× ROI guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Critical Workflows We Automate */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Critical Workflows We Automate</h2>
            <p className="text-lg text-gray-600">
              We eliminate the repetitive tasks that drain your team’s energy—slow responses, manual updates, 
              scattered marketing, and admin overhead. The result: <span className="font-semibold">hours back each week, faster revenue cycles, and systems that run reliably</span>.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Lead Capture & Response */}
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lead Capture &amp; Response</h3>
              <p className="text-gray-600">
                No more inbox triage. Leads get <span className="font-semibold">answered, qualified, and routed</span> in seconds, 
                with calls booked automatically.
              </p>
            </div>

            {/* CRM & Sales Operations */}
            <div className="text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">CRM &amp; Sales Operations</h3>
              <p className="text-gray-600">
                Stop copy-pasting data. Pipelines, notes, and follow-ups update themselves, 
                ensuring <span className="font-semibold">zero missed deals</span>.
              </p>
            </div>

            {/* Marketing & Content Ops */}
            <div className="text-center">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M9 17v-6h13M9 5h6v12H9V5z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Marketing &amp; Content Ops</h3>
              <p className="text-gray-600">
                End repetitive scheduling. A single asset turns into <span className="font-semibold">multi-channel campaigns</span>— 
                auto-formatted, published, and tracked.
              </p>
            </div>

            {/* Admin & Reporting */}
            <div className="text-center">
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M12 6v6l4 2m6 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Admin &amp; Reporting</h3>
              <p className="text-gray-600">
                Repetitive back-office work—reports, invoices, scheduling—delivered <span className="font-semibold">error-free</span> 
                without manual effort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations marquee (real logos, bigger, accurate) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-gray-900">Integrates with the tools you already use</h3>
          <p className="mt-2 text-lg text-gray-600">
            We connect to your CRM, inbox, data stores, and comms—no heavy lift on your side.
          </p>

          <div className="relative mt-8 overflow-hidden">
            <div
              className="flex items-center gap-8 animate-[scroll_30s_linear_infinite]"
              style={{ width: "max-content" }}
            >
              {[
                { src: "/logos/gmail.svg",        label: "Gmail",         href: "https://mail.google.com",         variant: "plain"  },
                { src: "/logos/slack.svg",        label: "Slack",         href: "https://slack.com",               variant: "plain"  },
                { src: "/logos/notion.svg",       label: "Notion",        href: "https://notion.so",               variant: "tile"   },
                { src: "/logos/airtable.svg",     label: "Airtable",      href: "https://airtable.com",            variant: "tile"   },
                { src: "/logos/zapier.svg",       label: "Zapier",        href: "https://zapier.com",              variant: "tile"   },
                { src: "/logos/hubspot.svg",      label: "HubSpot",       href: "https://hubspot.com",             variant: "tile"   },
                { src: "/logos/salesforce.svg",   label: "Salesforce",    href: "https://salesforce.com",          variant: "tile"   },
                { src: "/logos/google-drive.svg", label: "Google Drive",  href: "https://drive.google.com",        variant: "plain"  },
                { src: "/logos/google-sheets.svg",label: "Google Sheets", href: "https://docs.google.com/sheets",  variant: "plain"  },
                { src: "/logos/n8n.svg",          label: "n8n",           href: "https://n8n.io",                  variant: "tile"   },
              ]
                .concat([
                  { src: "/logos/gmail.svg",        label: "Gmail",         href: "https://mail.google.com",         variant: "plain"  },
                  { src: "/logos/slack.svg",        label: "Slack",         href: "https://slack.com",               variant: "plain"  },
                  { src: "/logos/notion.svg",       label: "Notion",        href: "https://notion.so",               variant: "tile"   },
                  { src: "/logos/airtable.svg",     label: "Airtable",      href: "https://airtable.com",            variant: "tile"   },
                  { src: "/logos/zapier.svg",       label: "Zapier",        href: "https://zapier.com",              variant: "tile"   },
                  { src: "/logos/hubspot.svg",      label: "HubSpot",       href: "https://hubspot.com",             variant: "tile"   },
                  { src: "/logos/salesforce.svg",   label: "Salesforce",    href: "https://salesforce.com",          variant: "tile"   },
                  { src: "/logos/google-drive.svg", label: "Google Drive",  href: "https://drive.google.com",        variant: "plain"  },
                  { src: "/logos/google-sheets.svg",label: "Google Sheets", href: "https://docs.google.com/sheets",  variant: "plain"  },
                  { src: "/logos/n8n.svg",          label: "n8n",           href: "https://n8n.io",                  variant: "tile"   },
                ])
                .map((item, i) => (
                  <LogoBadge
                    key={`${item.label}-${i}`}
                    src={item.src}
                    label={item.label}
                    href={item.href}
                    variant={item.variant as "tile" | "plain"}
                  />
                ))}
            </div>

            {/* Pause on hover & keyframes */}
            <style>{`
              @keyframes scroll {
                from { transform: translateX(0); }
                to   { transform: translateX(-50%); }
              }
              .animate-[scroll_30s_linear_infinite]:hover {
                animation-play-state: paused;
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* FAQ — left aligned, all collapsed by default, one open at a time (no hooks) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Clear answers on timelines, ownership, pricing, security, and fit.
            </p>
          </div>

          {/* Hidden “none selected” radio so page loads with all items collapsed */}
          <input type="radio" name="faq" id="faq-none" defaultChecked className="hidden" />

          <div className="space-y-4">
            {/* Q1 */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <input id="faq-1" type="radio" name="faq" className="peer hidden" />
              <label htmlFor="faq-1" className="flex w-full cursor-pointer items-center justify-between px-6 py-4">
                <span className="font-semibold text-gray-900">What kinds of businesses do you work with?</span>
                <span className="text-gray-400 transition-transform peer-checked:rotate-180">⌄</span>
              </label>
              <div className="overflow-hidden max-h-0 peer-checked:max-h-[1000px] transition-all duration-300">
                <div className="px-6 pb-5 text-gray-700 space-y-3">
                  <p>
                    We partner with growth-minded SMB and mid-market teams across <span className="font-semibold">SaaS</span>,{" "}
                    <span className="font-semibold">services</span>, <span className="font-semibold">e-commerce</span>,{" "}
                    <span className="font-semibold">real estate</span>, <span className="font-semibold">healthcare</span>, and{" "}
                    <span className="font-semibold">professional firms</span>. If you have clear outcomes and an AI budget,
                    we can scope a fast path to ROI.
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-800">Examples:</span> lead response SLAs for a
                    multi-location clinic, claims triage for a regional insurer, and sales enablement automation
                    for a B2B SaaS team.
                  </p>
                </div>
              </div>
            </div>

            {/* Q2 */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <input id="faq-2" type="radio" name="faq" className="peer hidden" />
              <label htmlFor="faq-2" className="flex w-full cursor-pointer items-center justify-between px-6 py-4">
                <span className="font-semibold text-gray-900">How long does implementation take?</span>
                <span className="text-gray-400 transition-transform peer-checked:rotate-180">⌄</span>
              </label>
              <div className="overflow-hidden max-h-0 peer-checked:max-h-[1000px] transition-all duration-300">
                <div className="px-6 pb-5 text-gray-700 space-y-3">
                  <p>
                    A validated <span className="font-semibold text-gray-800">POC in ~14 days</span>. Typical production hardening
                    and rollout within <span className="font-semibold text-gray-800">~60 days</span> (scope and integrations dependent).
                  </p>
                  <ul className="list-disc pl-6 text-gray-600">
                    <li><span className="font-semibold text-gray-800">Week 1–2:</span> discovery, data access, POC.</li>
                    <li><span className="font-semibold text-gray-800">Week 3–6:</span> iteration, guardrails, analytics, QA.</li>
                    <li><span className="font-semibold text-gray-800">Week 7–8:</span> production rollout, training, playbooks.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Q3 */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <input id="faq-3" type="radio" name="faq" className="peer hidden" />
              <label htmlFor="faq-3" className="flex w-full cursor-pointer items-center justify-between px-6 py-4">
                <span className="font-semibold text-gray-900">Who owns the IP you build?</span>
                <span className="text-gray-400 transition-transform peer-checked:rotate-180">⌄</span>
              </label>
              <div className="overflow-hidden max-h-0 peer-checked:max-h-[1000px] transition-all duration-300">
                <div className="px-6 pb-5 text-gray-700 space-y-3">
                  <p>
                    <span className="font-semibold">You do—100%.</span> Workflows, custom code, prompts, infra,
                    and documentation are delivered with admin access. If we roll off, we run a structured
                    handover (runbooks, diagrams, escalation paths) so your team or another vendor can operate it.
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-800">Handover pack includes:</span> architecture diagram,
                    .env and secret rotation checklist, deployment steps (CI/CD), test cases, and SOPs.
                  </p>
                </div>
              </div>
            </div>

            {/* Q4 */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <input id="faq-4" type="radio" name="faq" className="peer hidden" />
              <label htmlFor="faq-4" className="flex w-full cursor-pointer items-center justify-between px-6 py-4">
                <span className="font-semibold text-gray-900">How does pricing work?</span>
                <span className="text-gray-400 transition-transform peer-checked:rotate-180">⌄</span>
              </label>
              <div className="overflow-hidden max-h-0 peer-checked:max-h-[1000px] transition-all duration-300">
                <div className="px-6 pb-5 text-gray-700 space-y-3">
                  <p>
                    Outcome-based monthly engagement with a clear <span className="font-semibold">TMAP</span> (technical mutual
                    action plan): milestones, deliverables, and success criteria agreed up front. Fixed rate by scope,
                    with transparent weekly progress and burndown.
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-800">Example:</span> “Reduce lead response time to &lt;60s with
                    end-to-end routing and reporting; deploy v1 to two regions; train team; achieve ≥3× reply rate vs. baseline.”
                  </p>
                </div>
              </div>
            </div>

            {/* Q5 */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <input id="faq-5" type="radio" name="faq" className="peer hidden" />
              <label htmlFor="faq-5" className="flex w-full cursor-pointer items-center justify-between px-6 py-4">
                <span className="font-semibold text-gray-900">Which industries do you specialize in?</span>
                <span className="text-gray-400 transition-transform peer-checked:rotate-180">⌄</span>
              </label>
              <div className="overflow-hidden max-h-0 peer-checked:max-h-[1000px] transition-all duration-300">
                <div className="px-6 pb-5 text-gray-700">
                  Strong patterns in <span className="font-semibold">Med Spas</span>,{" "}
                  <span className="font-semibold">Contractors</span>, <span className="font-semibold">Legal</span>,{" "}
                  <span className="font-semibold">Dental/Specialty</span>, and <span className="font-semibold">Financial Services</span>.
                  We’re industry-agnostic in approach—discovery clarifies data, tools, and compliance so we can execute quickly.
                </div>
              </div>
            </div>

            {/* Q6 */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <input id="faq-6" type="radio" name="faq" className="peer hidden" />
              <label htmlFor="faq-6" className="flex w-full cursor-pointer items-center justify-between px-6 py-4">
                <span className="font-semibold text-gray-900">Do you build from scratch or use existing tools?</span>
                <span className="text-gray-400 transition-transform peer-checked:rotate-180">⌄</span>
              </label>
              <div className="overflow-hidden max-h-0 peer-checked:max-h-[1000px] transition-all duration-300">
                <div className="px-6 pb-5 text-gray-700 space-y-3">
                  <p>
                    Both—whichever drives ROI faster. We write custom services where it matters (e.g., data
                    normalization, policy enforcement) and use proven platforms (e.g., <span className="font-semibold">n8n</span>,
                    vector DBs, LLM providers) for speed and reliability.
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-800">Example stack:</span> n8n for orchestration, OAuth-backed
                    connectors (HubSpot, Slack, Gmail), a retrieval pipeline (Postgres/BigQuery → embeddings),
                    and a small Node/Next service for policies, RBAC, and analytics.
                  </p>
                </div>
              </div>
            </div>

            {/* Q7 */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <input id="faq-7" type="radio" name="faq" className="peer hidden" />
              <label htmlFor="faq-7" className="flex w-full cursor-pointer items-center justify-between px-6 py-4">
                <span className="font-semibold text-gray-900">What about security, privacy, and compliance?</span>
                <span className="text-gray-400 transition-transform peer-checked:rotate-180">⌄</span>
              </label>
              <div className="overflow-hidden max-h-0 peer-checked:max-h-[1200px] transition-all duration-300">
                <div className="px-6 pb-5 text-gray-700 space-y-3">
                  <p>
                    We align to your controls (e.g., <span className="font-semibold">SOC 2</span>,{" "}
                    <span className="font-semibold">HIPAA</span>, <span className="font-semibold">GDPR</span>,{" "}
                    <span className="font-semibold">PCI-DSS</span>) and implement least-privilege, encrypted transit/storage,
                    and auditable operations.
                  </p>
                  <ul className="list-disc pl-6 text-gray-600">
                    <li><span className="font-semibold text-gray-800">Data:</span> field-level redaction, PII masking, per-tenant encryption keys.</li>
                    <li><span className="font-semibold text-gray-800">Access:</span> SSO/SAML, role-based access control, scoped API tokens.</li>
                    <li><span className="font-semibold text-gray-800">Runtime:</span> environment isolation, VPC ingress/egress rules, secrets in KMS/SM.</li>
                    <li><span className="font-semibold text-gray-800">LLM guardrails:</span> content filters, prompt hashing, retrieval allow-lists.</li>
                    <li><span className="font-semibold text-gray-800">Audit:</span> structured logs, immutable task history, incident runbooks.</li>
                  </ul>
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-800">Compliance example:</span> for a dental group (HIPAA),
                    PHI is segregated in a restricted schema; prompts exclude PHI; access is via clinician role only; all e-mails are
                    stored with eDiscovery retention and a BAA is in place with vendors.
                  </p>
                </div>
              </div>
            </div>

            {/* Q8 */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <input id="faq-8" type="radio" name="faq" className="peer hidden" />
              <label htmlFor="faq-8" className="flex w-full cursor-pointer items-center justify-between px-6 py-4">
                <span className="font-semibold text-gray-900">How do I know if AI is a good fit for us?</span>
                <span className="text-gray-400 transition-transform peer-checked:rotate-180">⌄</span>
              </label>
              <div className="overflow-hidden max-h-0 peer-checked:max-h-[1000px] transition-all duration-300">
                <div className="px-6 pb-5 text-gray-700 space-y-3">
                  <p>
                    If you handle high message volume, repetitive workflows, structured decisions, or data silos,
                    AI usually pays back quickly. We’ll quantify the impact in discovery, then validate with a POC
                    so you have proof before scaling.
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-800">Quick-win indicators:</span> response SLAs &gt; 5 minutes,
                    manual copy/paste across systems, “excel-as-database” workflows, or backlogs of unanswered inbound.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/strategy-call"
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your operations?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            We’ll map the fastest path to ROI and show you exactly what to automate first.
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