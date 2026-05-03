import type { ImageLoaderProps } from "next/image";

// TODO: real images aren't in the codebase yet. When you add <Image /> usages
// pointing at Cloudinary public IDs (or absolute Cloudinary URLs), set
// NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME at build time and this loader takes over.
// Without the env var, this loader is not wired into next.config (default
// optimizer is used).
const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export default function cloudinaryLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  if (!CLOUD) return src;

  // Pass-through for absolute URLs that don't point at Cloudinary
  if (/^https?:\/\//.test(src) && !src.includes("res.cloudinary.com")) {
    return src;
  }

  const params = [
    "f_auto", // auto WebP/AVIF
    "c_limit", // never upscale
    `w_${width}`,
    `q_${quality ?? "auto"}`,
  ].join(",");

  // Strip absolute Cloudinary prefix if caller passed a full URL
  const publicId = src
    .replace(`https://res.cloudinary.com/${CLOUD}/image/upload/`, "")
    .replace(/^\//, "");

  return `https://res.cloudinary.com/${CLOUD}/image/upload/${params}/${publicId}`;
}
