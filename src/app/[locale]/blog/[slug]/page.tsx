import Image from "next/image";
import { marked } from "marked";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import BlogPostStructuredData from "@/components/BlogStructuredData";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { IconButton } from "@/components/Button";
import Link from "next/link";
import { coverImageLink } from "@/lib/links";
import footnote from "marked-footnote";
import { useEffect } from "react";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { Icon } from "@/components/Icon";
import { ViewCounter } from "@/components/ViewCounter";
import { getBlogPost } from "@/lib/api";
// Define the type for the blog post data

const STRAPI_URL = "https://strapi.javascript.moe/api/blog-posts";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

marked.use(footnote());


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const id = slug.split("-").pop(); // Assuming the ID is part of the slug after a dash

  if (!id) {
    throw new Error("Invalid ID");
  }

  const post = await getBlogPost(id, { locale });

  if (!post || post.length === 0 || post instanceof Error) {
    return { title: "Blog Post Not Found" }; // Fallback metadata if post doesn't exist
  }

  return {
    title: `${post.title} | Moritz Roessler | Senior Frontend Developer`,
    description: post.excerpt || "Detailed blog post content here.",
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt || "Detailed blog post content here.",
      images: [post.coverImage?.url || "/images/wallpaper/22.webp"],
      url: `https://javascript.moe/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || "Detailed blog post content here.",
      images: [post.coverImage?.url || "/images/wallpaper/22.webp"],
      site: "@Moritz_Roessler", // Replace with your Twitter handle
    },
  };
}

interface BlogPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

const BlogPage = async ({ params }: BlogPageProps) => {
  const { slug, locale } = await params;
  const id = slug.split("-").pop(); // Assuming the ID is part of the slug after a dash

  if (!id) {
    notFound(); // Return a 404 if the post doesn't exist or another error occurs
  }

  const post = await getBlogPost(id, { locale });

  if (!post) {
    notFound(); // Return a 404 if the post doesn't exist
  }

  const { localizations = [] } = post;

  const availableLocales = [post.locale, ...localizations.map((ele: any) => ele.locale)];

  const htmlContent = marked(post.content || "");

  return (
    <>
      <BlogPostStructuredData post={post} />
      <div className="max-h-screen">
        <Image
          src={
            post.coverImage
              ? coverImageLink({ post })
              : "/images/wallpaper/22.webp"
          }
          className="w-screen h-screen absolute"
          width={1024}
          height={768}
          alt={post.title || "Blog Post Cover Image"}
        />
        <div className="block w-full justify-center h-screen overflow-y-auto p-1 md:p-4 mx-auto">
          <main className="bg-black/40 w-full mx-auto p-1 md:p-4 flex flex-col gap-1 max-w-6xl  ">
            <div className="flex gap-1 items-center">
              <Link href={`/${locale}/blog`}>
                <IconButton icon="FaHome" />
              </Link>
              <LanguageSwitcher availableLocales={availableLocales} />
              <ViewCounter post={post} className="!ml-auto" increment />
            </div>
            <h1 className=" p-4 pl-2 bg-black/40 w-fit rounded-sm title">
              {post.title}
            </h1>

            <article key={post.id} className="bg-black/30 p-2 post">
              <p dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </article>
          </main>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
