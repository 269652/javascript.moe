import BlogPage from "@/components/pages/BlogPage";
import { getBlogConfig, getBlogPosts } from "@/lib/api";
import { blogMetadata } from "@/lib/metadata";
import { Locale } from "@/types/Locale";
import { Metadata } from "next";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ c: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const isAndCon = (await searchParams).c === "AND";
  const { data: posts } = await getBlogPosts({
    locale,
    join: isAndCon ? "AND" : "OR",
  });
  const config = await getBlogConfig({ locale });

  return {
    robots: {
      index: false,
      follow: true,
    },
    ...blogMetadata({ locale, posts, config }),
  };
}

export default BlogPage;
