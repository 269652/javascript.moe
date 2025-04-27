import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

// STRAPI API URL and Token
const STRAPI_URL = "https://strapi.javascript.moe/api/blog-posts";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

// Function to fetch blog posts from Strapi
async function getBlogPosts({ locale }: any) {
  try {
    const res = await fetch(STRAPI_URL + "?populate=*&locale=" + locale, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      next: { revalidate: 30 }, // Revalidate every 30 seconds
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    return res.json();
  } catch (e) {
    console.error("Fetch error:", e);
    return { data: [] }; // fallback to empty array
  }
}

// Dynamic Metadata Generation for the Blog Page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { data: posts } = await getBlogPosts({ locale });

  const description = posts.length
    ? "Explore the latest blog posts by Moritz Roessler on JavaScript, React, and more."
    : "No blog posts available.";

  return {
    title:
      "Blog | Moritz Roessler | Senior Frontend Developer in Freiburg im Breisgau",
    description,
    openGraph: {
      type: "website",
      title:
        "Blog | Moritz Roessler | Senior Frontend Developer in Freiburg im Breisgau",
      siteName: "Moe's Website",
      description,
      images: ["https://javascript.moe/images/blog-preview.png"],
      url: "https://javascript.moe/blog",
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Blog | Moritz Roessler | Senior Frontend Developer in Freiburg im Breisgau",
      description,
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
}

// Blog Page Component
export default async function BlogPage({ params }: any) {
  const { locale } = await params;
  const { data: posts = [] } = await getBlogPosts({ locale });

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
          <h1 className="mb-4">Blog</h1>
          {posts.length === 0 && <p>No posts found.</p>}
          {posts
            .sort((a: any, b: any) =>
              b.publishedAt.localeCompare(a.publishedAt)
            )
            .map((post: any) => (
              <article
                key={post.id}
                className="flex flex-col md:flex-row gap-1 bg-black/40 p-2"
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
                    <h2 className="absolute top-4 -translate-y-2  w-full text-center p-1 bg-black/40 backdrop-blur-sm">
                      {post.title}
                    </h2>
                  </Link>
                </div>

                <div className="flex-1/2">
                  <p>{post.excerpt}</p>
                </div>
              </article>
            ))}
        </main>
      </div>
    </div>
  );
}
