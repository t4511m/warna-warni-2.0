// Cloudinary loader is opt-in: set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME at build
// time to route every <Image /> through Cloudinary (auto WebP/AVIF). Without
// the env var, Next's default optimizer handles images.
const cloudinary = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: cloudinary
    ? {
        loader: "custom",
        loaderFile: "./lib/cloudinary-loader.ts",
      }
    : undefined,
};

export default nextConfig;
