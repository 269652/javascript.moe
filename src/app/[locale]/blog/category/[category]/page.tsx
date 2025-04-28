import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getBlogPosts, getCategories, getLabels } from "@/lib/api";

// Dynamic Metadata Generation for the Blog Page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { data: posts } = await getBlogPosts({ locale });

  // Define metadata for different languages
  const enMetadata = {
    title:
      "Blog | Moritz Roessler | Senior Frontend Developer in Freiburg im Breisgau",
    description: posts.length
      ? "Explore the latest blog posts by Moritz Roessler on JavaScript, React, and more."
      : "No blog posts available.",
    openGraph: {
      type: "website",
      title:
        "Blog | Moritz Roessler | Senior Frontend Developer in Freiburg im Breisgau",
      siteName: "Moe's Website",
      description: posts.length
        ? "Explore the latest blog posts by Moritz Roessler on JavaScript, React, and more."
        : "No blog posts available.",
      images: ["https://javascript.moe/images/blog-preview.png"],
      url: "https://javascript.moe/blog",
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Blog | Moritz Roessler | Senior Frontend Developer in Freiburg im Breisgau",
      description: posts.length
        ? "Explore the latest blog posts by Moritz Roessler on JavaScript, React, and more."
        : "No blog posts available.",
      images: ["https://javascript.moe/images/blog-preview.png"],
      site: "@your_twitter_handle", // Replace with your Twitter handle
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
      "content-language": "en",
      canonical: "https://javascript.moe/blog",
    },
  };

  const deMetadata = {
    title:
      "Blog | Moritz Roessler | Senior Frontend Entwickler in Freiburg im Breisgau",
    description: posts.length
      ? "Entdecke die neuesten Blogbeiträge von Moritz Roessler zu JavaScript, React und mehr."
      : "Keine Blogbeiträge verfügbar.",
    openGraph: {
      type: "website",
      title:
        "Blog | Moritz Roessler | Senior Frontend Entwickler in Freiburg im Breisgau",
      siteName: "Moe's Website",
      description: posts.length
        ? "Entdecke die neuesten Blogbeiträge von Moritz Roessler zu JavaScript, React und mehr."
        : "Keine Blogbeiträge verfügbar.",
      images: ["https://javascript.moe/images/blog-preview.png"],
      url: "https://javascript.moe/blog",
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Blog | Moritz Roessler | Senior Frontend Entwickler in Freiburg im Breisgau",
      description: posts.length
        ? "Entdecke die neuesten Blogbeiträge von Moritz Roessler zu JavaScript, React und mehr."
        : "Keine Blogbeiträge verfügbar.",
      images: ["https://javascript.moe/images/blog-preview.png"],
      site: "@your_twitter_handle", // Replace with your Twitter handle
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
      "content-language": "de",
      canonical: "https://javascript.moe/blog",
    },
  };

  // Select metadata based on the locale
  return locale === "de" ? deMetadata : enMetadata;
}

// Blog Page Component
export default async function BlogPage({ params }: any) {
  const {
    locale,
    category: categoryName,
    labels: labelNamesStr = "",
  } = await params;
  const labelNames = decodeURIComponent(labelNamesStr)
    .split(",")
    .filter(Boolean);
  const { data: posts = [] } = await getBlogPosts({
    locale,
    categoryName,
    labelNames,
  });
  const { data: categories = [] } = await getCategories({ locale });
  const { data: labels = [] } = await getLabels({ locale });

  return (
    <div className="max-h-screen">
      <Image
        src={"/images/wallpaper/19.webp"}
        className="w-screen h-screen absolute"
        width={1024}
        height={768}
        alt={"Depiction of a forest fragrance"}
      />
      <div className="block w-full justify-center h-screen overflow-y-auto p-1 md:p-4">
        <main className="bg-black/40 w-full mx-auto p-2 md:p-4 drop-shadow-2xl flex flex-col gap-1">
          <h1 className="mb-4">Mo's Blog</h1>
          <div className="flex gap-1">
            {labels.map((cat: any) => {
              return (
                <Link
                  // key={cat.id}
                  href={
                    labelNames[0] === cat.slug
                      ? "/blog"
                      : labelNames.includes(cat.slug)
                      ? `/blog/labels/${decodeURIComponent(
                          labelNamesStr
                        ).replace(new RegExp(`,?${cat.slug}`, "g"), "")}`
                      : `/blog/labels/${labelNames.join(",")}${
                          labelNames?.length ? "," : ""
                        }${cat.slug}`
                  }
                  className={`my-1 p-1 px-2 rounded-full ${
                    labelNamesStr.includes(cat.slug)
                      ? "bg-purple-600/90 hover:bg-purple-600/30"
                      : "bg-gray-600/90 hover:bg-purple-600/60"
                  } text-white`}
                >
                  {cat.displayName}
                </Link>
              );
            })}
          </div>
          <div className="flex border-b-[2px] border-black gap-4">
            <div className="border-white border-[1.4px] border-b-0 flex mt-1">
              {categories.map((cat: any) => {
                return (
                  <Link
                    // key={cat.id}
                    href={
                      categoryName === cat.slug.toString()
                        ? "/blog"
                        : `/blog/category/${cat.slug}`
                    }
                    className={`category p-1 px-2 ${
                      categoryName === cat.slug.toString()
                        ? "bg-yellow-500 hover:bg-yellow-600/30"
                        : "bg-white-500/90 hover:bg-yellow-600/60"
                    } text-white`}
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {posts.length === 0 && <p>No posts found.</p>}
          {posts
            .sort((a: any, b: any) =>
              b.publishedAt.localeCompare(a.publishedAt)
            )
            .map((post: any) => (
              <article
                key={post.id}
                className="flex flex-col md:flex-row gap-1 bg-black/40 p-2 teaser"
              >
                <div className="relative">
                  <Link
                    href={`/blog/${post.slug}-${post.documentId}`}
                    className="underline"
                  >
                    <Image
                      src={post.coverImage.url}
                      alt={post.title}
                      width={320}
                      height={320}
                      className=""
                      objectFit="cover"
                    />
                    <h2 className="absolute top-4 -translate-y-2  w-full text-center p-1 bg-black/40 backdrop-blur-sm font-light">
                      {post.title}
                    </h2>
                  </Link>
                </div>
                <div className="flex-1/2 flex flex-col justify-between">
                  <div className="flex-1/2">
                    <p>{post.excerpt}</p>
                  </div>
                  <div className="flex gap-2">
                    {post.category && (
                      <div className="p-1 px-2 rounded-full bg-yellow-600/90 text-white w-min">
                        {post.category?.name}
                      </div>
                    )}
                    {post.tags && (
                      <div className="flex gap-1">
                        {post.tags.map((label: any) => (
                          <div className="p-1 px-2 rounded-full bg-purple-600/90 text-white w-min">
                            {label?.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
        </main>
      </div>
    </div>
  );
}

export const revalidate = 30; // seconds
