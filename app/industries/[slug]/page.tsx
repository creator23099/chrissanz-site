// app/industries/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IndustryPageLayout from "@/components/IndustryPageLayout";
import { INDUSTRY_BY_SLUG, SLUGS, type Industry } from "@/lib/industries.config";

type PageProps = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const d = INDUSTRY_BY_SLUG[params.slug] as Industry | undefined;
  if (!d) return { title: "Industry Not Found", robots: { index: false } };

  const title = d.seo?.title ?? `${d.title} | Consulting-First Automation`;
  const description = d.seo?.description ?? d.heroCopy.slice(0, 155);
  const keywords = d.seo?.keywords?.join(", ");

  return {
    title,
    description,
    keywords,
    alternates: { canonical: `/industries/${params.slug}` },
    openGraph: { title, description, url: `/industries/${params.slug}`, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function Page({ params }: PageProps) {
  const data = INDUSTRY_BY_SLUG[params.slug];
  if (!data) return notFound();
  return <IndustryPageLayout data={data} />;
}