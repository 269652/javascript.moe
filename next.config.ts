// next.config.ts
import createNextIntlPlugin from "next-intl/plugin";
import { NextJsWebpackConfig } from "next/dist/server/config-shared";

const withNextIntl = createNextIntlPlugin(
  // Optional: Custom path to i18n config (default is './src/i18n/request.ts')
  "./src/lib/i18n.ts"
);

const nextConfig = {
  // Your Next.js config options
  webpack(config: any) {
    // Find the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg")
    );

    // Add new rules for SVG handling
    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [/url/] },
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: "preset-default",
                    params: {
                      overrides: {
                        removeViewBox: false, // <--- THIS PRESERVES viewBox
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default withNextIntl(nextConfig);
