import { getBlogConfig, getBlogPosts } from "@/lib/api";
import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

const SITE_URL = "https://javascript.moe/en/blog";

export async function GET(req: NextRequest, { params }: any) {
  const { locale } = await params;
  const config = await getBlogConfig({ locale });
  const { data: posts } = await getBlogPosts({ locale });

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
        <link>${SITE_URL}</link>
        <description>${config.description}</description>
        <image>
          <url>${config.coverImage?.url}</url>
          <title>Mo’s Blog</title>
          <link>https://javascript.moe/en/blog</link>
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
