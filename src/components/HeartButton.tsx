import { easeIn, easeInOut, useScroll, useTransform } from "framer-motion";
import { useContext } from "react";
import { sectionCtx } from "./AnimatedSection";
import { MotionDiv } from "./client/Motion";
import { IconButton } from "./Button";
import Link from "next/link";
import { useWindowHeight } from "@/lib/hooks";

export const HeartButton = ({ setActiveIndex }: any) => {
  const { ref } = useContext(sectionCtx);
  const { scrollYProgress } = useScroll({
    layoutEffect: false,
    target: ref || undefined,
    offset: ["start start", "end end"],
  });
  const t = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const x = useTransform(t, [0, 0.5, 1], [-(8 * 5), 8, -(4 * 1)], {
    ease: easeInOut,
  });
  //   const p = useTransform(t, [0.54, 0.59], [0, 8 * 2]);
  //   const r = useTransform(t, [0.5, 0.7], ["100% 100% 100% 100%", " 0% 100%  100% 0%"]);
  const o = useTransform(t, [0, 1], [0, 0.7], { ease: easeIn });

  const shadow = useTransform(
    t,
    [0, 0.5, 1],
    [
      "0px 0px 0px 0px rgb(220 38 38 / 0.4)",
      "0px 0px 4px 4px rgb(220 38 38 / 0.4)",
      "0px 0px 3px 1px rgb(220 38 38 / 0.4)",
    ],
    { ease: easeInOut }
  );

  const filter = useTransform(
    t,
    [0, 0.9, 1],
    ["blur(0px)", "blur(1px)", "blur(2px)"],
    { ease: easeIn }
  );
  const height = useWindowHeight();
  return (
    <MotionDiv
      style={{
        opacity: o,
        y: height / 2 + 24,
        x,
      }}
      className="flex w-full justify-start pl-4 my-auto "
    >
      <MotionDiv
        className="h-fit rounded-full hover:!blur-[0px]"
        style={{
          boxShadow: shadow,
          filter,
        }}
      >
        <IconButton
          onClick={() => setActiveIndex(0)}
          icon="FaHeart"
          round
          className="z-50 bg-red-600/40 !border-red-700 hover:text-red-600 hover:bg-white/5 "
        />
      </MotionDiv>
    </MotionDiv>
  );
};
