import { BlogPost } from "@/types/BlogPost";

export function blogMetadata({
  posts,
  locale,
}: {
  posts: BlogPost[];
  locale: string;
}) {
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
      url: "https://javascript.moe/en/blog",
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Blog | Moritz Roessler | Senior Frontend Developer in Freiburg im Breisgau",
      description: posts.length
        ? "Explore the latest blog posts by Moritz Roessler on JavaScript, React, and more."
        : "No blog posts available.",
      images: ["https://javascript.moe/images/blog-preview.png"],
      site: "@Moritz_Roessler", // Replace with your Twitter handle
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
      canonical: "https://javascript.moe/en/blog",
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
      url: "https://javascript.moe/de/blog",
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Blog | Moritz Roessler | Senior Frontend Entwickler in Freiburg im Breisgau",
      description: posts.length
        ? "Entdecke die neuesten Blogbeiträge von Moritz Roessler zu JavaScript, React und mehr."
        : "Keine Blogbeiträge verfügbar.",
      images: ["https://javascript.moe/images/blog-preview.png"],
      site: "@Moritz_Roessler", // Replace with your Twitter handle
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
      canonical: "https://javascript.moe/de/blog",
    },
  };

  return locale === "de" ? deMetadata : enMetadata;
}
