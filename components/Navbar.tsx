"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/guarantee" },
  { label: "Docs", href: "/faq" },
];

const industries = [
  { label: "Med Spas", href: "/industries/med-spas" },
  { label: "Contractors", href: "/industries/contractors" },
  { label: "Lawyers", href: "/industries/lawyers" },
  { label: "Dentists & Specialty", href: "/industries/dentistry" },
  { label: "Financial Services", href: "/industries/financial-services" },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [indOpen, setIndOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    const root = document.documentElement;
    if (mobileOpen) {
      root.classList.add("overflow-hidden", "touch-pan-y");
    } else {
      root.classList.remove("overflow-hidden", "touch-pan-y");
    }
    return () => root.classList.remove("overflow-hidden", "touch-pan-y");
  }, [mobileOpen]);

  // Desktop dropdown helpers
  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIndOpen(true);
  };
  const closeWithDelay = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setIndOpen(false), 120);
  };
  const toggleByClick = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIndOpen((v) => !v);
  };

  // Close all menus after clicking a link (mobile + desktop dropdown)
  const handleNavClick = () => {
    setMobileOpen(false);
    setIndOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center py-3">
          {/* Hamburger (mobile only, left) */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden mr-2 p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Logo (always left) */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-blue-600 hover:text-blue-700 transition-colors whitespace-nowrap"
            aria-label="Tropiq Automations"
            onClick={handleNavClick}
          >
            Tropiq Automations
          </Link>

          {/* Desktop nav (next to logo) */}
          <ul className="hidden md:flex items-center gap-7 ml-8 text-base font-medium">
            {navLinks.map((link) =>
              link.label === "Industries" ? (
                <li
                  key={link.href}
                  className="relative"
                  onMouseEnter={openNow}
                  onMouseLeave={closeWithDelay}
                  onPointerEnter={openNow}
                  onPointerLeave={closeWithDelay}
                >
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={indOpen}
                    onClick={toggleByClick}
                    className="inline-flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Industries
                    <svg
                      className={cx("h-4 w-4 transition-transform", indOpen && "rotate-180")}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  <div
                    role="menu"
                    className={cx(
                      "absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-xl border border-gray-100 bg-white shadow-xl",
                      indOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none",
                      "transition-all duration-200"
                    )}
                    onMouseEnter={openNow}
                    onMouseLeave={closeWithDelay}
                    onPointerEnter={openNow}
                    onPointerLeave={closeWithDelay}
                  >
                    <ul className="py-2">
                      {industries.map((industry) => (
                        <li key={industry.href}>
                          <Link
                            href={industry.href}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg mx-2 transition-colors"
                            onClick={handleNavClick}
                          >
                            {industry.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={handleNavClick}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Spacer pushes CTA to the far right on all sizes */}
          <div className="flex-1" />

          {/* CTA (desktop & mobile) */}
          <Link
            href="/strategy-call"
            className="inline-flex items-center gap-2 rounded-xl px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
            onClick={handleNavClick}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book a Strategy Call
          </Link>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cx(
          "md:hidden fixed inset-0 z-40 transition-opacity",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileOpen(false)}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Panel */}
        <div
          className={cx(
            "absolute left-0 top-0 h-full w-[86%] max-w-sm bg-white shadow-2xl border-r border-gray-100",
            "transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">Menu</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-50"
              aria-label="Close menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="px-6 py-4">
            <ul className="space-y-1">
              {navLinks.map((link) =>
                link.label === "Industries" ? (
                  <li key={link.href} className="pt-1">
                    <button
                      onClick={() => setIndOpen((v) => !v)}
                      className="w-full flex items-center justify-between py-2.5 px-2 rounded-lg text-gray-800 hover:bg-gray-50"
                      aria-expanded={indOpen}
                    >
                      <span>Industries</span>
                      <svg
                        className={cx("h-4 w-4 transition-transform", indOpen && "rotate-180")}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
                      </svg>
                    </button>
                    {indOpen && (
                      <div className="mt-1 ml-2 space-y-1">
                        {industries.map((ind) => (
                          <Link
                            key={ind.href}
                            href={ind.href}
                            className="block py-2 px-2 text-sm text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700"
                            onClick={handleNavClick}
                          >
                            {ind.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block py-2.5 px-2 rounded-lg text-gray-800 hover:bg-gray-50"
                      onClick={handleNavClick}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>

            <div className="mt-6">
              <Link
                href="/strategy-call"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700"
                onClick={handleNavClick}
              >
                Book a Strategy Call
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}