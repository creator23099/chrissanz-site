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

function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [indOpen, setIndOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Body scroll lock on mobile menu
  useEffect(() => {
    const { body } = document;
    if (mobileOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
    return () => {
      body.style.overflow = "";
    };
  }, [mobileOpen]);

  const openIndNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIndOpen(true);
  };
  const closeIndDelayed = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setIndOpen(false), 140);
  };

  const handleNavClick = () => {
    // Close mobile layers on any link click
    setMobileOpen(false);
    setIndOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
        {/* 3-column grid keeps layout balanced at all widths */}
        <div className="grid grid-cols-12 items-center gap-2 py-3">
          {/* Left: Brand + Mobile hamburger */}
          <div className="col-span-6 sm:col-span-3 flex items-center gap-2">
            {/* Hamburger (mobile only, left) */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Brand */}
            <Link
              href="/"
              onClick={handleNavClick}
              className="text-xl sm:text-2xl font-bold tracking-tight text-blue-600 hover:text-blue-700 transition-colors"
              aria-label="Tropiq Automations"
            >
              Tropiq Automations
            </Link>
          </div>

          {/* Center: Desktop nav */}
          <div className="col-span-12 sm:col-span-6">
            <ul className="hidden md:flex items-center justify-center gap-6 lg:gap-8 text-[15px] font-medium">
              {navLinks.map((link) =>
                link.label === "Industries" ? (
                  <li
                    key={link.href}
                    className="relative"
                    onMouseEnter={openIndNow}
                    onMouseLeave={closeIndDelayed}
                    onPointerEnter={openIndNow}
                    onPointerLeave={closeIndDelayed}
                  >
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={indOpen}
                      className="inline-flex items-center gap-1 text-gray-700 hover:text-blue-600 transition"
                      onClick={() => setIndOpen((v) => !v)}
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
                        indOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none",
                        "transition-all duration-200"
                      )}
                      onMouseEnter={openIndNow}
                      onMouseLeave={closeIndDelayed}
                      onPointerEnter={openIndNow}
                      onPointerLeave={closeIndDelayed}
                    >
                      <ul className="py-2">
                        {industries.map((industry) => (
                          <li key={industry.href}>
                            <Link
                              href={industry.href}
                              onClick={handleNavClick}
                              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg mx-2 transition"
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
                      onClick={handleNavClick}
                      className="text-gray-700 hover:text-blue-600 transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Right: CTA (always right-docked) */}
          <div className="col-span-6 sm:col-span-3 flex justify-end">
            {/* Desktop CTA */}
            <Link
              href="/strategy-call"
              onClick={handleNavClick}
              className="hidden md:inline-flex items-center gap-2 rounded-xl px-5 lg:px-6 py-2.5 text-sm font-semibold text-white
                         bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                         shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book a Strategy Call
            </Link>

            {/* Mobile CTA (smaller & snug) */}
            <Link
              href="/strategy-call"
              onClick={handleNavClick}
              className="md:hidden inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold text-white
                         bg-blue-600 hover:bg-blue-700 shadow-md transition"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Call
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile flyout */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-3">
            <ul className="space-y-1.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {link.label === "Industries" ? (
                    <details
                      open={indOpen}
                      onToggle={(e) => setIndOpen((e.target as HTMLDetailsElement).open)}
                      className="rounded-lg"
                    >
                      <summary className="flex cursor-pointer items-center justify-between py-2 px-2 rounded-lg text-gray-700 hover:bg-gray-50">
                        <span>Industries</span>
                        <svg
                          className={cx("h-4 w-4 transition-transform", indOpen && "rotate-180")}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
                        </svg>
                      </summary>
                      <div className="mt-1 ml-2 space-y-1">
                        {industries.map((industry) => (
                          <Link
                            key={industry.href}
                            href={industry.href}
                            onClick={handleNavClick}
                            className="block py-2 px-2 text-sm text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                          >
                            {industry.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={handleNavClick}
                      className="block py-2 px-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50"
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
  );
}