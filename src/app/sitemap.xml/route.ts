import { type MetadataRoute } from "next";

const STRAPI_URL = "https://strapi.javascript.moe/api/blog-posts?populate=*";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

async function fetchBlogPosts() {
  try {
    const res = await fetch(STRAPI_URL, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      // You can tweak caching if needed
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    const json = await res.json();
    return json.data || [];
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
  ];

  const posts = await fetchBlogPosts();

  const blogPostUrls = posts.flatMap((post: any) => {
    const slug = `${post.slug}-${post.documentId}`;
    const updatedAt = post.updatedAt || new Date().toISOString();
    return [
      {
        loc: `https://javascript.moe/en/blog/${slug}`,
        lastmod: updatedAt,
        alternates: [
          { hreflang: "en", href: `https://javascript.moe/en/blog/${slug}` },
          { hreflang: "de", href: `https://javascript.moe/de/blog/${slug}` },
        ],
      },
      {
        loc: `https://javascript.moe/de/blog/${slug}`,
        lastmod: updatedAt,
        alternates: [
          { hreflang: "en", href: `https://javascript.moe/en/blog/${slug}` },
          { hreflang: "de", href: `https://javascript.moe/de/blog/${slug}` },
        ],
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
