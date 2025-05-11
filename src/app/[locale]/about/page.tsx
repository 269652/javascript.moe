import { StickySection } from "@/components/AnimatedSection";
import { AboutSection } from "@/sections/AboutSection";
import { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const enMetadata: Metadata = {
    title: "About Moritz Roessler | Senior Fullstack Developer",
    description:
      "Hi, I'm Moritz – or Mo for short. I'm a Senior Software Engineer with 12+ years of experience in full-stack and web development, focused on TypeScript, JavaScript, React, and GraphQL. I build complex apps with clean architecture and maintainable code.",
    authors: [{ name: "Moritz Roessler" }],
    openGraph: {
      type: "website",
      title: "About Moritz Roessler | Senior Fullstack Developer",
      siteName: "Moe's Website",
      description:
        "Senior Fullstack Developer with 12+ years of experience in TypeScript, JavaScript, React, and GraphQL. Available for remote or on-site work in Freiburg.",
      images: ["https://javascript.moe/images/previews/about.png"],
      url: "https://javascript.moe/en/about",
    },
    twitter: {
      card: "summary_large_image",
      title: "About Moritz Roessler | Senior Fullstack Developer",
      description:
        "Senior Fullstack Developer with 12+ years of experience in TypeScript, JavaScript, React, and GraphQL. Available for remote or on-site work in Freiburg.",
      images: ["https://javascript.moe/images/previews/about.png"],
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
      "content-language": "en",
      canonical: "https://javascript.moe/en/about",
    },
  };

  const deMetadata: Metadata = {
    title: "Über Moritz Roessler | Senior Fullstack Entwickler",
    description:
      "Hi, ich bin Moritz – oder einfach Mo. Als Senior Softwareentwickler mit über 12 Jahren Erfahrung in der Web- und Full-Stack-Entwicklung liegt mein Fokus auf sauberem, wartbarem Code mit klarer Architektur. Spezialisiert auf TypeScript, JavaScript, React und GraphQL.",
    authors: [{ name: "Moritz Roessler" }],
    openGraph: {
      type: "website",
      title: "Über Moritz Roessler | Senior Fullstack Entwickler",
      siteName: "Moe's Website",
      description:
        "Senior Fullstack Entwickler mit über 12 Jahren Erfahrung in TypeScript, JavaScript, React und GraphQL. Verfügbar für Projekte in Freiburg oder Remote.",
      images: ["https://javascript.moe/images/previews/about.png"],
      url: "https://javascript.moe/de/about",
    },
    twitter: {
      card: "summary_large_image",
      title: "Über Moritz Roessler | Senior Fullstack Entwickler",
      description:
        "Senior Fullstack Entwickler mit über 12 Jahren Erfahrung in TypeScript, JavaScript, React und GraphQL. Verfügbar für Projekte in Freiburg oder Remote.",
      images: ["https://javascript.moe/images/previews/about.png"],
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
      "content-language": "de",
      canonical: "https://javascript.moe/de/about",
    },
  };

  return locale === "de" ? deMetadata : enMetadata;
}

export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <StickySection height="150lvh">
      <AboutSection text={"About"} locale={locale} />
    </StickySection>
  );
}
