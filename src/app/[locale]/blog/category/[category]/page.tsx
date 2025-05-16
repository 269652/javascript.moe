import BlogPage from "@/components/pages/BlogPage";
import { getBlogPosts, getCategory } from "@/lib/api";
import { blogCategoryMetadata, blogMetadata } from "@/lib/metadata";
import { Locale } from "@/types/Locale";
import { Metadata } from "next";

// Dynamic Metadata Generation for the Blog Page
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale; category: string }>;
  searchParams: Promise<{ c: string }>;
}): Promise<Metadata> {
  const { locale, category: categorySlug } = await params;

  const isAndCon = (await searchParams).c === "AND";
  const { data: posts } = await getBlogPosts({
    locale,
    join: isAndCon ? "AND" : "OR",
  });
  const category = await getCategory(categorySlug, { locale });
  
  return {
    robots: {
      index: false,
      follow: true,
    },
    ...blogCategoryMetadata({ category, locale, posts }),
  };
}

export default BlogPage;
