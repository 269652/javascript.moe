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
  searchParams: Promise<{ c?: string; ui?: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const { c, ui } = await searchParams;
  const isAndCon = c === "AND";
  const isAlternativeUI = ui == "1";

  const { data: posts } = await getBlogPosts({
    locale,
    join: isAndCon ? "AND" : "OR",
  });
  const config = await getBlogConfig({ locale });

  return {
    robots: {
      index: isAlternativeUI ? false : true,
      follow: true,
    },
    ...blogMetadata({ locale, posts, config }),
  };
}

export default async (props: any) => (
  <BlogPage {...props} path={`${(await props.params)?.locale}/blog`} />
);
