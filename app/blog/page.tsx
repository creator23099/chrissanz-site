// app/blog/page.tsx
import { fetchPosts } from "@/lib/posts";
import BlogHub from "@/components/BlogHub";

export const revalidate = 300;

export default async function Page() {
  const posts = await fetchPosts();
  return <BlogHub posts={posts} />;
}