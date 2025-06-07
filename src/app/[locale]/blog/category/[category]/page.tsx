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
  searchParams: Promise<{ c?: string; ui?: string; p?: string }>;
}): Promise<Metadata> {
  const { locale, category: categorySlug } = await params;
  const { c, ui, p = 1 } = await searchParams;

  const isAndCon = c === "AND";
  const isAlternativeUI = ui == "1";

  const { data: posts } = await getBlogPosts({
    locale,
    join: isAndCon ? "AND" : "OR",
    page: Number(p),
  });
  const category = await getCategory(categorySlug, { locale });

  return {
    robots: {
      index: isAlternativeUI ? false : true,
      follow: isAlternativeUI ? false : true,
    },
    ...blogCategoryMetadata({ category, locale, posts }),
  };
}

export default async (props: any) => (
  <BlogPage
    {...props}
    path={`${(await props.params)?.locale}/blog/category/${
      (await props.params)?.category
    }`}
  />
);
