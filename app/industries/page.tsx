// app/industries/page.tsx
import Link from "next/link";
import { SLUGS, INDUSTRY_BY_SLUG } from "@/lib/industries.config";

export const metadata = {
  title: "Industries We Serve | Consulting-First Automation",
  description:
    "Explore how we help Med Spas, Contractors, Law Firms, Dental, and Financial Services with consulting-first automation.",
};

export default function IndustriesIndex() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Industries We Serve</h1>
        <p className="text-lg text-gray-600 mb-10 max-w-3xl">
          Owner-first discovery, validated POC in ~14 days, rollout ~60 days. Choose your industry to see how we partner.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SLUGS.map((slug) => {
            const d = INDUSTRY_BY_SLUG[slug];
            return (
              <Link
                key={slug}
                href={`/industries/${slug}`}
                className="block rounded-xl border border-gray-200 p-6 hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold text-gray-900">{d.title}</h2>
                <p className="text-gray-600 mt-2 line-clamp-3">{d.subtitle ?? d.heroCopy}</p>
                <span className="mt-3 inline-block text-blue-600 font-medium">Learn more →</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}