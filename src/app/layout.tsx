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
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-T9WY6FR7C8"
        ></script>
        <script>{gtag}</script>
      </head>
      <body style={{ margin: 0, overflowX: "hidden" }}>
        <div id="root">
          {children}
          <NoScript className="fixed top-0">
            <div
              className="bg-black/40 backdrop-blur-sm"
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
              <h1>This site requires JavaScript in order to work properly.</h1>
            </div>
          </NoScript>
        </div>
      </body>
      <script>{`
          if (typeof window !== "undefined") {
            document.body.classList.add("JS")
          }
        `}</script>
    </html>
  );
}
