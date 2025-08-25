// app/blog/page.tsx
import BlogHub from "@/components/BlogHub";
import { fetchPosts } from "@/lib/posts";

export default async function Page() {
  const raw = await fetchPosts();

  // Ensure tags is always an array
  const posts = raw.map((p) => ({
    ...p,
    tags: Array.isArray(p.tags) ? p.tags : p.tags ? [p.tags] : [],
  }));

  return <BlogHub posts={posts} />;
}