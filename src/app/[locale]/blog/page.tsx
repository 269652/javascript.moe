import { StickySection } from "@/components/AnimatedSection";
import { BackgroundImage } from "@/components/BackgroundImage";
import { DualImages } from "@/components/BlendedImage";
import { useWindowWidth } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";

const STRAPI_URL = "https://strapi.javascript.moe/api/blog-posts?populate=*";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

async function getBlogPosts() {
  try {
    const res = await fetch(STRAPI_URL, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      // cache: "force-cache", // Optional: SSG (default)
      // next: { revalidate: 0 }, // Optional: ISR every hour
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

export default async function BlogPage() {
  const { data: posts = [] } = await getBlogPosts();
  return (
    <div className="max-h-screen ">
      <Image
        src={"/images/wallpaper/19.webp"}
        className="w-screen h-screen absolute"
        width={1024}
        height={768}
        // moveX={3}
        // xMotion={[[0, 1], ["75% 00%", "50% 0%"]]}
        // x2Motion={[[0.5, 0.9], ["30% 0%", "48% 0%"]]}
        alt={"Depiction of a forest fragrance"}
      />
      <div className="block w-full justify-center h-screen overflow-y-auto p-4">
        <main className=" bg-black/40 w-full mx-auto p-4 drop-shadow-2xl flex flex-col gap-1">
          <h1 className="mb-4">Blog</h1>
          {posts.length === 0 && <p>No posts found.</p>}
          {posts.map((post: any) => (
            <article key={post.id} className="flex gap-1 bg-black/40 p-2">
              <Image
                src={post.coverImage.url}
                alt={post.title}
                width={320}
                height={320}
                className="h-fit"
                objectFit="cover"
              />
                              <h2 className="absolute top-[80px] w-[320px] text-center p-1 bg-black/30 backdrop-blur-sm">
                  <Link
                    href={`/blog/${post.slug}-${post.documentId}`}
                    className="underline"
                  >
                    {post.title}
                  </Link>
                </h2>
              <div>

                <p>{post.excerpt}</p>
              </div>
            </article>
          ))}
        </main>
      </div>
    </div>
  );
}
