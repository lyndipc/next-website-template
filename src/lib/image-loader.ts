export default function customImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // If the image is from CloudFront, return it as-is (no optimization)
  if (src.includes("cloudfront.net")) {
    return src;
  }

  // For local images, use Next.js default optimization
  const params = new URLSearchParams();
  params.set("url", src);
  params.set("w", width.toString());
  if (quality) {
    params.set("q", quality.toString());
  }

  return `/_next/image?${params.toString()}`;
}
