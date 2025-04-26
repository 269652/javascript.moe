import { StickySection } from "@/components/AnimatedSection";
import { AboutSection } from "@/sections/AboutSection";
import { Metadata, Viewport } from "next";
import { useTranslations } from "next-intl";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};
export const metadata: Metadata = {
  title:
    "About Moritz Roessler | Senior Frontend Developer in Freiburg im Breisgau",
  description:
    "Moritz Roessler is a Senior Frontend Developer based in Freiburg im Breisgau. Specialized in JavaScript, TypeScript, React, Node.js, SQL, AWS, and Serverless. Explore portfolio, experience, and contact information.",
  authors: [{ name: "Moritz Roessler" }],
  openGraph: {
    type: "website",
    title:
      "About Moritz Roessler | Senior Frontend Developer in Freiburg im Breisgau",
    siteName: "Moe's Website",
    description:
      "Moritz Roessler is a Senior Frontend Developer based in Freiburg im Breisgau. Specialized in JavaScript, TypeScript, React, Node.js, SQL, AWS, and Serverless. Explore portfolio, experience, and contact information.",
    images: ["https://javascript.moe/images/previews/hello.png"],
    url: "https://javascript.moe/about",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Moritz Roessler | Senior Frontend Developer in Freiburg im Breisgau",
    description:
      "Moritz Roessler is a Senior Frontend Developer based in Freiburg im Breisgau. Specialized in JavaScript, TypeScript, React, Node.js, SQL, AWS, and Serverless.",
    images: ["https://javascript.moe/images/previews/hello.png"],
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
    canonical: "https://javascript.moe/about",
  },
};

export default async function About({ params }) {
  const { locale } = await params;
  return (
    <StickySection height="150lvh">
      <AboutSection text={"About"} locale={locale} />
    </StickySection>
  );
}
