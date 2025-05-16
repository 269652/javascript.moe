export function BlogOverviewStructuredData({
  posts,
  config = {},
}: {
  posts: any[];
  config: any;
}) {
  if (!posts.length) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: config?.title || "Mo's Blog",
    url: config?.url || "https://javascript.moe/blog",
    description:
      config?.description ||
      "Explore blog posts by Moritz Roessler on JavaScript, React, and more.",
    author: {
      "@type": "Person",
      name: config?.author || "Moritz Roessler",
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      image: post.coverImage?.url.startsWith("http")
        ? post.coverImage.url
        : `${config.imageUrl}${post.coverImage.url}`,
      url: `${config.url}/${post.slug}-${post.documentId}`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt || post.publishedAt,
      author: {
        "@type": "Person",
        name: config?.author || "Moritz Roessler",
      },
      description: post.excerpt || "",
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
