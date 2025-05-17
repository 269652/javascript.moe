"use server";

import { StickySection } from "@/components/AnimatedSection";
import { ScrollbarTooltip } from "@/components/ScrollbarTooltip";

import { DualImages } from "@/components/BlendedImage";
import { Parallax } from "@/components/Parallax";
import { FlyOut } from "@/components/FlyOut";
import { Container } from "@/components/Container";
import { AnimatedImageCircle } from "@/components/AnimatedImageCircle";
import { MyName } from "@/components/AnimatedText";
import "swiper/css";

import { SectionBot, SectionMid, SectionTop } from "@/components/ScrollSwiper";
import { getTranslations } from "next-intl/server";
import BlogPage from "@/components/pages/BlogPage";

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
    <>
      <StickySection height={h(275)}>
        <SectionTop />
      </StickySection>
      <StickySection height={h(700)} fullScreen>
        <SectionMid locale={locale} />
      </StickySection>
      <StickySection height={h(400)}>
        <SectionBot />
      </StickySection>
      <StickySection height={h(100)}>
        <BlogPage params={params} searchParams={{}} />
      </StickySection>
    </>
  );
}
