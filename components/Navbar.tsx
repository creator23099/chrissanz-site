"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [indOpen, setIndOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeAll = () => {
    setMobileOpen(false);
    setIndOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-center py-3">
          {/* Left: hamburger + brand */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden mr-2 p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50"
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

          <Link
            href="/"
            onClick={closeAll}
            className="text-xl sm:text-2xl font-bold tracking-tight text-blue-600 hover:text-blue-700"
          >
            Tropiq Automations
          </Link>

          {/* Center: desktop nav */}
          <ul className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-8 text-[15px] font-medium">
            {navLinks.map((link) =>
              link.label !== "Industries" ? (
                <li key={link.href}>
                  <Link href={link.href} onClick={closeAll} className="text-gray-700 hover:text-blue-600">
                    {link.label}
                  </Link>
                </li>
              ) : (
                <li key={link.href} className="relative">
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={indOpen}
                    onClick={() => setIndOpen((v) => !v)}
                    onMouseEnter={() => setIndOpen(true)}
                    onMouseLeave={() => setIndOpen(false)}
                    className="inline-flex items-center gap-1 text-gray-700 hover:text-blue-600"
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

                  {/* dropdown */}
                  <div
                    onMouseEnter={() => setIndOpen(true)}
                    onMouseLeave={() => setIndOpen(false)}
                    className={cx(
                      "absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-xl border border-gray-100 bg-white shadow-xl transition-all",
                      indOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
                    )}
                  >
                    <ul className="py-2">
                      {industries.map((i) => (
                        <li key={i.href}>
                          <Link
                            href={i.href}
                            onClick={closeAll}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg mx-2"
                          >
                            {i.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )
            )}
          </ul>

          {/* Right: compact CTA with safe spacing */}
          <div className="ml-2 sm:ml-4 lg:ml-6 flex-shrink-0">
            <Link
              href="/strategy-call"
              onClick={closeAll}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 sm:px-4 py-2 text-sm font-semibold text-white
                         bg-blue-600 hover:bg-blue-700 shadow-md transition"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book a Strategy Call
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile flyout */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-3">
            <ul className="space-y-1.5">
              {navLinks.map((link) =>
                link.label !== "Industries" ? (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeAll}
                      className="block py-2 px-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    >
                      {link.label}
                    </Link>
                  </li>
                ) : (
                  <li key={link.href}>
                    <details onToggle={(e) => setIndOpen((e.target as HTMLDetailsElement).open)}>
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
                        {industries.map((i) => (
                          <Link
                            key={i.href}
                            href={i.href}
                            onClick={closeAll}
                            className="block py-2 px-2 text-sm text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                          >
                            {i.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}