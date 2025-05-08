// app/layout.tsximport type { Metadata } from "next";
import "./globals.css";
import "./index.css";
import "./App.css";
import { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const gtag = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-DK3755CZQN');
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
          src="https://www.googletagmanager.com/gtag/js?id=G-DK3755CZQN"
        ></script>
        <script>{gtag}</script>
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
