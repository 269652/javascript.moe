import Image from "next/image";
import { marked } from "marked";

const STRAPI_URL = "https://strapi.javascript.moe/api/blog-posts";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

async function getBlogPost(id: string, { locale = "en" }: any) {
  try {
    const res = await fetch(
      STRAPI_URL + "/" + id + "?populate=*&locale=" + locale,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
        // cache: "force-cache", // Optional: SSG (default)
        // next: { revalidate: 300 }, // Optional: ISR every hour
      }
    );
console.log ("FETCH RES", STRAPI_URL + "/" + id + "?populate=*&locale=" + locale)
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
  const { slug, locale } = await params;
  const [, id] = slug.split("-");
  const { data: post = {} } = await getBlogPost(id, { locale });
  const htmlContent = marked(post.content || "");
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
      <div className="block w-full justify-center h-screen overflow-y-auto p-1 md:p-4">
        <main className=" bg-black/40 w-full mx-auto p-4 flex flex-col gap-1">
          <h1 className="mb-4 p-4 pl-2 bg-black/40 w-fit rounded-sm title    ">
            {post.title}
          </h1>
          <article key={post.id} className="bg-black/30 p-2 backdrop-blur-sm">
            <p dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </article>
        </main>
      </div>
    </div>
  );
}
