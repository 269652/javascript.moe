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
import { BlogPost } from "../BlogPost";
import { Suspense, useEffect } from "react";
import { IconButton } from "../Button";
import clsx from "clsx";
import Link from "next/link";
import { dynamicLink } from "@/lib/links";
import { Pagination } from "../Pagination";

// Blog Page Component
export default async function BlogPage({ params, searchParams, path }: any) {
  const {
    locale,
    category: categorySlug,
    labels: labelNamesStr = "",
  } = await params;
  const labelNames = decodeURIComponent(labelNamesStr)
    .split(",")
    .filter(Boolean);

  const { c, ui, p } = await searchParams;
  const isAndCon = c === "AND";
  const isFancy = +ui === 1;

  const {
    data: posts = [],
    meta: { pagination },
  } = await getBlogPosts({
    locale,
    categorySlug: categorySlug,
    labelNames,
    join: isAndCon ? "AND" : "OR",
    page: p || 1,
  });

  const config = (await getBlogConfig({ locale })) ?? {};

  const title = config?.title;
  const coverImageUrl = config?.coverImage?.url || "/images/wallpaper/19.webp";
  const isVideo = config.coverVideo?.mime.includes("video");

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

        {isFancy && !(isVideo && !posts?.length) && (
          <Image
            src={coverImageUrl}
            className="w-screen h-screen absolute"
            width={1024}
            height={768}
            alt="Depiction of a tranquil sea"
          />
        )}
        {isFancy && isVideo && !posts?.length && (
          <video
            autoPlay
            loop
            src={config.coverVideo.url}
            className="w-screen h-screen absolute object-cover"
            width={1024}
            height={768}
          />
        )}
        <div
          className={clsx(
            "block w-full justify-center h-screen overflow-y-auto mx-auto ",
            {
              "p-1 md:p-2": isFancy,
            }
          )}
        >
          <main
            className={clsx(
              "bg-black/40 w-full mx-auto flex flex-col max-w-7xl rounded-md shadow-[0_0px_2px_1px_black] ",
              {
                "": isFancy,
              }
            )}
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap-reverse gap-1 justify-between bg-white/10 p-2 rounded-md ">
                <div className="flex gap-1 items-center">
                  <IconButton
                    variant="noborder"
                    icon="FaHome"
                    href={`/${locale}`}
                  />
                  <Link
                    href={dynamicLink({
                      locale,
                      params: await params,
                      searchParams: {
                        ...(await searchParams),
                        ui: !isFancy ? 1 : 0,
                      },
                    })}
                  >
                    <IconButton
                      variant="noborder"
                      icon="FaImage"
                      className={clsx({
                        "text-yellow-400": isFancy,
                      })}
                    />
                  </Link>
                  <h1 className="text-3xl font-bold ml-4">{title}</h1>
                </div>
                <div className="flex gap-1 justify-end flex-1 ">
                  <Suspense>
                    <LanguageSwitcher
                      availableLocales={supportedLocales}
                      searchParams={await searchParams}
                    />
                  </Suspense>
                  <IconButton
                    variant="noborder"
                    iconClsn="min-w-8 "
                    className="min-w-[48px] min-h-[48px]"
                    href={`/${path}/rss.xml`}
                    icon="FaRss"
                  ></IconButton>
                </div>
              </div>
              <Labels
                labels={labels}
                labelNames={labelNames}
                className="flex md:hidden"
                searchParams={await searchParams}
              />
              <div className="flex justify-between h-fit items-end px-4  border-b-2 border-white/40 ">
                <Categories
                  categories={categories}
                  activeSlug={categorySlug}
                  locale={locale}
                  variant={!isFancy ? "light" : "dark"}
                />
                <Labels
                  labels={labels}
                  labelNames={labelNames}
                  className="hidden md:flex"
                  searchParams={await searchParams}
                />
              </div>
            </div>

            {posts.length === 0 ? (
              <div className="my-10 p-2 bg-black/20">
                <p className="text-center text-gray-400">{t("noPostsFound")}</p>
              </div>
            ) : (
              <div
                className={clsx("flex flex-col gap-2 px-4 bg-white/20")}
                key={(await searchParams).p}
              >
                {posts
                  .sort((a: any, b: any) =>
                    b.publishedAt.localeCompare(a.publishedAt)
                  )
                  .map((post: any) => {
                    return (
                      <BlogPost
                        ui={isFancy ? 1 : 0}
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
            <Pagination
              pagination={pagination}
              params={await params}
              searchParams={await searchParams}
            />
          </main>
        </div>
      </div>
    </>
  );
}
