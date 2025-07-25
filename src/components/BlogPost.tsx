import { BlogPostProps } from "@/types/BlogPost";
import { ViewCounter } from "./ViewCounter";
import LanguageSwitcher from "./LanguageSwitcher";
import { marked } from "marked";
import { blogPostLink, coverImageLink } from "@/lib/links";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { Suspense } from "react";
import { Video } from "./Video";

export const BlogPost = ({
  post,
  locale,
  categorySlug,
  labelsSlug,
  ui,
}: {
  post: BlogPostProps;
  locale: string;
  categorySlug: string;
  labelsSlug: string;
  ui: number;
}) => {
  const htmlExcerpt = marked(post.excerpt);
  const availableLocales = post.localizations?.map((p: any) => p.locale);
  const hasVideo = post.coverVideo?.mime?.includes("video");

  const vid = (
    <Video
      src={coverImageLink(post.coverVideo?.url)}
      inline
      className="hidden group-hover:block"
    />
  );
  const image = (
    <Image
      src={coverImageLink(post.coverImage?.url)}
      alt={post.title}
      width={400}
      height={250}
      className={clsx("object-cover h-full w-full", {
        "group-hover:hidden": hasVideo,
      })}
    />
  );

  if (!availableLocales.includes(locale)) availableLocales.unshift(locale);
  return (
    <article
      key={post.id}
      className="flex flex-col md:flex-row bg-black/50 rounded- md first:rounded-tr-none overflow-hidden  backdrop-blur-[12px]"
    >
      <div className="relative w-full md:w-1/3 justify-between group">
        <Link href={blogPostLink({ locale, post, searchParams: { ui } })}>
          {image}
          {hasVideo && vid}
          <h2 className="absolute inset-x-0 top-0 bg-black/50 text-center p-2 text-lg font-semibold">
            {post.title}
          </h2>
        </Link>
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div dangerouslySetInnerHTML={{ __html: htmlExcerpt }} />
        <div className="flex gap-2 mt-4 flex-wrap items-end h-fit">
          {post.category && (
            <Link
              href={`/blog/category/${post.category.slug}`}
              className={clsx(
                "bg-yellow-400 p-1 px-2 rounded-full text-sm text-white border-transparent border-2",
                {
                  "border-white hover:border-white cursor-default":
                    post.category.slug === categorySlug,
                  "hover:border-white/80": post.category.slug !== categorySlug,
                }
              )}
            >
              {post.category.name}
            </Link>
          )}
          {post.tags
            ?.sort((a, b) => a.name.localeCompare(b.name))
            .map((label: any) => (
              <Link
                key={label.id}
                href={`/blog/labels/${label.slug}`}
                className={clsx(
                  "bg-sky-600 p-1 px-2 rounded-full text-sm text-white border-transparent  border-2",
                  {
                    "border-white hover:border-white cursor-default":
                      labelsSlug.includes(label.slug),
                    "hover:border-white/80": !labelsSlug.includes(label.slug),
                  }
                )}
              >
                {label.name}
              </Link>
            ))}
          <div className="ml-auto flex items-center">
            <Suspense>
              <LanguageSwitcher
                key={post.id}
                showCurrent
                availableLocales={availableLocales}
                href={blogPostLink({ locale, post, searchParams: { ui } })}
              />
            </Suspense>
            <ViewCounter post={post} />
          </div>
        </div>
      </div>
    </article>
  );
};
