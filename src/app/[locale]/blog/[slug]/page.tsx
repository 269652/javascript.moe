import Image from "next/image";
import { marked, Renderer } from "marked";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import BlogPostStructuredData from "@/components/BlogStructuredData";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { IconButton } from "@/components/Button";
import Link from "next/link";
import { coverImageLink } from "@/lib/links";
import footnote from "marked-footnote";
import { Suspense } from "react";
import { ViewCounter } from "@/components/ViewCounter";
import { getBlogPost } from "@/lib/api";
import clsx from "clsx";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import bash from "highlight.js/lib/languages/bash";
import powershell from "highlight.js/lib/languages/powershell";
import { Video } from "@/components/Video";

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("powershell", powershell);

const renderer = new Renderer();

renderer.code = function ({ text, lang = "bash", escaped }) {
  const validLang = lang && hljs.getLanguage(lang);
  const highlighted = validLang
    ? hljs.highlight(text, { language: lang }).value
    : hljs.highlightAuto(text).value;

  return `<pre><code class="hljs language-${
    lang || "plaintext"
  }">${highlighted}</code></pre>`;
};

marked.use({ renderer });
marked.use(footnote());

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; locale: string }>;
  searchParams: Promise<{ c?: string; ui?: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const id = slug.split("-").pop(); // Assuming the ID is part of the slug after a dash

  const { ui } = await searchParams;
  const isAlternativeUI = ui == "1";

  if (!id) {
    throw new Error("Invalid ID");
  }

  const post = await getBlogPost(id, { locale });

  if (!post || post.length === 0 || post instanceof Error) {
    return { title: "Blog Post Not Found" }; // Fallback metadata if post doesn't exist
  }

  return {
    robots: {
      index: isAlternativeUI ? false : true,
    },
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
  searchParams: Promise<{ ui: string }>;
}

const BlogPage = async ({ params, searchParams }: BlogPageProps) => {
  const { slug, locale } = await params;
  const id = slug.split("-").pop(); // Assuming the ID is part of the slug after a dash
  const isFancy = (await searchParams).ui == "1";

  if (!id) {
    notFound(); // Return a 404 if the post doesn't exist or another error occurs
  }

  const post = await getBlogPost(id, { locale });

  if (!post) {
    notFound(); // Return a 404 if the post doesn't exist
  }

  const { localizations = [] } = post;

  const availableLocales = [
    post.locale,
    ...localizations.map((ele: any) => ele.locale),
  ];

  const hasVideo = post.coverVideo?.mime?.includes("video");

  const htmlContent = marked(post.content || "");
  const image = (
    <Image
      src={
        post.coverImage ? coverImageLink({ post }) : "/images/wallpaper/22.webp"
      }
      className={clsx({
        "w-screen h-screen sticky": isFancy,
        "": !isFancy,
      })}
      width={1024}
      height={768}
      alt={post.title || "Blog Post Cover Image"}
    />
  );

  return (
    <>
      <BlogPostStructuredData post={post} />

      <div className="h-screen relative overflow-y-auto flex justify-center items-center">
        {isFancy && !hasVideo && image}
        {isFancy && hasVideo && (
          <Video src={post.coverVideo.url} inline={false} />
        )}
        <div
          className={clsx("block w-fit justify-center z-10 absolute top-0", {
            "p-1 md:p-4": isFancy,
          })}
        >
          <main
            className={clsx(
              "w-full mx-auto flex flex-col gap-1 max-w-[110ch] backdrop-blur-[12px] rounded-md z-10 shadow-[0_0px_2px_1px_black] ",
              {
                "bg-black/40": isFancy,
                // "bg-white/10": !isFancy
                // "p-1 md:p-4": isFancy,
              }
            )}
          >
            <div
              className={clsx("flex gap-1 items-center p-2 rounded-t-md", {
                "bg-white/10": 1,
              })}
            >
              <Link href={`/${locale}/blog${isFancy ? "?ui=1" : ""}`}>
                <IconButton icon="FaHome" variant="noborder" />
              </Link>
              <Link
                href={`/${locale}/blog/${post.slug}-${post.documentId}${
                  !isFancy ? "?ui=1" : ""
                }`}
              >
                <IconButton
                  variant="noborder"
                  icon="FaImage"
                  className={clsx({
                    "text-yellow-300": isFancy,
                  })}
                />
              </Link>
              <Suspense>
                <LanguageSwitcher
                  availableLocales={availableLocales}
                  searchParams={{ ui: isFancy ? 1 : 0 }}
                />
              </Suspense>
              <ViewCounter post={post} className="!ml-auto" increment />
            </div>
            <h1 className="p-4  w-fit title">{post.title}</h1>
            {!isFancy && !hasVideo && image}
            {!isFancy && hasVideo && (
              <Video src={post.coverVideo.url} inline={true} />
            )}
            <article key={post.id} className="bg-black/30 p-2 md:p-4 post ">
              <p
                dangerouslySetInnerHTML={{ __html: htmlContent }}
                className="max-w-[80ch] mx-auto prose prose-invert"
              />
            </article>
          </main>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
