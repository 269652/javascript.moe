import BlogPage from "@/components/pages/BlogPage";
import { getBlogPosts } from "@/lib/api";
import { blogMetadata } from "@/lib/metadata";
import { Metadata } from "next";

// Dynamic Metadata Generation for the Blog Page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { data: posts } = await getBlogPosts({ locale });

  return {
    robots: {
      index: true,
      follow: true,
    },
    ...blogMetadata({ locale, posts }),
  };
}

export default BlogPage;
