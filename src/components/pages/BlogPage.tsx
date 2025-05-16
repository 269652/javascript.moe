import { BlogOverviewStructuredData } from "@/components/BlogOverviewStructuredData";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Labels } from "@/container/Labels";
import {
  getBlogConfig,
  getBlogPosts,
  getCategories,
  getLabels,
} from "@/lib/api";
import supportedLocales from "@/lib/locales";
import Image from "next/image";
import { Categories } from "../../container/Categories";
import { getTranslations, getLocale, setRequestLocale } from "next-intl/server";
import { BlogPost } from "../BlogPost";
import { useLocale } from "next-intl";
import { Suspense } from "react";

// Blog Page Component
export default async function BlogPage({ params, searchParams }: any) {
  const {
    locale,
    category: categorySlug,
    labels: labelNamesStr = "",
  } = await params;
  await setRequestLocale(locale);
  const labelNames = decodeURIComponent(labelNamesStr)
    .split(",")
    .filter(Boolean);

  const isAndCon = (await searchParams).c === "AND";

  const { data: posts = [] } = await getBlogPosts({
    locale,
    categoryName: categorySlug,
    labelNames,
    join: isAndCon ? "AND" : "OR",
  });
  const config = (await getBlogConfig({ locale })) ?? {};

  const title = config?.title;
  const coverImageUrl = config?.coverImage?.url || "/images/wallpaper/19.webp";

  const translations = (await import(`@/assets/translations/${locale}.ts`))
    .default.blog;

  const { data: categories = [] } = await getCategories({ locale });
  const { data: labels = [] } = await getLabels({ locale });

  const t = (key: string) => translations?.[key] || key;

  return (
    <>
      <BlogOverviewStructuredData posts={posts} config={config} />
      <div className="max-h-screen relative">
        {/* Language Flags */}

        <Image
          src={coverImageUrl}
          className="w-screen h-screen absolute"
          width={1024}
          height={768}
          alt="Depiction of a forest fragrance"
        />
        <div className="block w-full justify-center h-screen overflow-y-auto p-1 md:p-4 mx-auto">
          <main className="bg-black/40 w-full mx-auto p-2 md:p-4 drop-shadow-2xl flex flex-col max-w-7xl">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <h1 className="mb-4 text-3xl font-bold">{title}</h1>
                <Suspense>
                  <LanguageSwitcher availableLocales={supportedLocales} />
                </Suspense>
              </div>
              <Labels
                labels={labels}
                labelNames={labelNames}
                className="flex md:hidden"
              />
              <div className="flex justify-between h-fit items-end">
                <Categories
                  categories={categories}
                  activeSlug={categorySlug}
                  locale={locale}
                />
                <Labels
                  labels={labels}
                  labelNames={labelNames}
                  className="hidden md:flex"
                />
              </div>
            </div>

            {posts.length === 0 ? (
              <div className="my-10 p-2 bg-black/20">
                <p className="text-center text-gray-400">{t("noPostsFound")}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {posts
                  .sort((a: any, b: any) =>
                    b.publishedAt.localeCompare(a.publishedAt)
                  )
                  .map((post: any) => {
                    return (
                      <BlogPost
                        key={post.id}
                        post={post}
                        categorySlug={categorySlug}
                        labelsSlug={labelNamesStr}
                        locale={locale}
                      />
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
