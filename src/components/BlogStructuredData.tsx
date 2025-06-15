import { coverImageLink } from "@/lib/links";

const BlogPostStructuredData = ({ post }: { post: any }) => {
  const fullImageUrl = coverImageLink(post.coverImage?.url);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [fullImageUrl],
    author: {
      "@type": "Person",
      name: "Moritz Roessler",
    },
    publisher: {
      "@type": "Organization",
      name: "Moe's Website",
      logo: {
        "@type": "ImageObject",
        url: "https://javascript.moe/images/logo.png",
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://javascript.moe/blog/${post.slug}-${post.documentId}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default BlogPostStructuredData;
