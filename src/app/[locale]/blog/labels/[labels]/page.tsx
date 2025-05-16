import BlogPage from "@/components/pages/BlogPage";
import { getBlogPosts } from "@/lib/api";
import { blogMetadata } from "@/lib/metadata";
import { Locale } from "@/types/Locale";
import { Metadata } from "next";

// Dynamic Metadata Generation for the Blog Page
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
  return {
    robots: {
      index: false,
      follow: true,
    },
    ...blogMetadata({ locale, posts }),
  };
}

export default BlogPage;
