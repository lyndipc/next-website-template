"use client";

import "./globals.css";
import { getAssets } from "@/lib/utils/assets";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get CDN URLs for all assets
  const assets = getAssets();

  return (
    <html lang="en">
      <head>
        {/* Favicons with CDN URLs */}
        <link
          rel="icon"
          type="image/png"
          href={assets.favicon96}
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href={assets.faviconSvg} />
        <link rel="shortcut icon" href={assets.faviconIco} />
        <link rel="apple-touch-icon" sizes="180x180" href={assets.appleIcon} />
        <link rel="manifest" href={assets.manifest} />

        {/* Meta tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#83eccd" />
        <meta name="msapplication-TileColor" content="#000000" />

        {/* Preload critical assets from CDN */}
        <link rel="preload" as="image" href={assets.dbIcon} />

        {/* Analytics */}
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="92caf5b6-2976-4964-9fe0-9bc7c9029aa3"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
