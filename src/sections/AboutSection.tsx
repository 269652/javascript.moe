"use client";

import { sectionCtx } from "@/components/AnimatedSection";
import { BackgroundImage } from "@/components/BackgroundImage";
import { MotionDiv, MotionP } from "@/components/client/Motion";
import { Parallax } from "@/components/Parallax";
import { getVH } from "@/lib/util";
import { AboutSectionProps } from "@/types/AboutSection";
import { useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useContext } from "react";

export const AboutSection = ({ text, locale }: AboutSectionProps) => {
  const { ref: scrollRef } = useContext(sectionCtx);
  const { scrollYProgress } = useScroll({
    
    target: scrollRef || undefined,
    offset: ["start start", "end end"],
  });
  const t = useTranslations("about");

  const dist = getVH(50);
  const offset = -dist;
  const blur = useTransform(
    scrollYProgress,
    [0, 0.75],
    ["blur(4px)", "blur(0px)"]
  );
  const rblur = useTransform(
    scrollYProgress,
    [0, 0.75],
    [
      "brightness(100%) blur(0px) saturate(100%)",
      "brightness(80%) blur(4px) saturate(140%)",
    ]
  );
  const background = useTransform(
    scrollYProgress,
    [0, 0.75],
    ["#FFFFFF11", "#00000033"]
  );
  const overflowY = useTransform(
    scrollYProgress,
    [0, 0.75],
    ["hidden", "auto"]
  );

  return (
    <>
      <BackgroundImage
        src="/images/wallpaper/5.webp"
        alt="Seepark in Freiburg"
      />
      <div className="w-[80ch] max-w-[calc(100vw-32px)] absolute top-0">
        <Parallax
          distance={32 * 2}
          offset={32 * 1}
          className="flex"
          range={[0.75, 0]}
        >
          {/* <Link to={`/${i18n.language}`} className="flex">
              <ArrowBack style={{ fill: "white" }} />
              <h2>Back</h2>
            </Link> */}
        </Parallax>
        <Parallax
          distance={dist - 32 * 4}
          offset={offset + 32 * 2}
          range={[0.75, 0]}
        >
          <button
          //  onClick={scrollToTop}
          >
            <MotionDiv
              style={{
                background,
                backdropFilter: rblur,
                overflowY,
              }}
              className="p-4 rounded-md shadow-lg shadow-black max-h-[calc(100svh-120px)] text-left"
            >
              <MotionP
                style={{ filter: blur, textShadow: "1px 1px 1px black" }}
              >
                {text && t(text)}
              </MotionP>
            </MotionDiv>
          </button>
        </Parallax>
        <Parallax
          distance={dist - 32 * 2}
          offset={offset + 32}
          className="w-fit absolute top-0 ml-4"
          range={[0.75, 0]}
        >
          <button
            className="w-fit"
            //  onClick={scrollToTop}
          >
            <h1 style={{ textShadow: "0px 0px 3px black" }}>About Me</h1>
          </button>
        </Parallax>
      </div>
    </>
  );
};
