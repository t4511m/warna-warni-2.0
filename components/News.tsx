import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { getNews, type NewsPost } from "@/lib/sanity";

const COLOR_ROTATION = [
  "var(--color-ultramarine)",
  "var(--color-cinnabar)",
  "var(--color-jade)",
  "var(--color-magenta)",
  "var(--color-sand)",
];

export async function News() {
  const { posts, source } = await getNews();
  const [featured, second, third] = posts;
  if (!featured) return null;

  return (
    <section
      style={{ backgroundColor: "var(--color-kapur)" }}
      id="journal"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-8 md:py-32">
        <header className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <span
                className="h-px w-10"
                style={{ backgroundColor: "var(--color-cinnabar)" }}
              />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.28em]"
                style={{ color: "var(--color-cinnabar)" }}
              >
                №08 — Journal
              </span>
            </div>
          </div>
          <div className="md:col-span-8">
            <h2
              className="font-display tracking-[-0.035em]"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                lineHeight: 0.98,
                color: "var(--color-carbon)",
                fontWeight: 300,
                fontVariationSettings: '"opsz" 144, "SOFT" 100',
              }}
            >
              Latest{" "}
              <span
                className="text-cinnabar"
                style={{
                  fontStyle: "italic",
                  fontVariationSettings:
                    '"opsz" 144, "SOFT" 100, "WONK" 1',
                }}
              >
                from the network.
              </span>
            </h2>
            {source === "fallback" && (
              <p
                className="mt-4 font-mono text-[10px] uppercase tracking-[0.24em]"
                style={{ color: "var(--color-graphite)" }}
              >
                Sample posts — Sanity not yet configured
              </p>
            )}
          </div>
        </header>

        <div className="mt-16 grid grid-cols-1 gap-8 md:mt-20 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-7">
            <NewsCard
              post={featured}
              variant="featured"
              color={COLOR_ROTATION[0]}
            />
          </Reveal>
          <div className="flex flex-col gap-8 md:col-span-5 md:gap-10">
            {second && (
              <Reveal delay={0.1}>
                <NewsCard
                  post={second}
                  variant="small"
                  color={COLOR_ROTATION[1]}
                />
              </Reveal>
            )}
            {third && (
              <Reveal delay={0.2}>
                <NewsCard
                  post={third}
                  variant="small"
                  color={COLOR_ROTATION[2]}
                />
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsCard({
  post,
  variant,
  color,
}: {
  post: NewsPost;
  variant: "featured" | "small";
  color: string;
}) {
  const featured = variant === "featured";
  return (
    <Link
      href={`#journal/${post.slug}`}
      data-cursor="grow"
      className="group flex h-full w-full flex-col"
    >
      <div
        className={`relative w-full overflow-hidden ${
          featured ? "aspect-[4/3]" : "aspect-[16/10]"
        }`}
        style={{ backgroundColor: color }}
      >
        {post.imageUrl ? (
          <div
            aria-hidden
            className="absolute inset-0 transition-transform duration-700"
            style={{
              backgroundImage: `url(${post.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ) : (
          <span
            aria-hidden
            className="pointer-events-none absolute right-2 bottom-0 select-none font-display leading-[0.85]"
            style={{
              color: "var(--color-kapur)",
              opacity: 0.18,
              fontSize: featured
                ? "clamp(10rem, 26vw, 22rem)"
                : "clamp(6rem, 14vw, 12rem)",
              fontStyle: "italic",
              fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
              fontWeight: 300,
              letterSpacing: "-0.06em",
            }}
          >
            {post.category[0]?.toUpperCase() ?? "J"}
          </span>
        )}
        <span
          className="absolute left-5 top-5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em]"
          style={{
            backgroundColor: "var(--color-carbon)",
            color: "var(--color-kapur)",
          }}
        >
          {post.category}
        </span>
        <span
          className="absolute right-5 bottom-5 inline-flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          style={{
            backgroundColor: "var(--color-kapur)",
            color: "var(--color-carbon)",
          }}
          aria-hidden
        >
          ↗
        </span>
      </div>

      <div className="mt-6 flex flex-1 flex-col">
        <time
          dateTime={post.publishedAt}
          className="font-mono text-[10px] uppercase tracking-[0.24em]"
          style={{ color: "var(--color-graphite)" }}
        >
          {formatDate(post.publishedAt)}
        </time>
        <h3
          className="mt-3 font-display tracking-[-0.025em]"
          style={{
            color: "var(--color-carbon)",
            fontSize: featured
              ? "clamp(1.75rem, 3vw, 2.75rem)"
              : "clamp(1.35rem, 2vw, 1.75rem)",
            lineHeight: 1.05,
            fontWeight: 400,
            fontVariationSettings: '"opsz" 144, "SOFT" 100',
          }}
        >
          {post.title}
        </h3>
        {featured && post.excerpt && (
          <p
            className="mt-4 max-w-xl text-base leading-relaxed md:text-lg"
            style={{ color: "var(--color-graphite)" }}
          >
            {post.excerpt}
          </p>
        )}
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
