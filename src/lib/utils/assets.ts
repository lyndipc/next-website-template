import { getAssetUrl } from "@/lib/config/cdn";

export const ASSETS = {
  dbIcon: "db-icon.png",
  favicon: "favicon-32x32.png",
  faviconSvg: "favicon.svg",
  appleIcon: "apple-touch-icon.png",
  favicon96: "favicon-96x96.png",
  faviconIco: "favicon.ico",
  manifest: "site.webmanifest",
} as const;

export const getAssets = () => ({
  dbIcon: getAssetUrl(ASSETS.dbIcon),
  favicon: getAssetUrl(ASSETS.favicon),
  faviconSvg: getAssetUrl(ASSETS.faviconSvg),
  appleIcon: getAssetUrl(ASSETS.appleIcon),
  favicon96: getAssetUrl(ASSETS.favicon96),
  faviconIco: getAssetUrl(ASSETS.faviconIco),
  manifest: getAssetUrl(ASSETS.manifest),
});
