import { createClient, type SanityClient } from "@sanity/client";

export type NewsPost = {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string; // ISO date
  imageUrl?: string;
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01";
const token = process.env.SANITY_READ_TOKEN; // optional, for drafts/private

let _client: SanityClient | null = null;
function getClient(): SanityClient | null {
  if (!projectId) return null;
  if (_client) return _client;
  _client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: !token,
    token,
    perspective: "published",
  });
  return _client;
}

const NEWS_QUERY = /* groq */ `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...3] {
    "_id": _id,
    "slug": slug.current,
    title,
    "excerpt": coalesce(excerpt, ""),
    "category": coalesce(category, "Journal"),
    "publishedAt": publishedAt,
    "imageUrl": mainImage.asset->url
  }
`;

const FALLBACK_NEWS: NewsPost[] = [
  {
    _id: "fallback-1",
    slug: "videotron-thamrin-go-live",
    title: "New 80m² videotron lights up Thamrin",
    excerpt:
      "Our flagship LED at the Thamrin–Sudirman intersection is live, with 18-second slot rotations day and night.",
    category: "Network",
    publishedAt: "2026-04-22",
  },
  {
    _id: "fallback-2",
    slug: "bali-sunset-road",
    title: "Sunset Road, Bali — three new bridges",
    excerpt:
      "Pedestrian bridge inventory expands across Sunset Road and Sanur with eye-level reach for tourist traffic.",
    category: "Inventory",
    publishedAt: "2026-04-08",
  },
  {
    _id: "fallback-3",
    slug: "audience-measurement",
    title: "Audience measurement, now standard",
    excerpt:
      "Every campaign now ships with verified impressions and traffic data — at no extra cost.",
    category: "Product",
    publishedAt: "2026-03-30",
  },
];

export async function getNews(): Promise<{
  posts: NewsPost[];
  source: "sanity" | "fallback";
}> {
  const client = getClient();
  if (!client) return { posts: FALLBACK_NEWS, source: "fallback" };
  try {
    const posts = await client.fetch<NewsPost[]>(
      NEWS_QUERY,
      {},
      { next: { revalidate: 300 } },
    );
    if (!posts || posts.length === 0) {
      return { posts: FALLBACK_NEWS, source: "fallback" };
    }
    return { posts, source: "sanity" };
  } catch {
    return { posts: FALLBACK_NEWS, source: "fallback" };
  }
}
