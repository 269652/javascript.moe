"use client";

import { StickySection } from "@/components/AnimatedSection";
import { ScrollbarTooltip } from "@/components/ScrollbarTooltip";
import TS from "@/assets/ts.svg";
import PDF from "@/assets/pdf.svg";
import ReactLogo from "@/assets/react.svg";
import LI from "@/assets/li.svg";
import GH from "@/assets/github.svg";
import StackOverflowLogo from "@/assets/stackoverflow.svg";
import AWSLogo from "@/assets/aws.svg";
import SQLLogo from "@/assets/sql.svg";
import NodeJSLogo from "@/assets/node.svg";
import VueJSLogo from "@/assets/vue.svg";
import DockerLogo from "@/assets/docker.svg";
import LambdaLogo from "@/assets/lambda.svg";
import { DualImages } from "@/components/BlendedImage";
import { Parallax } from "@/components/Parallax";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useHash, useWindowHeight } from "@/lib/hooks";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { FlyOut } from "@/components/FlyOut";
import { Container } from "@/components/Container";
import { AnimatedImageCircle } from "@/components/AnimatedImageCircle";
import { AppearingText, Bullets, MyName } from "@/components/AnimatedText";
import { Icon } from "@/components/Icon";
import "swiper/css";
import clsx from "clsx";
import Image from "next/image";

import { SproutingHearts } from "@/components/Sprout";
import { HeartButton } from "@/components/HeartButton";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  const index = useTransform(scrollYProgress, [0, 1], [1, 2]);

  const t = useTranslations("home");
  const hash = useHash();
  const height = useWindowHeight();
  const initialSlide = hash === "#secret" ? 0 : 1;
  const [showLove, setShowLove] = useState(hash === "#secret");
  const [activeIndex, setActiveIndex] = useState(initialSlide);
  const locale = useLocale();

  useEffect(() => {
    swiper?.on("activeIndexChange", (j) => {
      if (j.activeIndex === 0) {
        window.location.hash = "#secret";
      } else if (j.activeIndex === 1) {
        window.history.replaceState(
          null,
          "",
          window.location.toString().replace(/#.+$/g, "")
        );
      }
      setTimeout(() => {
        setActiveIndex(j.activeIndex);
      }, 0);
    });
  }, [swiper]);

  useEffect(() => {
    swiper?.slideTo(activeIndex);
  }, [activeIndex, swiper]);

  useMotionValueEvent(index, "change", (i) => {
    let newInd = Math.round(i);

    if (window.location.hash === "#secret" && newInd === 1) {
      newInd = 0;
    }
    if ((swiper?.activeIndex || 0) > 0) {
      swiper?.slideTo(newInd);
    } else if (activeIndex === 0 && i > 1.5) {
      swiper?.slideTo(2);
    }
  });

  const iOS_1to12 = /iPad|iPhone|iPod/.test("");
  const h = (n: number) => `${n}${iOS_1to12 ? "vh" : "lvh"}`;

  return (
    <>
      <StickySection height={h(275)}>
        {/* <BackgroundImage src="/images/wallpaper/1.webp" desat alt="Moosweiher See in Freiburg" />
                
                */}
        <DualImages
          saturate
          images={["/images/wallpaper/20.webp", "/images/wallpaper/me-ls.webp"]}
          hq={["/images/wallpaper/22.webp"]}
          moveX={0}
          alts={[
            "A small pond surrounded by trees and wildflowers with sunlight filtering through.",
            "Moritz Roessler auf der Hochzeit von Elmar Schoettner",
          ]}
          active
        />
        <Parallax distance={320 * 0.5} offset={320 * 0.5}>
          <FlyOut range={[0.25, 0.5]}>
            <Container>
              <AnimatedImageCircle
                images={["/images/profile.webp", "/images/profile2.webp"]}
                alts={[
                  "Selfie of Moritz Roessler",
                  "Selfie of Moritz Roessler with sunglasses",
                ]}
              />
              {/* <IntersectionAnchor
                hash={""}
                scroll={false}
                rootMargin={"40%"}
              ></IntersectionAnchor> */}
            </Container>
          </FlyOut>
        </Parallax>
        <MyName />
        <ScrollbarTooltip />
        {/* <RisingSun /> */}
        {/* <AutoPlayButton /> */}
      </StickySection>

      <StickySection height={h(activeIndex === 0 ? 1200 : 700)} fullScreen>
        {/* <IntersectionAnchor
          hash={"love"}
          block="center"
          noChange
        //   scroll
          scrollBy={[
            height * 0.676192,
            height * 0.6762,
            // height * 0.66,
            height * 0.66,

            // height * 0.77,
          ]}
        ></IntersectionAnchor> */}
        {/* <IntersectionAnchor
          hash={"about"}
          block="center"
          noChange
          scroll
          scrollBy={[height * 0.75, height * 1.5]}
        ></IntersectionAnchor>
        <IntersectionAnchor
          hash={"perfumery"}
          block="center"
          noChange
          scroll
          scrollBy={[height * 3.4, 0.1, height * 0.5]}
        ></IntersectionAnchor> */}
        <Swiper
          className="h-[120vh] w-[100vw] sticky top-0 "
          onSwiper={setSwiper}
          initialSlide={initialSlide}
        >
          <SwiperSlide className="h-full w-full flex justify-center">
            <DualImages
              lazy
              className="-z-10"
              range={[0, 0.5]}
              images={[
                "/images/wallpaper/19.webp",
                "/images/wallpaper/18.webp",
                "/images/wallpaper/8.webp",
              ]}
              // moveX={3}
              // xMotion={[[0, 1], ["75% 00%", "50% 0%"]]}
              // x2Motion={[[0.5, 0.9], ["30% 0%", "48% 0%"]]}
              alts={[
                "Depiction of a forest fragrance",
                'Depiction of my "Wooden heart" fragrance.',
              ]}
              active={activeIndex === 0}
            />
            <AppearingText
              hash="love"
              range={[0, 0.5]}
              className="top-[50vh]"
              slices={[0, 6, 6]}
              texts={[t("texts.nature"), t("texts.languages"), t("texts.life")]}
            />
            <Parallax
              trans={[0, 0.11]}
              className="absolute w-full flex flex-col items-center gap-2 mt-[50lvh]"
              distance={64}
              offset={-64}
            >
              <Parallax trans={[0.4, 0.22]} distance={-800} offset={-800}>
                <Bullets
                  range={[0, 0.2]}
                  data={[
                    {
                      text: "Longboarding",
                      logo: () => "🛹",
                      // href: "https://www.typescriptlang.org/",
                    },
                    {
                      text: "Walks in the park",
                      logo: () => "🍃",

                      // href: "https://react.dev/",
                    },
                    {
                      text: "Forests",
                      logo: () => "🌳",

                      // href: "https://react.dev/",
                    },
                  ]}
                  offset={0.6}
                />
              </Parallax>
            </Parallax>

            <Parallax
              trans={[0, 0.22]}
              className="absolute w-full flex flex-col items-center gap-2 mt-[50lvh]"
              distance={64}
              offset={-64}
            >
              <Parallax trans={[0.77, 0.33]} distance={-800} offset={-800}>
                <Bullets
                  range={[0.1, 0.4]}
                  data={[
                    {
                      text: "German (C2)",
                      logo: () => (
                        <Image
                          src={"/images/logos/germany.png"}
                          alt="German Flag"
                          className="!h-6 !w-6"
                          width={24}
                          height={24}
                        />
                      ),
                      // href: "https://www.typescriptlang.org/",
                    },
                    {
                      text: "English (C1)",
                      logo: () => (
                        <Image
                          src={"/images/logos/usa.png"}
                          alt="USA Flag"
                          className="!h-6 !w-6"
                          width={24}
                          height={24}
                        />
                      ),

                      // href: "https://react.dev/",
                    },
                    {
                      text: "Spanish (B2)",
                      logo: () => (
                        <Image
                          src={"/images/logos/chile.png"}
                          alt="Chilean Flag"
                          className="!h-6 !w-6"
                          width={24}
                          height={24}
                        />
                      ),

                      // href: "https://react.dev/",
                    },
                    {
                      text: "TypeScript",
                      logo: TS,
                      // href: "https://react.dev/",
                    },
                  ]}
                  offset={0.6}
                />
              </Parallax>
            </Parallax>
            <Parallax
              trans={[0.33, 0.44]}
              className="absolute w-full flex flex-col items-center gap-2 mt-[50lvh]"
              distance={64}
              offset={-64}
            >
              <Bullets
                range={[0.33, 0.44]}
                data={[
                  {
                    text: "Friends",
                    logo: () => "🥳",
                    // href: "https://www.typescriptlang.org/",
                  },
                  {
                    text: "Family",
                    logo: () => "🥰",

                    // href: "https://react.dev/",
                  },
                  {
                    text: "A Home",
                    logo: () => "🏠",

                    // href: "https://react.dev/",
                  },
                ]}
                offset={0.6}
              />
            </Parallax>
            <SproutingHearts n={128} range={[0, 0.5]} />
            {/* <Parallax trans={[1, 0.75]} className='absolute w-full flex flex-col items-center gap-2 mt-[50lvh]' distance={height * -0.25} offset={0}>
                            <PerfumeLink range={[0.75, 1]} />
                        </Parallax> */}
          </SwiperSlide>

          <SwiperSlide className="h-full w-full flex justify-center">
            <DualImages
              lazy
              key={activeIndex}
              range={[0, 0.5]}
              images={[
                "/images/wallpaper/14.webp",
                "/images/wallpaper/15.webp",
              ]}
              moveX={2}
              alts={[
                "Modern websites float above a calm sea bordered by a blackwood forest, with tall reeds and sunlight filtering through the trees.",
                "Different Angle: Modern websites float above a calm sea bordered by a blackwood forest, with tall reeds and sunlight filtering through the trees.",
              ]}
              active={activeIndex === 1}
            />
            <AppearingText
              range={[0, 0.5]}
              className="top-[50vh]"
              texts={["Software Engineer", "Fullstack Dev"]}
              hash="about"
            />
            <HeartButton setActiveIndex={setActiveIndex} />
            <Parallax
              trans={[0, 0.7]}
              className="absolute w-full flex flex-col items-center gap-2 mt-[50lvh]"
              distance={64}
              offset={-64}
            >
              <Bullets
                range={[0, 0.5]}
                data={[
                  {
                    text: "TypeScript",
                    logo: TS,
                    href: "https://www.typescriptlang.org/",
                  },
                  {
                    text: "React",
                    logo: ReactLogo,
                    href: "https://react.dev/",
                  },
                ]}
                offset={0.6}
              />
              <Parallax trans={[0.5, 0]} distance={64} offset={-64}>
                <Bullets
                  randomUp
                  range={[0, 0.5]}
                  l={3}
                  gapTiming={-2}
                  data={[
                    {
                      text: "SQL",
                      logo: SQLLogo,
                      href: "https://www.postgresql.org/",
                    },
                    {
                      text: "AWS",
                      logo: AWSLogo,
                      href: "https://aws.amazon.com/de/console/",
                    },
                    {
                      text: "Node.js",
                      logo: NodeJSLogo,
                      href: "https://nodejs.org/en",
                    },
                    {
                      text: "Vue.js",
                      logo: VueJSLogo,
                      href: "https://vuejs.org/",
                    },
                    {
                      text: "Docker",
                      logo: DockerLogo,
                      href: "https://www.docker.com/",
                    },
                    {
                      text: "Lambda",
                      logo: LambdaLogo,
                      href: "https://aws.amazon.com/de/lambda/",
                    },
                  ]}
                  className="!flex-row"
                  offset={0.75}
                ></Bullets>
              </Parallax>
            </Parallax>
          </SwiperSlide>

          <SwiperSlide className="h-full w-full flex justify-center">
            <DualImages
              lazy
              className="-z-10"
              range={[0.6, 1]}
              images={["/images/wallpaper/8.webp", "/images/wallpaper/9.webp"]}
              moveX={2}
              // xMotion={[[0, 1], ["75% 00%", "50% 0%"]]}
              x2Motion={[
                [0.5, 0.9],
                ["30% 0%", "48% 0%"],
              ]}
              alts={[
                "Depiction of a Forest scent",
                'Depiction of my "wooden heart" fragrance.',
              ]}
              active={activeIndex === 2}
            />
            <AppearingText
              range={[0.75, 1]}
              className="top-[50vh]"
              texts={["Hobby Perfumer", "Fine Fragrances"]}
              hash="perfumery"
            />
            <Parallax
              trans={[1, 0.75]}
              className="absolute w-full flex flex-col items-center gap-2 mt-[50lvh]"
              distance={height * -0.25}
              offset={0}
            >
              {/* <PerfumeLink range={[0.75, 0.85]} /> */}
              <Parallax distance={32} offset={-48}>
                <Bullets
                  range={[0.57, 0.88]}
                  data={[
                    {
                      text: t("texts.ingredients"),
                      logo: () => <Icon icon="FaFlask" />,
                      href: `https://perfumery.javascript.moe/${locale}/inventory`,
                    },
                    {
                      text: t("texts.formulas"),
                      logo: () => <Icon icon="FaBook" />,
                      href: `https://perfumery.javascript.moe/${locale}/formulas`,
                    },
                  ]}
                  reverse
                  offset={0.73}

                  // offset={0.55}
                ></Bullets>
              </Parallax>
            </Parallax>

            {/* <Overlay /> */}
          </SwiperSlide>
        </Swiper>
      </StickySection>

      <StickySection height={h(400)} hash="contact" block="end">
        <DualImages
          lazy
          images={["/images/wallpaper/16.webp", "/images/wallpaper/17.webp"]}
          alts={[
            "A calm sea bordered by sleek blackwood trees reflects a gradient sky, with mist hovering above the water. Tall, futuristic Schilf reeds sway along the shore, and dappled sunlight filters through a sophisticated canopy.",
            "Different angle: A calm sea bordered by sleek blackwood trees reflects a gradient sky, with mist hovering above the water. Tall, futuristic Schilf reeds sway along the shore, and dappled sunlight filters through a sophisticated canopy",
          ]}
          invert
          desat
          active
        />
        <AppearingText
          texts={[t("texts.senior"), t("texts.lead"), t("texts.contact")]}
          slices={[0, 14, 0]}
          hash="contact"
        />

        <Parallax
          className="w-full mt-[25lvh] flex flex-col justify-center"
          distance={100}
          offset={-100}
        >
          <Bullets
            range={[0.5, 0.88]}
            data={[
              {
                text: "VCF",
                logo: () => <Icon icon="FaUser" />,
                href: "/Moritz Roessler.vcf",
                target: "_blank",
                download: true,
              },
              { text: "CV", logo: PDF, href: "https://justmycv.com/en.pdf" },
              {
                text: "LinkedIn",
                logo: LI,
                href: "https://www.linkedin.com/in/moritz-roessler-666b18175/",
              },
            ]}
            offset={0.75}
          ></Bullets>
          <Parallax distance={32} offset={-48}>
            <Bullets
              range={[0.5, 0.88]}
              data={[
                {
                  text: "GitHub",
                  logo: () => <GH style={{ fill: "white" }} />,
                  href: "https://github.com/C5H8NNaO4/javascript.moe",
                },
                {
                  text: "SO",
                  logo: () => (
                    <StackOverflowLogo
                      style={{ fill: "white", width: "unset" }}
                    />
                  ),
                  href: "https://stackoverflow.com/users/1487756/moritz-roessler",
                },
              ]}
              reverse
              offset={0.73}

              // offset={0.55}
            ></Bullets>
          </Parallax>
        </Parallax>
      </StickySection>
    </>
  );
}
