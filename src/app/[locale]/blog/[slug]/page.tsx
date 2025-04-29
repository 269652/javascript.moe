import Image from "next/image";
import { marked } from "marked";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Define the type for the blog post data
interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  coverImage: { url: string };
}

const STRAPI_URL = "https://strapi.javascript.moe/api/blog-posts";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

async function getBlogPost(id: string, { locale = "en" }: { locale?: string }) {
  try {
    const res = await fetch(`${STRAPI_URL}/${id}?populate=*&locale=${locale}`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        "Cache-Control": "max-age=600, stale-while-revalidate=0", // Cache for 10 minutes and revalidate immediately after
      },
      cache: "force-cache",
      next: { revalidate: 120 }, // Revalidate every 2 minutes
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch blog post: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return { data: [] }; // Fallback to empty array if fetching fails
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const id = slug.split("-").pop(); // Assuming the ID is part of the slug after a dash

  if (!id) {
    throw new Error("Invalid ID");
  }

  const { data: post } = await getBlogPost(id, { locale });

  if (!post || post.length === 0) {
    return { title: "Blog Post Not Found" }; // Fallback metadata if post doesn't exist
  }

  return {
    title: `${post.title} | Moritz Roessler | Senior Frontend Developer`,
    description: post.excerpt || "Detailed blog post content here.",
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt || "Detailed blog post content here.",
      images: [post.coverImage?.url || "/images/wallpaper/22.webp"],
      url: `https://javascript.moe/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || "Detailed blog post content here.",
      images: [post.coverImage?.url || "/images/wallpaper/22.webp"],
      site: "@your_twitter_handle", // Replace with your Twitter handle
    },
  };
}

interface BlogPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

const BlogPage = async ({ params }: BlogPageProps) => {
  const { slug, locale } = await params;
  const id = slug.split("-").pop(); // Assuming the ID is part of the slug after a dash

  try {
    if (!id) {
      throw new Error("Invalid ID");
    }

    const { data: post } = await getBlogPost(id, { locale });

    if (!post) {
      notFound(); // Return a 404 if the post doesn't exist
    }

    const htmlContent = marked(post.content || "");

    return (
      <>
        <div className="max-h-screen">
          <Image
            src={post.coverImage?.url || "/images/wallpaper/22.webp"}
            className="w-screen h-screen absolute"
            width={1024}
            height={768}
            alt={post.title || "Blog Post Cover Image"}
          />
          <div className="block w-full justify-center h-screen overflow-y-auto p-1 md:p-4">
            <main className="bg-black/40 w-full mx-auto p-1 md:p-4 flex flex-col gap-1">
              <h1 className="mb-4 p-4 pl-2 bg-black/40 w-fit rounded-sm title">
                {post.title}
              </h1>
              <article key={post.id} className="bg-black/30 p-2 post">
                <p dangerouslySetInnerHTML={{ __html: htmlContent }} />
              </article>
            </main>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error while rendering blog post:", error);
    notFound(); // Return a 404 if the post doesn't exist or another error occurs
  }
};

export default BlogPage;
