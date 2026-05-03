import Link from "next/link";
import { getNews, type NewsPost } from "@/lib/sanity";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";

export async function News() {
  const { posts, source } = await getNews();
  const [featured, second, third] = posts;
  if (!featured) return null;

  return (
    <section className="bg-paper text-ink" id="journal">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32 lg:px-12">
        <Reveal>
          <div className="mx-auto max-w-3xl pb-1 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Journal
            </p>
            <h2
              className="mt-4 pb-1 font-semibold tracking-[-0.025em] text-ink"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.75rem)",
                lineHeight: 1.08,
                fontWeight: 700,
              }}
            >
              Latest from{" "}
              <span className="text-muted">the network.</span>
            </h2>
            {source === "fallback" && (
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
                {/* TODO: configure NEXT_PUBLIC_SANITY_PROJECT_ID for real posts */}
                Sample posts — Sanity not yet configured
              </p>
            )}
          </div>
        </Reveal>

        <Stagger
          stagger={0.08}
          className="mt-14 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-3 md:gap-6"
        >
          <StaggerItem className="md:col-span-2 md:row-span-2">
            <NewsCard post={featured} variant="featured" />
          </StaggerItem>
          {second && (
            <StaggerItem>
              <NewsCard post={second} variant="small" />
            </StaggerItem>
          )}
          {third && (
            <StaggerItem>
              <NewsCard post={third} variant="small" />
            </StaggerItem>
          )}
        </Stagger>
      </div>
    </section>
  );
}

function NewsCard({
  post,
  variant,
}: {
  post: NewsPost;
  variant: "featured" | "small";
}) {
  const featured = variant === "featured";
  const bg =
    post.imageUrl
      ? `url(${post.imageUrl})`
      : NEWS_GRADIENTS[post._id.charCodeAt(0) % NEWS_GRADIENTS.length];
  return (
    <Link
      href={`#journal/${post.slug}`}
      className="group flex h-full w-full flex-col overflow-hidden rounded-3xl bg-mist shadow-card hover:-translate-y-1 hover:shadow-card-hover"
      style={{
        transition:
          "transform var(--duration-slow) var(--ease-out-quint), box-shadow var(--duration-slow) var(--ease-out-quint)",
      }}
    >
      <div
        className={`relative w-full overflow-hidden ${
          featured ? "aspect-[16/10] md:aspect-[4/3]" : "aspect-[16/9]"
        }`}
      >
        <div
          aria-hidden
          className="absolute inset-0 group-hover:scale-105"
          style={{
            backgroundImage: bg,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition:
              "transform var(--duration-deliberate) var(--ease-out-quint)",
          }}
        />
        <span className="absolute left-5 top-5 rounded-full bg-paper/85 px-3 py-1 text-xs font-medium text-ink backdrop-blur">
          {post.category}
        </span>
      </div>

      <div
        className={`flex flex-1 flex-col overflow-visible p-6 pb-7 md:p-8 md:pb-9 ${
          featured ? "md:p-10 md:pb-11" : ""
        }`}
      >
        <time
          dateTime={post.publishedAt}
          className="text-xs font-medium uppercase tracking-[0.18em] text-muted"
        >
          {formatDate(post.publishedAt)}
        </time>
        <h3
          className={`mt-3 pb-1 font-semibold tracking-tight text-ink ${
            featured
              ? "text-3xl leading-[1.1] md:text-5xl"
              : "text-xl leading-tight md:text-2xl"
          }`}
        >
          {post.title}
        </h3>
        {featured && post.excerpt && (
          <p className="mt-4 max-w-xl pb-1 text-base leading-relaxed text-muted md:text-lg">
            {post.excerpt}
          </p>
        )}
        <div className="mt-auto flex items-center gap-2 pt-6 text-sm font-medium text-ink">
          <span>Read</span>
          <span
            aria-hidden
            className="inline-block group-hover:translate-x-1"
            style={{
              transition:
                "transform var(--duration-fast) var(--ease-out-quint)",
            }}
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

const NEWS_GRADIENTS = [
  "linear-gradient(135deg, #FFE4D9 0%, #FFB897 100%)",
  "linear-gradient(135deg, #E0E7FF 0%, #A5B4FC 100%)",
  "linear-gradient(135deg, #FCE4EC 0%, #F48FB1 100%)",
  "linear-gradient(135deg, #E8F5E9 0%, #A5D6A7 100%)",
  "linear-gradient(135deg, #FFF7E6 0%, #FFD08A 100%)",
];

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
