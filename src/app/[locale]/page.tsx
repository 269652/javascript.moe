"use server";

import { StickySection } from "@/components/AnimatedSection";

import "swiper/css";

import { SectionBot, SectionMid, SectionTop } from "@/components/ScrollSwiper";
import { getTranslations } from "next-intl/server";
import BlogPage from "@/components/pages/BlogPage";

import { Bullets } from "@/components/AnimatedText";
import { Icon } from "@/components/Icon";
import TS from "@/assets/ts.svg";
import { BulletsServer } from "@/components/BulletsServer";
import { NoScript } from "@/components/NoScript";

export default async function Home({ params }: any) {
  const { locale } = await params;

  const t = await getTranslations("home");
  // const hash = useHash();
  // const height = useWindowHeight();
  // const [showLove, setShowLove] = useState(hash === "#secret");
  // const locale = useLocale();

  // const [activeIndex, setActiveIndex] = useState(0)

  const iOS_1to12 = /iPad|iPhone|iPod/.test("");
  const h = (n: number) => `${n}${iOS_1to12 ? "vh" : "lvh"}`;

  return (
    <div>
      <StickySection height={h(275)}>
        <SectionTop />
      </StickySection>
      <StickySection height={h(700)} fullScreen>
        <SectionMid locale={locale} />
        <NoScript className="fixed z-10 flex flex-row top-0 left-0 w-screen h-screen justify-center items-center">
          <div className="flex flex-col gap-4 text-center">
            <h2 className="!text-7xl">Software Engineer</h2>
            <div className="flex flex-col gap-2">
              <BulletsServer
                data={[
                  { logo: "TS", text: "TypeScript" },
                  { logo: "React", text: "React" },
                ]}
              />
              <BulletsServer
                data={[
                  {
                    text: "SQL",
                    logo: "SQL",
                    href: "https://www.postgresql.org/",
                  },
                  {
                    text: "AWS",
                    logo: "AWS",
                    href: "https://aws.amazon.com/de/console/",
                  },
                  {
                    text: "Node.js",
                    logo: "Node",
                    href: "https://nodejs.org/en",
                  },
                  {
                    text: "Vue.js",
                    logo: "Vue",
                    href: "https://vuejs.org/",
                  },
                  {
                    text: "Docker",
                    logo: "Docker",
                    href: "https://www.docker.com/",
                  },
                  {
                    text: "Lambda",
                    logo: "Lambda",
                    href: "https://aws.amazon.com/de/lambda/",
                  },
                ]}
              />
            </div>
          </div>
        </NoScript>
      </StickySection>
      <StickySection height={h(400)}>
        <SectionBot />
        <NoScript className="fixed z-10 flex flex-row top-0 left-0 w-screen h-screen justify-center items-center">
          <div className="flex flex-col gap-4 text-center">
            <h2 className="!text-7xl">Contact Me</h2>
            <div className="flex flex-col gap-2">
              <BulletsServer
                data={[
                  {
                    text: "VCF",
                    logo: "User",
                    href: "/Moritz Roessler.vcf",
                    target: "_blank",
                    download: true,
                  },
                  {
                    text: "CV",
                    logo: "PDF",
                    href: "https://justmycv.com/en.pdf",
                  },
                  {
                    text: "LinkedIn",
                    logo: "LI",
                    href: "https://www.linkedin.com/in/moritz-roessler-666b18175/",
                  },
                ]}
              />
              <BulletsServer
                data={[
                  {
                    text: "GitHub",
                    logo: "GitHub",
                    href: "https://github.com/C5H8NNaO4/javascript.moe",
                  },
                  {
                    text: "SO",
                    logo: "SO",

                    href: "https://stackoverflow.com/users/1487756/moritz-roessler",
                  },
                ]}
              />
            </div>
          </div>
        </NoScript>
      </StickySection>
      <StickySection height={h(100)}>
        <BlogPage params={params} searchParams={{}} path={`${locale}/blog`} />
      </StickySection>
      <NoScript className="absolute top-0 left-0 w-screen h-screen">
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
  );
}
