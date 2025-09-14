export const CDN_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_CDN_BASE_URL || "",
  fallbackToLocal: false,
} as const;

/**
 * Get the CDN URL for an asset
 * @param path - Asset path (e.g., 'db-icon.png')
 * @returns CDN URL or throws error if not configured
 */
export function getAssetUrl(path: string): string {
  if (!CDN_CONFIG.baseUrl) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "❌ CDN not configured! Set NEXT_PUBLIC_CDN_BASE_URL environment variable",
      );
      console.error("Current env vars:", {
        NEXT_PUBLIC_CDN_BASE_URL: process.env.NEXT_PUBLIC_CDN_BASE_URL,
        NODE_ENV: process.env.NODE_ENV,
      });
    }

    throw new Error(
      "CDN_BASE_URL not configured. Please set NEXT_PUBLIC_CDN_BASE_URL environment variable.",
    );
  }

  // Ensure path doesn't start with slash for CDN
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  const cdnUrl = `${CDN_CONFIG.baseUrl}/${cleanPath}`;

  if (process.env.NODE_ENV === "development") {
    console.log(`🌐 CDN URL: ${cdnUrl}`);
  }

  return cdnUrl;
}

/**
 * Handle image errors - log only, no fallback
 */
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement, Event>,
): void {
  const img = event.currentTarget;
  console.error(`❌ CDN image failed to load: ${img.src}`);
}

/**
 * Get image URL (alias for getAssetUrl)
 */
export function getImageUrl(src: string): string {
  return getAssetUrl(src);
}

/**
 * Check if CDN is properly configured
 */
export function isCDNConfigured(): boolean {
  return !!CDN_CONFIG.baseUrl;
}

/**
 * Get CDN status for debugging
 */
export function getCDNStatus() {
  return {
    configured: isCDNConfigured(),
    baseUrl: CDN_CONFIG.baseUrl,
    envVar: process.env.NEXT_PUBLIC_CDN_BASE_URL,
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  };
}
