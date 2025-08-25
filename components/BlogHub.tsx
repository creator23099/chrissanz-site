// components/BlogHub.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  author?: string;
  date?: string;        // ISO
  tags?: string[];
  category?: "Automation" | "Workflows" | "AI News" | "Playbooks" | "Case Studies" | "Español";
  language?: "en" | "es";
  readTimeMin?: number;
};

const CATS: Array<{ id: NonNullable<Post["category"]> | "All"; color: string }> = [
  { id: "All",         color: "border-slate-300" },
  { id: "Automation",  color: "border-blue-300" },
  { id: "Workflows",   color: "border-emerald-300" },
  { id: "AI News",     color: "border-indigo-300" },
  { id: "Playbooks",   color: "border-amber-300" },
  { id: "Case Studies",color: "border-purple-300" },
  { id: "Español",     color: "border-rose-300" },
];

export default function BlogHub({ posts }: { posts: Post[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<"All" | NonNullable<Post["category"]>>("All");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return posts.filter((p) => {
      const inCat = cat === "All" ? true : p.category === cat;
      const inText =
        !term ||
        p.title.toLowerCase().includes(term) ||
        (p.excerpt || "").toLowerCase().includes(term) ||
        (p.tags || []).join(" ").toLowerCase().includes(term);
      return inCat && inText;
    });
  }, [posts, q, cat]);

  const [page, setPage] = useState(1);
  const PAGE = 9;
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE));
  const pagePosts = filtered.slice((page - 1) * PAGE, page * PAGE);
  const featured = filtered[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <header className="bg-gradient-to-br from-blue-50 via-purple-50 to-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">The Blog</p>
            <h1 className="mt-2 text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900">
              Automation, workflows, and AI that grows revenue
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Deep dives, teardown playbooks, and practical news from the front lines of AI-powered
              operations. Actionable content to save hours and compound growth.
            </p>
          </div>

          {/* Search + Categories */}
          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative w-full md:max-w-md">
              <input
                type="search"
                value={q}
                onChange={(e) => { setQ(e.target.value); setPage(1); }}
                placeholder='Search posts, e.g. "WhatsApp bot"'
                className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Search blog posts"
              />
              {!!q && (
                <button
                  onClick={() => setQ("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-sm text-slate-500 hover:bg-slate-100"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {CATS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { setCat(c.id as any); setPage(1); }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all
                    ${cat === c.id ? "bg-blue-600 text-white border-blue-600" : `bg-white text-slate-700 ${c.color} hover:bg-blue-50`}`
                  }
                >
                  {c.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Featured */}
      {featured && (
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 items-stretch">
              <article className="border rounded-2xl overflow-hidden">
                <Link href={`/blog/${featured.slug}`} className="block">
                  {featured.coverImage ? (
                    <img
                      src={featured.coverImage}
                      alt={featured.title}
                      className="h-64 w-full object-cover"
                    />
                  ) : (
                    <div className="h-64 w-full bg-gradient-to-r from-blue-100 to-purple-100" />
                  )}
                </Link>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    {featured.category && (
                      <span className="inline-flex items-center rounded-full border border-blue-200 px-3 py-1 text-blue-700">
                        {featured.category}
                      </span>
                    )}
                    {featured.date && (
                      <time dateTime={featured.date}>
                        {new Date(featured.date).toLocaleDateString()}
                      </time>
                    )}
                    {featured.readTimeMin && <span>• {featured.readTimeMin} min</span>}
                  </div>
                  <h2 className="mt-3 text-2xl font-bold text-slate-900">
                    <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                  </h2>
                  <p className="mt-3 text-slate-700 line-clamp-3">{featured.excerpt}</p>
                  <div className="mt-5">
                    <Link
                      href={`/blog/${featured.slug}`}
                      className="inline-block rounded-xl bg-blue-600 px-5 py-2 text-white font-semibold hover:bg-blue-700"
                    >
                      Read article
                    </Link>
                  </div>
                </div>
              </article>

              {/* Newsletter / CTA */}
              <div className="border rounded-2xl p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
                <h3 className="text-2xl font-bold text-slate-900">Get the playbooks first</h3>
                <p className="mt-2 text-slate-700">
                  No fluff. One or two emails a month with working automations, prompts, and
                  teardown notes.
                </p>
                <form className="mt-6 flex gap-2" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="flex-1 rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
                    Subscribe
                  </button>
                </form>
                <p className="mt-3 text-xs text-slate-500">No spam. Unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pagePosts.map((p) => (
              <article key={p.id} className="border rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                <Link href={`/blog/${p.slug}`} className="block">
                  {p.coverImage ? (
                    <img src={p.coverImage} alt={p.title} className="h-44 w-full object-cover" />
                  ) : (
                    <div className="h-44 w-full bg-gradient-to-r from-blue-100 to-purple-100" />
                  )}
                </Link>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    {p.category && (
                      <span className="inline-flex items-center rounded-full border border-slate-300 px-2 py-0.5">
                        {p.category}
                      </span>
                    )}
                    {p.date && (
                      <time dateTime={p.date}>{new Date(p.date).toLocaleDateString()}</time>
                    )}
                    {p.readTimeMin && <span>• {p.readTimeMin} min</span>}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">
                    <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <p className="mt-2 text-slate-700 line-clamp-3">{p.excerpt}</p>
                  <div className="mt-4">
                    <Link href={`/blog/${p.slug}`} className="text-blue-700 font-semibold hover:underline">
                      Read more →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-2 rounded-lg border disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-sm text-slate-600">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-2 rounded-lg border disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}