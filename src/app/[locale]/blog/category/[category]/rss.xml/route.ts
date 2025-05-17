import { getBlogConfig, getBlogPosts, getCategory } from "@/lib/api";
import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

const SITE_URL = "https://javascript.moe/en/blog";

export async function GET(req: NextRequest, { params }: any) {
  const { locale, category: categorySlug } = await params;
  const config = await getBlogConfig({ locale });
  const category = await getCategory(categorySlug, { locale });
  const { data: posts } = await getBlogPosts({
    locale,
    categorySlug,
  });

  const items = posts
    .map((post: any) => {
      const slug = post.slug;
      const pubDate = format(
        new Date(post.publishedAt),
        "EEE, dd MMM yyyy HH:mm:ss xx"
      );
      const excerpt = post.excerpt || post.content?.slice(0, 300) || "";

      return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${SITE_URL}/posts/${slug}</link>
        <guid>${SITE_URL}/posts/${slug}</guid>
        <pubDate>${pubDate}</pubDate>
        <description><![CDATA[${excerpt}]]></description>
      </item>
    `;
    })
    .join("");

  const rss = `
    <?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${category.name} | ${config.title}</title>
        <link>${SITE_URL}/category/${category.slug}</link>
        <description>${
          category?.description || config.description
        }</description>
        ${items}
      </channel>
    </rss>
  `.trim();

  return new NextResponse(rss, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8", // ✅ This fixes it
    },
  });
}
