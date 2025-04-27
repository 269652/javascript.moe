import { StickySection } from "@/components/AnimatedSection";
import { BackgroundImage } from "@/components/BackgroundImage";
import { DualImages } from "@/components/BlendedImage";
import { useWindowWidth } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";

const STRAPI_URL = "https://strapi.javascript.moe/api/blog-posts";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN

async function getBlogPost(id: string) {
  try {
    const res = await fetch(STRAPI_URL + "/" + id + "?populate=*", {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      // cache: "force-cache", // Optional: SSG (default)
      next: { revalidate: 300 }, // Optional: ISR every hour
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

export default async function BlogPage({ params }: any) {
  const { slug } = await params;
  const [, id] = slug.split("-");
  const { data: post = {} } = await getBlogPost(id);
  return (
    <div className="max-h-screen ">
      <Image
        src={post.coverImage.url}
        className="w-screen h-screen absolute"
        width={1024}
        height={768}
        // moveX={3}
        // xMotion={[[0, 1], ["75% 00%", "50% 0%"]]}
        // x2Motion={[[0.5, 0.9], ["30% 0%", "48% 0%"]]}
        alt={"Depiction of a forest fragrance"}
      />
      <div className="block w-full justify-center h-screen overflow-y-auto p-4">
        <main className=" bg-black/40 w-full mx-auto p-4 flex flex-col gap-1">
          <h1 className="mb-4 p-1 bg-black/40 w-fit rounded-sm">
            {post.title}
          </h1>
          <article
            key={post.id}
            className="flex gap-1 bg-black/30 p-2 backdrop-blur-sm"
          >
            <p>{post.content}</p>
          </article>
        </main>
      </div>
    </div>
  );
}
