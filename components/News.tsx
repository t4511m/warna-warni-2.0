import Link from "next/link";
import { getNews, type NewsPost } from "@/lib/sanity";

export async function News() {
  const { posts, source } = await getNews();
  const [featured, second, third] = posts;
  if (!featured) return null;

  return (
    <section className="bg-paper text-ink" id="journal">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-10 md:py-28 lg:px-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink/60">
              <span className="mr-3 inline-block h-px w-8 align-middle bg-ink/40" />
              Journal
            </p>
            <h2
              className="mt-6 font-display tracking-[-0.02em] text-ink"
              style={{
                fontWeight: 800,
                fontSize: "clamp(2.25rem, 5vw, 4.5rem)",
                lineHeight: 1.02,
              }}
            >
              Latest from
              <br />
              <em className="italic text-accent">the network.</em>
            </h2>
          </div>
          <Link
            href="#journal"
            className="hidden shrink-0 items-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-sm text-ink hover:border-ink hover:bg-ink hover:text-paper md:inline-flex"
            style={{
              transition:
                "background-color var(--duration-base) var(--ease-out-quint), color var(--duration-base) var(--ease-out-quint), border-color var(--duration-base) var(--ease-out-quint)",
            }}
          >
            All posts
            <Arrow />
          </Link>
        </div>

        {source === "fallback" && (
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">
            {/* TODO: configure NEXT_PUBLIC_SANITY_PROJECT_ID to load real posts */}
            Sample posts — Sanity not yet configured.
          </p>
        )}

        <div className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-3 md:grid-rows-2 md:gap-5">
          <NewsCard post={featured} variant="featured" />
          {second && <NewsCard post={second} variant="small" />}
          {third && <NewsCard post={third} variant="small" />}
        </div>
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
  return (
    <Link
      href={`#journal/${post.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-xl bg-steel text-paper ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: post.imageUrl
            ? `url(${post.imageUrl})`
            : "radial-gradient(60% 70% at 70% 20%, rgb(232 50 10 / 0.55), transparent 65%), radial-gradient(50% 60% at 20% 90%, rgb(245 166 35 / 0.25), transparent 60%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgb(10 10 10 / 0.85) 0%, rgb(10 10 10 / 0.4) 50%, transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(245 242 236 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(245 242 236 / 0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div
        className={`relative z-10 flex h-full flex-col justify-end p-6 ${
          featured ? "md:p-10" : ""
        }`}
        style={{ minHeight: featured ? 480 : 240 }}
      >
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-paper/60">
          <span>{post.category}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
        </div>
        <h3
          className={`mt-4 font-display leading-[1.05] tracking-tight text-paper ${
            featured ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl"
          }`}
        >
          {post.title}
        </h3>
        {featured && post.excerpt && (
          <p className="mt-4 max-w-xl text-base text-paper/75">
            {post.excerpt}
          </p>
        )}

        <span
          className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-paper/30 text-paper group-hover:translate-x-1 group-hover:border-accent group-hover:bg-accent"
          style={{
            transition:
              "transform var(--duration-base) var(--ease-out-quint), background-color var(--duration-base) var(--ease-out-quint), border-color var(--duration-base) var(--ease-out-quint)",
          }}
        >
          <Arrow />
        </span>
      </div>
    </Link>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M4 12L12 4M12 4H6M12 4V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
