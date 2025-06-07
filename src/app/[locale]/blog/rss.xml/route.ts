import { getBlogConfig, getBlogPosts } from "@/lib/api";
import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

const SITE_URL = "https://javascript.moe";

export async function GET(req: NextRequest, { params }: any) {
  const { locale } = await params;
  const config = await getBlogConfig({ locale });
  const { data: posts } = await getBlogPosts({ locale, page: 1 });

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
        <link>${SITE_URL}/${post.locale}/blog/${slug}-${post.documentId}</link>
        <guid>${SITE_URL}/${post.locale}/blog/${slug}-${post.documentId}</guid>
        <pubDate>${pubDate}</pubDate>
        <description><![CDATA[<img src="${post.coverImage?.url}" alt="Cover Image" />${excerpt}]]></description>
      </item>
    `;
    })
    .join("");

  const rss = `
    <?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${config.title}</title>
        <link>${SITE_URL}/${locale}</link>
        <description>${config.description}</description>
        <image>
          <url>${config.coverImage?.url}</url>
          <title>Mo’s Blog</title>
          <link>${SITE_URL}/${locale}/blog</link>
        </image>
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
