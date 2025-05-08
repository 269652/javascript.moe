import { BlogCategory } from "@/types/BlogCategory";
import { BlogPost } from "@/types/BlogPost";

export type BlogPostLinksParams = {
  // The locale obtained by useLocale()
  locale: string;
  // The blog post object from getBlogPost();
  post: BlogPost;
};

export type BlogCategoryLinksParams = {
  // The locale obtained by useLocale()
  locale: string;
  // The blog category object from getCategories();
  category: BlogCategory;
};

export const l =
  (locale: string) =>
  (strings: TemplateStringsArray, ...vals: string[]) => {
    return vals.reduce((acc, cur, i) => strings[i] + cur, locale);
  };

export const blogPostLink = ({ locale, post }: BlogPostLinksParams) => {
  return `/${locale}/blog/${post.slug}-${post.documentId}`;
};

export const coverImageLink = ({ post }: { post: BlogPost }) => {
  const relativeOrAbsoluteUrl = post.coverImage.url;
  return relativeOrAbsoluteUrl?.startsWith("http")
    ? relativeOrAbsoluteUrl
    : `${process.env.STRAPI_BASE}${relativeOrAbsoluteUrl}`;
};

export const blogCategoryLink = ({
  locale,
  category,
}: BlogCategoryLinksParams) => {
  return `/${locale}/blog/category/${category.slug}`;
};

export const blogLink = ({ locale }: { locale: string }) => {
  return `/${locale}/blog`;
};
