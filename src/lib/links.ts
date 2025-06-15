import { BlogCategory } from "@/types/BlogCategory";
import { BlogPostProps } from "@/types/BlogPost";
import { Label } from "@/types/Label";

export type BlogPostLinksParams = {
  // The locale obtained by useLocale()
  locale: string;
  // The blog post object from getBlogPost();
  post: BlogPostProps;
  searchParams: any;
};

export type BlogCategoryLinksParams = {
  // The locale obtained by useLocale()
  locale: string;
  // The blog category object from getCategories();
  category: BlogCategory;
  searchParams: any;
};

export const l =
  (locale: string) =>
  (strings: TemplateStringsArray, ...vals: string[]) => {
    return vals.reduce((acc, cur, i) => strings[i] + cur, locale);
  };

export const blogPostLink = ({
  locale,
  post,
  searchParams,
}: BlogPostLinksParams) => {
  const isEmpty = Object.keys(searchParams).length === 0;
  return (
    `/${locale}/blog/${post.slug}-${post.documentId}` +
    (!isEmpty ? "?" : "") +
    new URLSearchParams(searchParams).toString()
  );
};

export const coverImageLink = (url: string) => {
  const relativeOrAbsoluteUrl = url;
  if (!url || url.includes("s3.eu")) return "/images/wallpaper/19.webp";
  return relativeOrAbsoluteUrl?.startsWith("http")
    ? relativeOrAbsoluteUrl
    : `${process.env.STRAPI_BASE}${relativeOrAbsoluteUrl}`;
};

export const blogCategoryLink = ({
  locale,
  category,
  searchParams: oldSearchParams,
}: BlogCategoryLinksParams) => {
  const searchParams = { ...oldSearchParams };

  if (searchParams.ui == "0") delete searchParams.ui;
  if (searchParams.p == "1") delete searchParams.p;

  const isEmpty = Object.keys(searchParams).length === 0;

  return (
    `/${locale}/blog/category/${category.slug}` +
    (!isEmpty ? "?" : "") +
    new URLSearchParams(searchParams).toString()
  );
};

export const blogLabelsLink = ({
  locale,
  labels,
  searchParams: oldSearchParams,
}: any) => {
  const searchParams = { ...oldSearchParams };

  if (searchParams.c === "OR") delete searchParams.c;
  if (searchParams.ui == "0") delete searchParams.ui;
  if (searchParams.p == "1") delete searchParams.p;

  const isEmpty = Object.keys(searchParams).length === 0;
  return (
    `/${locale}/blog/labels/${labels.sort().join(",")}` +
    (!isEmpty ? "?" : "") +
    new URLSearchParams(searchParams).toString()
  );
};

export const dynamicLink = ({
  locale,
  params,
  searchParams: oldSearchParams,
}: any) => {
  const searchParams = { ...oldSearchParams };
  if (searchParams.c === "OR") delete searchParams.c;
  if (searchParams.ui == "0") delete searchParams.ui;
  if (params.category) {
    return blogCategoryLink({
      locale,
      category: { slug: params.category } as any,
      searchParams,
    });
  } else if (params.labels) {
    return blogLabelsLink({
      locale,
      labels: decodeURIComponent(params.labels).split(","),
      searchParams,
    });
  } else {
    return blogLink({ locale, searchParams });
  }
};

export const blogLink = ({
  locale,
  searchParams: oldSearchParams,
}: {
  locale: string;
  searchParams: any;
}) => {
  const searchParams = { ...oldSearchParams };
  if (searchParams.p == "1") delete searchParams.p;

  const isEmpty = Object.keys(searchParams).length === 0;

  return (
    `/${locale}/blog` +
    (!isEmpty ? "?" : "") +
    new URLSearchParams(searchParams).toString()
  );
};
