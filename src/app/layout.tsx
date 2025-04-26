// app/layout.tsximport type { Metadata } from "next";
import "./globals.css";
import "./index.css";
import "./App.css";
import { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};
export const metadata: Metadata = {
  title: "Moritz Roessler | Senior Frontend Developer in Freiburg im Breisgau",
  description:
    "Moritz Roessler is a Senior Frontend Developer based in Freiburg im Breisgau. Specialized in JavaScript, TypeScript, React, Node.js, SQL, AWS, and Serverless. Explore portfolio, experience, and contact information.",
  authors: [{ name: "Moritz Roessler" }],
  openGraph: {
    type: "website",
    title:
      "Moritz Roessler | Senior Frontend Developer in Freiburg im Breisgau",
    siteName: "Moe's Website",
    description:
      "Moritz Roessler is a Senior Frontend Developer based in Freiburg im Breisgau. Specialized in JavaScript, TypeScript, React, Node.js, SQL, AWS, and Serverless. Explore portfolio, experience, and contact information.",
    images: ["https://javascript.moe/images/previews/hello.png"],
    url: "https://javascript.moe/",
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
    canonical: "https://javascript.moe/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload LCP Images */}
        <link rel="preload" as="image" href="/images/profile2.webp" />
        <link
          rel="preload"
          as="image"
          href="/images/wallpaper/20.webp"
          fetchPriority="high"
        />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Moritz Roessler",
              url: "https://javascript.moe/",
              image: "https://javascript.moe/images/profile2.webp",
              jobTitle: "Senior Frontend Developer",
              worksFor: { "@type": "Organization", name: "Freelance" },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Freiburg im Breisgau",
                addressCountry: "Germany",
              },
              sameAs: [
                "https://github.com/C5H8NNaO4",
                "https://www.linkedin.com/in/moritz-roessler-666b18175/",
              ],
            }),
          }}
        />
      </head>
      <body style={{ margin: 0, overflowX: "hidden" }}>
        <div id="root">
          {children}
          <noscript>
            <div
              style={{
                position: "absolute",
                top: 0,
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                textShadow: "1px 1px 1px #333333",
              }}
            >
              <h1>This site uses CSR and requires JavaScript to run.</h1>
              <h2>Enjoy this black and white picture.</h2>
            </div>
          </noscript>
        </div>
      </body>
    </html>
  );
}
