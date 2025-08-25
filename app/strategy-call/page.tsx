'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Script from 'next/script';

export default function StrategyCall() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Set client flag to prevent hydration mismatch
    setIsClient(true);

    // Check if user was redirected from form submission
    if (searchParams.get('submitted') === 'true') {
      setShowCalendar(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isClient) return;

    // Load Tally embeds after client mount
    const loadTally = () => {
      if (typeof window !== 'undefined' && (window as any).Tally) {
        (window as any).Tally.loadEmbeds();
      }
    };

    // Enhanced form submission detection
    const handleTallySubmission = () => {
      setIsTransitioning(true);
      // Smooth transition delay
      setTimeout(() => {
        setShowCalendar(true);
        setIsTransitioning(false);
        // Scroll to top of calendar smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 800);
    };

    // Listen for multiple submission events
    const handleMessage = (event: MessageEvent) => {
      if (event.data) {
        // Handle Tally form submission
        if (event.data.type === 'tally_form_submit' || 
            event.data.type === 'TALLY_FORM_SUBMIT' ||
            event.data.event === 'form_submit') {
          handleTallySubmission();
        }
      }
    };

    window.addEventListener('message', handleMessage);

    // Also listen for hash changes (some forms use this)
    const handleHashChange = () => {
      if (window.location.hash === '#calendar' || window.location.hash === '#submitted') {
        handleTallySubmission();
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    // Load Tally after a short delay to ensure it's available
    setTimeout(loadTally, 100);

    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [isClient]);

  // Initialize Calendly when calendar view is shown
  useEffect(() => {
    if (showCalendar && isClient) {
      // Wait a bit for the DOM to update, then initialize Calendly
      const initializeCalendly = () => {
        if (typeof window !== 'undefined' && (window as any).Calendly) {
          const calendlyElement = document.querySelector('.calendly-inline-widget');
          if (calendlyElement) {
            // Use the correct Calendly API method for inline widgets
            (window as any).Calendly.initInlineWidget({
              url: 'https://calendly.com/csanz06?hide_gdpr_banner=1',
              parentElement: calendlyElement,
              prefill: {},
              utm: {}
            });
          }
        } else {
          // If Calendly isn't loaded yet, try again in a moment
          setTimeout(initializeCalendly, 500);
        }
      };

      setTimeout(initializeCalendly, 100);
    }
  }, [showCalendar, isClient]);

  // Don't render dynamic content until client-side
  if (!isClient) {
    return (
      <div className="min-h-screen bg-white">
        
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Load external scripts using Next.js Script component */}
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && (window as any).Tally) {
            (window as any).Tally.loadEmbeds();
          }
        }}
      />
      
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
      
      <div className="min-h-screen bg-white">
        

        {/* Transition Loading State */}
        {isTransitioning && (
          <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-40">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-lg font-semibold text-gray-900">Preparing your calendar...</p>
              <p className="text-gray-600">Almost there!</p>
            </div>
          </div>
        )}

        {!showCalendar ? (
          // FORM VIEW
          <>
            {/* Header Section */}
            <section className="bg-gradient-to-b from-gray-50 to-white py-12">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Book Your Strategy Call
                </h1>
                <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
                  Let's identify the AI automation opportunities that will have the biggest impact on your business.
                </p>
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    30 minutes
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                    Video call
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    No obligation
                  </div>
                </div>
              </div>
            </section>

            {/* Form Section */}
            <section className="py-8">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* What to Expect */}
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

                {/* Progress Indicator */}
                <div className="mb-6">
                  <div className="flex items-center justify-center">
                    <div className="flex items-center">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                      <div className="w-16 h-1 bg-gray-200 mx-2"></div>
                      <div className="bg-gray-200 text-gray-400 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-sm text-gray-600">Step 1 of 2: Tell us about your business</span>
                  </div>
                </div>

                {/* Tally Form Embed */}
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

                {/* Manual trigger for testing */}
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
          // CALENDAR VIEW
          <>
            {/* Header Section */}
            <section className="bg-gradient-to-b from-gray-50 to-white py-12">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  
                  {/* Progress Indicator */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center">
                      <div className="flex items-center">
                        <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">✓</div>
                        <div className="w-16 h-1 bg-blue-600 mx-2"></div>
                        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                      </div>
                    </div>
                    <div className="text-center mt-2">
                      <span className="text-sm text-gray-600">Step 2 of 2: Choose your preferred time</span>
                    </div>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Perfect! Now Choose Your Time
                  </h1>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Select a convenient time for your strategy call. We'll discuss your business goals and create a custom automation roadmap.
                  </p>
                </div>

                {/* What Happens Next */}
                <div className="bg-blue-50 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">What happens next:</h2>
                  <div className="grid md:grid-cols-3 gap-4 text-left">
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm font-bold flex-shrink-0">1</div>
                      <div>
                        <p className="text-gray-600 text-sm">You'll receive a calendar confirmation with call details</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm font-bold flex-shrink-0">2</div>
                      <div>
                        <p className="text-gray-600 text-sm">We'll review your responses and prepare a custom strategy</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm font-bold flex-shrink-0">3</div>
                      <div>
                        <p className="text-gray-600 text-sm">Join the call to discover your automation opportunities</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Calendly Section */}
            <section className="py-8">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  {/* Calendly inline widget */}
                  <div 
                    className="calendly-inline-widget" 
                    style={{minWidth: '320px', height: '700px', width: '100%'}}
                  />
                </div>
              </div>
            </section>

            {/* Back Button */}
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

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">ChrisSanz.com</h3>
                <p className="text-gray-400">AI automation that transforms how your business runs.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/services" className="hover:text-white">AI Business Transformation</Link></li>
                  <li><Link href="/services" className="hover:text-white">Email Responder</Link></li>
                  <li><Link href="/services" className="hover:text-white">Lead Automation</Link></li>
                  <li><Link href="/services" className="hover:text-white">Content Repurposer</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/about" className="hover:text-white">About</Link></li>
                  <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                  <li><Link href="/strategy-call" className="hover:text-white">Strategy Call</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <p className="text-gray-400">Get in touch to discuss your automation needs.</p>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 ChrisSanz.com. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}