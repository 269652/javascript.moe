import { type MetadataRoute } from "next";

const STRAPI_URL =
  "https://strapi.javascript.moe/api/blog-posts?populate=*&[pagination][pageSize]=1000";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

async function fetchBlogPosts() {
  try {
    const opts = {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
    };

    const en = await fetch(STRAPI_URL + "&locale=en", opts);
    const de = await fetch(STRAPI_URL + "&locale=de", opts);
    const es = await fetch(STRAPI_URL + "&locale=es", opts);

    if (!en.ok || !de.ok || !es.ok) {
      throw new Error(`Failed to fetch!`);
    }

    const jsonDE = await de.json();
    const jsonEN = await en.json();
    const jsonES = await es.json();
    
    return (jsonEN.data || [])
      .concat(jsonDE.data || [])
      .concat(jsonES.data || []);
  } catch (error) {
    console.error("Failed fetching blog posts for sitemap:", error);
    return [];
  }
}

export async function GET(): Promise<Response> {
  const staticUrls = [
    {
      loc: "https://javascript.moe/en",
      lastmod: "2025-04-27",
      alternates: [
        { hreflang: "en", href: "https://javascript.moe/en" },
        { hreflang: "de", href: "https://javascript.moe/de" },
      ],
    },
    {
      loc: "https://javascript.moe/de",
      lastmod: "2025-04-27",
      alternates: [
        { hreflang: "en", href: "https://javascript.moe/en" },
        { hreflang: "de", href: "https://javascript.moe/de" },
      ],
    },
    {
      loc: "https://javascript.moe/en/about",
      lastmod: "2025-04-27",
      alternates: [
        { hreflang: "en", href: "https://javascript.moe/en/about" },
        { hreflang: "de", href: "https://javascript.moe/de/about" },
      ],
    },
    {
      loc: "https://javascript.moe/de/about",
      lastmod: "2025-04-27",
      alternates: [
        { hreflang: "en", href: "https://javascript.moe/en/about" },
        { hreflang: "de", href: "https://javascript.moe/de/about" },
      ],
    },
    {
      loc: "https://javascript.moe/en/blog",
      lastmod: "2025-04-27",
      alternates: [
        { hreflang: "en", href: "https://javascript.moe/en/blog" },
        { hreflang: "de", href: "https://javascript.moe/de/blog" },
      ],
    },
    {
      loc: "https://javascript.moe/de/blog",
      lastmod: "2025-04-27",
      alternates: [
        { hreflang: "en", href: "https://javascript.moe/en/blog" },
        { hreflang: "de", href: "https://javascript.moe/de/blog" },
      ],
    },
    {
      loc: "https://javascript.moe/en/inventory",
      lastmod: "2025-04-27",
      alternates: [
        {
          hreflang: "en",
          href: "https://perfumery.javascript.moe/en/inventory",
        },
        {
          hreflang: "de",
          href: "https://perfumery.javascript.moe/de/inventory",
        },
      ],
    },
    {
      loc: "https://javascript.moe/de/inventory",
      lastmod: "2025-04-27",
      alternates: [
        {
          hreflang: "en",
          href: "https://perfumery.javascript.moe/en/inventory",
        },
        {
          hreflang: "de",
          href: "https://perfumery.javascript.moe/de/inventory",
        },
      ],
    },
    {
      loc: "https://javascript.moe/en/formulas",
      lastmod: "2025-04-27",
      alternates: [
        {
          hreflang: "en",
          href: "https://perfumery.javascript.moe/en/formulas",
        },
        {
          hreflang: "de",
          href: "https://perfumery.javascript.moe/de/formulas",
        },
      ],
    },
    {
      loc: "https://javascript.moe/de/formulas",
      lastmod: "2025-04-27",
      alternates: [
        {
          hreflang: "en",
          href: "https://perfumery.javascript.moe/en/formulas",
        },
        {
          hreflang: "de",
          href: "https://perfumery.javascript.moe/de/formulas",
        },
      ],
    },
  ];

  const posts = await fetchBlogPosts();

  const blogPostUrls = posts.flatMap((post: any) => {
    const slug = `${post.slug}-${post.documentId}`;
    const updatedAt = post.updatedAt || new Date().toISOString();
    const localizations = [
      post.locale,
      ...post.localizations.map((loc: any) => loc.locale),
    ];

    return [
      {
        loc: `https://javascript.moe/${post.locale}/blog/${slug}`,
        lastmod: updatedAt,
        alternates: localizations.map((hreflang) => {
          return {
            hreflang,
            href: `https://javascript.moe/${hreflang}/blog/${slug}`,
          };
        }),
      },
    ];
  });

  const allUrls = [...staticUrls, ...blogPostUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
          http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
          xmlns:xhtml="http://www.w3.org/1999/xhtml">
    ${allUrls
      .map((url) => {
        return `
          <url>
            <loc>${url.loc}</loc>
            ${url.alternates
              .map(
                (alt: any) =>
                  `<xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`
              )
              .join("")}
            <lastmod>${new Date(url.lastmod).toISOString()}</lastmod>
          </url>
        `;
      })
      .join("")}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
