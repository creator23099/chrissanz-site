'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';

function StrategyCallInner() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsClient(true);
    if (searchParams.get('submitted') === 'true') {
      setShowCalendar(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isClient) return;

    const loadTally = () => {
      if (typeof window !== 'undefined' && (window as any).Tally) {
        (window as any).Tally.loadEmbeds();
      }
    };

    const handleTallySubmission = () => {
      setIsTransitioning(true);
      setTimeout(() => {
        setShowCalendar(true);
        setIsTransitioning(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 800);
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.data && (
        event.data.type === 'tally_form_submit' ||
        event.data.type === 'TALLY_FORM_SUBMIT' ||
        event.data.event === 'form_submit'
      )) {
        handleTallySubmission();
      }
    };

    const handleHashChange = () => {
      if (window.location.hash === '#calendar' || window.location.hash === '#submitted') {
        handleTallySubmission();
      }
    };

    window.addEventListener('message', handleMessage);
    window.addEventListener('hashchange', handleHashChange);
    setTimeout(loadTally, 100);

    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [isClient]);

  useEffect(() => {
    if (showCalendar && isClient) {
      const initializeCalendly = () => {
        if (typeof window !== 'undefined' && (window as any).Calendly) {
          const el = document.querySelector('.calendly-inline-widget');
          if (el) {
            (window as any).Calendly.initInlineWidget({
              url: 'https://calendly.com/csanz06?hide_gdpr_banner=1',
              parentElement: el as HTMLElement,
              prefill: {},
              utm: {}
            });
          }
        } else {
          setTimeout(initializeCalendly, 500);
        }
      };
      setTimeout(initializeCalendly, 100);
    }
  }, [showCalendar, isClient]);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && (window as any).Tally) {
            (window as any).Tally.loadEmbeds();
          }
        }}
      />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />

      <div className="min-h-screen bg-white">
        {isTransitioning && (
          <div className="fixed inset-0 bg-white/90 flex items-center justify-center z-40">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-900">Preparing your calendar...</p>
              <p className="text-gray-600">Almost there!</p>
            </div>
          </div>
        )}

        {!showCalendar ? (
          <>
            {/* Header */}
            <section className="bg-gradient-to-b from-gray-50 to-white py-12">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Book Your Strategy Call</h1>
                <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
                  Let's identify the AI automation opportunities that will have the biggest impact on your business.
                </p>
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    30 minutes
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Video call
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    No obligation
                  </div>
                </div>
              </div>
            </section>

            {/* Form */}
            <section className="py-8">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-blue-50 rounded-lg p-6 mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">What to expect on the call:</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold flex-shrink-0">1</div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Workflow Analysis</h3>
                        <p className="text-gray-600 text-sm">We'll audit your current processes to identify automation opportunities.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold flex-shrink-0">2</div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Custom Strategy</h3>
                        <p className="text-gray-600 text-sm">Get a tailored automation roadmap for your specific business needs.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold flex-shrink-0">3</div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Next Steps</h3>
                        <p className="text-gray-600 text-sm">Clear action plan and timeline if we're a good fit to work together.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <iframe
                    data-tally-src="https://tally.so/embed/mOxAWa?alignLeft=1&transparentBackground=1&dynamicHeight=1"
                    loading="lazy"
                    width="100%"
                    height="1501"
                    style={{ border: 'none', margin: 0 }}
                    title="Request Automation Strategy Call"
                    className="w-full"
                  />
                </div>

                <div className="text-center mt-8">
                  <button
                    onClick={() => setShowCalendar(true)}
                    className="text-blue-600 hover:text-blue-800 text-sm underline"
                  >
                    Skip to calendar (for testing)
                  </button>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Calendar */}
            <section className="py-8">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="calendly-inline-widget" style={{ minWidth: '320px', height: '700px', width: '100%' }} />
                </div>
              </div>
            </section>

            <section className="py-8">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <button
                  onClick={() => setShowCalendar(false)}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  ← Back to form
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