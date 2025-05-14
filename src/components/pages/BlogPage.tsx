import { BlogOverviewStructuredData } from "@/components/BlogOverviewStructuredData";
import { Icon } from "@/components/Icon";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Labels } from "@/container/Labels";
import { getBlogPosts, getCategories, getLabels } from "@/lib/api";
import {
  blogCategoryLink,
  blogLink,
  blogPostLink,
  coverImageLink,
} from "@/lib/links";
import supportedLocales from "@/lib/locales";
import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ViewCounter } from "../ViewCounter";

// Blog Page Component
export default async function BlogPage({ params, searchParams }: any) {
  const {
    locale,
    category: categoryName,
    labels: labelNamesStr = "",
  } = await params;

  const labelNames = decodeURIComponent(labelNamesStr)
    .split(",")
    .filter(Boolean);

  const isAndCon = (await searchParams).c === "AND";

  const { data: posts = [] } = await getBlogPosts({
    locale,
    categoryName,
    labelNames,
    join: isAndCon ? "AND" : "OR",
  });
  const { data: categories = [] } = await getCategories({ locale });
  const { data: labels = [] } = await getLabels({ locale });

  return (
    <>
      <BlogOverviewStructuredData posts={posts} />
      <div className="max-h-screen relative">
        {/* Language Flags */}

        <Image
          src="/images/wallpaper/19.webp"
          className="w-screen h-screen absolute"
          width={1024}
          height={768}
          alt="Depiction of a forest fragrance"
        />
        <div className="block w-full justify-center h-screen overflow-y-auto p-1 md:p-4">
          <main className="bg-black/40 w-full mx-auto p-2 md:p-4 drop-shadow-2xl flex flex-col">
            <div className="flex justify-between">
              <h1 className="mb-4 text-3xl font-bold">Mo's Blog</h1>
              <LanguageSwitcher availableLocales={supportedLocales} />
            </div>

            {/* Labels */}
            <Labels
              labels={labels}
              labelNames={labelNames}
              className="flex md:hidden"
            />

            <div className="flex justify-between h-fit items-end">
              <div className="flex border-b-2 border-gray-500 overflow-x-auto flex-1 mr-auto max-w-fit">
                {categories.map((category: any) => {
                  const active = categoryName === category.slug;
                  const href = active
                    ? blogLink({ locale })
                    : blogCategoryLink({ locale, category });

                  return (
                    <Link
                      key={category.id}
                      href={href}
                      className={`category whitespace-nowrap p-2 px-3 text-sm transition ${
                        active
                          ? "bg-yellow-600 hover:bg-yellow-400"
                          : "bg-gray-700 hover:bg-yellow-500"
                      } text-white`}
                    >
                      {category.name}
                    </Link>
                  );
                })}
              </div>

              <Labels
                labels={labels}
                labelNames={labelNames}
                className="hidden md:flex"
              />
            </div>

            {/* Posts */}
            {posts.length === 0 ? (
              <p className="text-center text-gray-400">No posts found.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {posts
                  .sort((a: any, b: any) =>
                    b.publishedAt.localeCompare(a.publishedAt)
                  )
                  .map((post: any) => {
                    const htmlExcerpt = marked(post.excerpt);
                    const availableLocales = post.localizations?.map(
                      (p: any) => p.locale
                    );

                    if (!availableLocales.includes(locale))
                      availableLocales.unshift(locale);
                    return (
                      <article
                        key={post.id}
                        className="flex flex-col md:flex-row bg-black/50 rounded-md overflow-hidden shadow-lg"
                      >
                        <div className="relative w-full md:w-1/3 justify-between">
                          <Link href={blogPostLink({ locale, post })}>
                            <Image
                              src={coverImageLink({ post })}
                              alt={post.title}
                              width={400}
                              height={250}
                              className="object-cover h-full w-full"
                            />
                            <h2 className="absolute inset-x-0 top-0 bg-black/50 text-center p-2 text-lg font-semibold">
                              {post.title}
                            </h2>
                          </Link>
                        </div>
                        <div className="flex-1 p-4 flex flex-col justify-between">
                          <div
                            dangerouslySetInnerHTML={{ __html: htmlExcerpt }}
                          />
                          <div className="flex gap-2 mt-4 flex-wrap items-center h-fit">
                            {post.category && (
                              <Link
                                href={`/blog/category/${post.category.slug}`}
                                className="bg-yellow-600 p-1 px-2 rounded-full text-sm text-white"
                              >
                                {post.category.name}
                              </Link>
                            )}
                            {post.tags?.map((label: any) => (
                              <Link
                                key={label.id}
                                href={`/blog/labels/${label.slug}`}
                                className="bg-purple-600 p-1 px-2 rounded-full text-sm text-white"
                              >
                                {label.name}
                              </Link>
                            ))}
                            <div className="ml-auto flex items-center">
                              <LanguageSwitcher
                                key={post.id}
                                showCurrent
                                availableLocales={availableLocales}
                                href={blogPostLink({ locale, post })}
                              />
                              <ViewCounter post={post} />
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
