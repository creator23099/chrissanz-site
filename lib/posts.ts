// lib/posts.ts  — MOCK-FIRST (no Airtable required)
export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body_markdown: string;
  published_at: string;
  author: string;
  tags: string;
  category: string;
  language: "en" | "es";
}

/** ---------- MOCK DATA (for UI review) ---------- */
const MOCK_POSTS: Post[] = [
  {
    id: "p1",
    slug: "ai-inbox-responder-blueprint",
    title: "Blueprint: Smart Inbox AI Responder for Insurance Agencies",
    excerpt:
      "Design, prompts, DB schema, and follow-up logic to triage, reply, and book meetings automatically.",
    body_markdown:
      "## Overview\nIntent routing, guardrails, CRM sync, and booking fallbacks.\n\n- Intent detection\n- Safety policies\n- Calendar handoff",
    published_at: "2025-08-15",
    author: "Chris Sanz",
    tags: "email, automation, insurance, n8n",
    category: "Automation",
    language: "en",
  },
  {
    id: "p2",
    slug: "guia-whatsapp-bot-es",
    title: "Guía: Bot de WhatsApp con memoria, multilenguaje y cotizador",
    excerpt:
      "Arquitectura con memoria de sesión, soporte multilenguaje y cotizador integrado (n8n + APIs).",
    body_markdown:
      "## Introducción\nFlujos, manejo de estado, colas y validaciones para un bot robusto.",
    published_at: "2025-08-10",
    author: "Equipo",
    tags: "whatsapp, bots, español, pricing",
    category: "Messaging",
    language: "es",
  },
  {
    id: "p3",
    slug: "content-repurposer-buffer-notion",
    title: "Content Repurposer: Blog → LinkedIn, X, Reels (n8n + Buffer)",
    excerpt:
      "Pipeline para convertir artículos en hilos y clips; colas de publicación y guardrails.",
    body_markdown:
      "### Pipeline\n1) Parse MD → blocks\n2) Templates por canal\n3) Programación (Buffer)\n4) QA automático",
    published_at: "2025-08-05",
    author: "Team",
    tags: "content, buffer, notion, automation",
    category: "Content Ops",
    language: "en",
  },
];

/** ---------- Toggle (envs present = live; missing = mock) ---------- */
const HAS_AIRTABLE =
  !!process.env.AIRTABLE_API_KEY &&
  !!process.env.AIRTABLE_BASE_ID &&
  !!process.env.AIRTABLE_TABLE_NAME;

/** ---------- Public API used by pages ---------- */
export async function fetchPosts(): Promise<Post[]> {
  if (!HAS_AIRTABLE) {
    // Mock mode: newest first
    return [...MOCK_POSTS].sort(
      (a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    );
  }

  // Live mode (only if all envs set)
  const { default: Airtable } = await import("airtable");
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY!,
  }).base(process.env.AIRTABLE_BASE_ID!);

  const tableName = process.env.AIRTABLE_TABLE_NAME!;
  const records = await base(tableName)
    .select({ view: process.env.AIRTABLE_VIEW_NAME || "Grid view" })
    .all();

  return records.map((r) => ({
    id: r.id,
    slug: (r.get("Slug") as string) || "",
    title: (r.get("Title") as string) || "",
    excerpt: (r.get("Excerpt") as string) || "",
    body_markdown: (r.get("Body") as string) || "",
    published_at: (r.get("PublishedAt") as string) || "",
    author: (r.get("Author") as string) || "",
    tags: (r.get("Tags") as string) || "",
    category: (r.get("Category") as string) || "General",
    language: ((r.get("Language") as string) || "en") as "en" | "es",
  }));
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  if (!HAS_AIRTABLE) {
    return MOCK_POSTS.find((p) => p.slug === slug) || null;
  }
  const posts = await fetchPosts();
  return posts.find((p) => p.slug === slug) || null;
}