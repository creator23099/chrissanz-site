// app/strategy-call/page.tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";

function StrategyCallInner() {
  const [isClient, setIsClient] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const searchParams = useSearchParams();

  // ---------- Client gate + URL hints ----------
  useEffect(() => {
    setIsClient(true);

    const hinted =
      searchParams.get("submitted") === "true" ||
      (typeof window !== "undefined" &&
        (window.location.hash === "#submitted" ||
         window.location.hash === "#calendar"));

    if (hinted) setFormSubmitted(true);
    if (typeof window !== "undefined" && window.location.hash === "#calendar") {
      setFormSubmitted(true);
      setShowCalendar(true);
    }
  }, [searchParams]);

  // ---------- Robust Tally submit detection ----------
  useEffect(() => {
    if (!isClient) return;

    const markSubmitted = () => {
      setFormSubmitted(true);
      // shrink thank-you so the Next button is visible
      setTimeout(() => {
        const iframe = document.querySelector<HTMLIFrameElement>('iframe[data-tally-src]');
        if (iframe) iframe.style.height = "280px";
        document.getElementById("next-book-btn")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    };

    const onMessage = (event: MessageEvent) => {
      const d: any = event.data;
      const keys = [
        "tally_form_submit",
        "TALLY_FORM_SUBMIT",
        "form_submit",
        "tally:submit",
        "Tally.FormSubmitted",
      ];
      const looksTally =
        typeof d === "object" &&
        d &&
        ("formId" in d || "formId" in d?.payload || d?.source === "tally");

      if (
        (typeof d === "string" && keys.includes(d)) ||
        (typeof d === "object" && (keys.includes(d.type) || keys.includes(d.event) || keys.includes(d?.payload?.event))) ||
        looksTally
      ) {
        markSubmitted();
      }
    };

    const onHashChange = () => {
      if (location.hash === "#submitted") markSubmitted();
      if (location.hash === "#calendar") {
        markSubmitted();
        setShowCalendar(true);
      }
    };

    window.addEventListener("message", onMessage);
    window.addEventListener("hashchange", onHashChange);

    // Fallback: detect big height change → likely thank-you state.
    const iframe = document.querySelector<HTMLIFrameElement>('iframe[data-tally-src]');
    let ro: ResizeObserver | null = null;
    if (iframe && "ResizeObserver" in window) {
      let h0 = 0;
      ro = new ResizeObserver((entries) => {
        const h = Math.round(entries[0].contentRect.height);
        if (!h0) h0 = h;
        else if (Math.abs(h - h0) > 120 && !formSubmitted) markSubmitted();
      });
      ro.observe(iframe);
    }

    // Poke Tally in case the script loaded before the iframe mounted
    const tick = setInterval(() => (window as any)?.Tally?.loadEmbeds?.(), 500);
    setTimeout(() => clearInterval(tick), 4000);

    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("hashchange", onHashChange);
      if (ro) ro.disconnect();
      clearInterval(tick);
    };
  }, [isClient, formSubmitted]);

  // ---------- Calendly init when proceeding ----------
  useEffect(() => {
    if (!showCalendar || !isClient) return;

    const init = () => {
      const Calendly = (window as any).Calendly;
      if (!Calendly) return void setTimeout(init, 300);
      const parent = document.querySelector(".calendly-inline-widget");
      if (parent) {
        Calendly.initInlineWidget({
          url: "https://calendly.com/csanz06?hide_gdpr_banner=1",
          parentElement: parent as HTMLElement,
        });
      }
    };
    setTimeout(init, 120);
  }, [showCalendar, isClient]);

  const goToCalendar = () => {
    if (!formSubmitted) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setShowCalendar(true);
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 450);
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      </div>
    );
  }

  // Use both src and data-tally-src so Safari renders even if the script fails.
  const tallyUrl =
    "https://tally.so/embed/mOxAWa?alignLeft=1&transparentBackground=1&dynamicHeight=1&hideTitle=1";

  return (
    <>
      {/* Embeds */}
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
        onLoad={() => (window as any)?.Tally?.loadEmbeds?.()}
      />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />

      <div className="min-h-screen bg-white">
        {/* Transition overlay */}
        {isTransitioning && (
          <div className="fixed inset-0 bg-white/90 flex items-center justify-center z-40">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-900">Preparing your calendar...</p>
              <p className="text-gray-600">Almost there!</p>
            </div>
          </div>
        )}

        {/* STEP 1: FORM */}
        {!showCalendar ? (
          <>
            {/* Brand hero */}
            <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-16">
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_60%)]" />
                <div className="absolute -top-10 -left-24 h-80 w-[140%] rotate-[8deg] bg-[linear-gradient(90deg,transparent,rgba(99,102,241,0.08),transparent)]" />
                <div className="absolute top-32 -right-24 h-80 w-[140%] -rotate-[12deg] bg-[linear-gradient(90deg,transparent,rgba(16,185,129,0.08),transparent)]" />
              </div>

              <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Book Your Strategy Call
                </h1>
                <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
                  We’ll map the highest-ROI automations, validate a POC in ~14 days, and outline the rollout plan.
                </p>
                <div className="inline-flex flex-wrap items-center justify-center gap-3">
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
              </div>
            </section>

            {/* What to expect + Tally */}
            <section className="py-10">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-100">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">What to expect on the call</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { n: "1", h: "Discovery", p: "We audit your workflows and tools to find quick wins and risks." },
                      { n: "2", h: "Roadmap",  p: "You’ll get a tailored plan with KPIs and a POC target." },
                      { n: "3", h: "Next steps", p: "Clear TMAP, ownership, and rollout plan if we’re a fit." },
                    ].map((x) => (
                      <div key={x.n} className="flex items-start">
                        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold flex-shrink-0">
                          {x.n}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{x.h}</h3>
                          <p className="text-gray-600 text-sm">{x.p}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form iframe (works even if Tally script doesn't run) */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <iframe
                    src={tallyUrl}
                    data-tally-src={tallyUrl}
                    loading="lazy"
                    width="100%"
                    height={1200}
                    style={{ border: "none", margin: 0 }}
                    title="Request Automation Strategy Call"
                    className="w-full"
                  />
                </div>

                {/* Next button */}
                <div className="text-center mt-8">
                  <button
                    id="next-book-btn"
                    onClick={goToCalendar}
                    disabled={!formSubmitted}
                    className={`px-6 py-3 rounded-md font-semibold transition-colors ${
                      formSubmitted
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    aria-disabled={!formSubmitted}
                  >
                    Next → Book Time
                  </button>
                  {!formSubmitted && (
                    <p className="mt-2 text-sm text-gray-500">Submit the form to continue.</p>
                  )}
                </div>
              </div>
            </section>
          </>
        ) : (
          // STEP 2: CALENDLY
          <>
            <section className="py-10">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                  <div
                    className="calendly-inline-widget"
                    style={{ minWidth: "320px", height: "760px", width: "100%" }}
                  />
                </div>
              </div>
            </section>

            <section className="pb-12">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <button
                  onClick={() => setShowCalendar(false)}
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  ← Back to info form
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}

export default function StrategyCall() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      }
    >
      <StrategyCallInner />
    </Suspense>
  );
}