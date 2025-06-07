// app/layout.tsximport type { Metadata } from "next";
import "./globals.css";
import "./index.css";
import "./App.css";
import { Metadata, Viewport } from "next";
import { NoScript } from "@/components/NoScript";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const gtag = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-T9WY6FR7C8');
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload LCP Images */}
        <link rel="preload" as="image" href="/images/profile.webp" />
        <link
          rel="preload"
          as="image"
          href="/images/wallpaper/20.webp"
          fetchPriority="high"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Moritz Roessler",
              url: "https://javascript.moe/",
              image: "https://javascript.moe/images/profile.webp",
              jobTitle: "Senior Frontend Developer",
              worksFor: { "@type": "Organization", name: "Digitas" },
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

        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="947e6c6c-bd7b-4007-8007-37f25bc86202"
        ></script>
      </head>
      <body style={{ margin: 0, overflowX: "hidden" }}>
        <div id="root">{children}</div>
      </body>
      <script>{`
          if (typeof window !== "undefined") {
            document.body.classList.add("JS")
          }
        `}</script>
    </html>
  );
}
