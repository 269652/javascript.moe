import { BlogPostProps } from "@/types/BlogPost";
import { Category } from "@/types/Category";
import { Locale } from "@/types/Locale";

const translations: Record<
  Locale,
  {
    defaultCategory: string;
    siteName: string;
    role: string;
    blogDescription: (categoryName: string) => string;
    generalBlogDescription: string;
    noPosts: string;
    contentLanguage: string;
  }
> = {
  de: {
    defaultCategory: "Allgemein",
    siteName: "Mo's Blog",
    role: "Senior Frontend Entwickler in Freiburg im Breisgau",
    blogDescription: (name) =>
      `Entdecke die neuesten Blogbeiträge in ${name} von Moritz Roessler zu JavaScript, React und mehr.`,
    generalBlogDescription:
      "Entdecke die neuesten Blogbeiträge von Moritz Roessler zu JavaScript, React und mehr.",
    noPosts: "Keine Blogbeiträge verfügbar.",
    contentLanguage: "de",
  },
  en: {
    defaultCategory: "General",
    siteName: "Moe's Website",
    role: "Senior Frontend Developer in Freiburg im Breisgau",
    blogDescription: (name) =>
      `Explore the latest blog posts in ${name} by Moritz Roessler on JavaScript, React, and more.`,
    generalBlogDescription:
      "Explore the latest blog posts by Moritz Roessler on JavaScript, React, and more.",
    noPosts: "No blog posts available.",
    contentLanguage: "en",
  },
  es: {
    defaultCategory: "General",
    siteName: "El Blog de Mo",
    role: "Desarrollador Frontend Senior en Freiburg im Breisgau",
    blogDescription: (name) =>
      `Explora las últimas publicaciones en ${name} de Moritz Roessler sobre JavaScript, React y más.`,
    generalBlogDescription:
      "Explora las últimas publicaciones de Moritz Roessler sobre JavaScript, React y más.",
    noPosts: "No hay publicaciones disponibles.",
    contentLanguage: "es",
  },
};

const interpolateTitle = (title: string, { author, role, location }: any) => {
  return title
    .replace(/\$author/g, author)
    .replace(/\$role/g, role)
    .replace(/\$location/, location);
};

export function blogMetadata({
  posts,
  locale,
  config,
}: {
  posts: BlogPostProps[];
  locale: Locale;
  config: any;
}) {
  const t = translations[locale];
  const hasPosts = posts.length > 0;
  const author = config.author || "Moritz Roessler";
  const role = config.role || t.role;
  const location = config?.location || "Freiburg im Breisgau";
  const title =
    interpolateTitle(config?.title, { author, role, location }) ||
    `Blog | Moritz Roessler | ${role}`;
  const metaTitle =
    interpolateTitle(config?.metaTitle, { author, role, location }) ||
    `Blog | Moritz Roessler | ${role}`;
  const description = hasPosts
    ? config.description || t.generalBlogDescription
    : t.noPosts;
  const url = config?.url || `https://javascript.moe/${locale}/blog`;
  const image =
    config?.coverImage?.url ||
    "https://javascript.moe/images/wallpaper/19.webp";

  return {
    title: metaTitle,
    description,
    authors: [{ name: author }],
    openGraph: {
      type: "website",
      title: metaTitle,
      siteName: t.siteName,
      description,
      images: [image],
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description,
      images: [image],
      site: "@Moritz_Roessler",
    },
    icons: {
      icon: [
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    other: {
      "msapplication-TileColor": "#da532c",
      "content-language": t.contentLanguage,
      canonical: url,
    },
  };
}

export function blogCategoryMetadata({
  posts,
  category,
  locale,
}: {
  posts: BlogPostProps[];
  category?: Category;
  locale: Locale;
}) {
  const t = translations[locale];
  const hasPosts = posts.length > 0;
  const categoryName = category?.name || t.defaultCategory;
  const description = hasPosts
    ? category?.description || t.blogDescription(categoryName)
    : t.noPosts;

  const url = `https://javascript.moe/${locale}/blog${
    category ? `/category/${category.slug}` : ""
  }`;

  const title = `${categoryName} | Blog | Moritz Roessler | ${t.role}`;
  const image =
    category?.coverImage?.url ||
    "https://javascript.moe/images/wallpaper/19.webp";

  return {
    title,
    description,
    openGraph: {
      type: "website",
      title,
      siteName: t.siteName,
      description,
      images: [image],
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      site: "@Moritz_Roessler",
    },
    icons: {
      icon: [
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    other: {
      "msapplication-TileColor": "#da532c",
      "content-language": t.contentLanguage,
      canonical: url,
    },
  };
}
