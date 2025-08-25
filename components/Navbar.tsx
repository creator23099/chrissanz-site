"use client";

import Link from "next/link";
import { useRef, useState } from "react";

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
  { label: "Med Spas", href: "/industries/med-spa" },
  { label: "Contractors", href: "/industries/contractors" },
  { label: "Lawyers", href: "/industries/lawyers" },
  { label: "Dentists & Specialty", href: "/industries/dentistry" },
  { label: "Financial Services", href: "/industries/financial-services" },
];

function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function EnhancedNavbar() {
  const [indOpen, setIndOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
        <nav className="mx-auto max-w-7xl px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold tracking-tight text-black">
              ChrisSanz.com
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-7 text-base font-medium">
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
                      // keep open while hovering the panel
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
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>

            {/* CTA + Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Enhanced CTA */}
              <Link
                href="/strategy-call"
                className="hidden sm:inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book a Strategy Call
              </Link>

              {/* Mobile CTA */}
              <Link
                href="/strategy-call"
                className="sm:hidden inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all duration-200"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Call
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 shadow-lg">
            <div className="px-6 py-4">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    {link.label === "Industries" ? (
                      <div>
                        <button
                          onClick={() => setIndOpen(!indOpen)}
                          className="w-full flex items-center justify-between py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-50"
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
                        {indOpen && (
                          <div className="mt-1 ml-4 space-y-1">
                            {industries.map((industry) => (
                              <Link
                                key={industry.href}
                                href={industry.href}
                                className="block py-2 px-3 text-sm text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                              >
                                {industry.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        className="block py-2 px-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </header>
    </>
  );
}