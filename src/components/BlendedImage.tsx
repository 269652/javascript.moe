"use client";

import { easeOut, useScroll, useTransform } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { sectionCtx } from "@/components/AnimatedSection";
import { useParallax } from "@/lib/hooks";
import clsx from "clsx";
import { MotionDiv, MotionImg } from "./client/Motion";

export const DualImages = ({
  lazy,
  className,
  range = [0, 1],
  images,
  hq,
  moveX = 0,
  xMotion = [
    [0, 1],
    ["0% 00%", "50% 0%"],
  ],
  x2Motion = [
    [0.5, 0.9, 1],
    ["8% 0%", "42% 0%", "25% 0%"],
  ],
  alts,
  active,
}: {
  xMotion?: [number[], any[]];
  x2Motion?: [number[], any[]];
  className?: string;
  range?: number[];
  images: string[];
  hq?: string[];
  alts: string[];
  invert?: boolean;
  desat?: boolean;
  moveX?: 0 | 1 | 2 | 3;
  active?: boolean;
  saturate?: boolean;
  lazy?: boolean;
}) => {
  const { ref: scrollRef } = useContext(sectionCtx);
  const { scrollYProgress } = useScroll({
    layoutEffect: false,
    target: scrollRef || undefined,
    offset: ["start start", "end end"],
  });
  const trans = useTransform(scrollYProgress, range, [0, 1]);

  const y = useParallax(trans, 50, 50);
  const x = useTransform(trans, ...xMotion);
  const x2 = useTransform(trans, ...x2Motion);
  const filter = useTransform(trans, [0.9, 1], ["blur(0px)", "blur(12px)"], {
    ease: easeOut,
  });
  const scale = useTransform(trans, [0.9, 1], ["100%", "104%"]);
  const y2 = useParallax(trans, 75, -25);
  const down = useTransform(trans, [0.9, 1], [0, 10]);
  const y2C = useTransform(() => y2.get() + down.get() * 2);
  const reverse = useTransform(trans, [0, 1], [1, 0]);

  const [showHq, setShowHq] = useState(false);

  useEffect(() => {
    // console.log ("SET SRC", src, hq)
    if (typeof window === "undefined") return;
    if (!hq) return;
    setShowHq(true);
  }, [setShowHq]);
  return (
    <MotionDiv
      className={clsx(
        className,
        "absolute w-[100vw] h-[120vh] h-[120lvh] bg-black"
      )}
      style={{ filter }}
    >
      <MotionImg
        key={"img" + images[0]}
        src={images[0]}
        alt={alts[0]}
        loading={lazy ? "lazy" : "eager"}
        className="csr absolute w-[100vw] h-[120vh] h-[120lvh]"
        style={{
          opacity: reverse,
          objectPosition: moveX & 1 ? x : undefined,
          scale: active ? scale : undefined,
          y: y,
        }}
      />
      {hq && showHq && (
        <MotionImg
          key={"hq" + hq[0]}
          src={hq[0]}
          alt={alts[0]}
          loading={"lazy"}
          className="csr absolute w-[100vw] h-[120vh] h-[120lvh]"
          style={{
            opacity: reverse,
            objectPosition: moveX & 1 ? x : undefined,
            scale: active ? scale : undefined,
            y: y,
          }}
        />
      )}
      <MotionImg
        src={images[1]}
        alt={alts[1]}
        loading="lazy"
        className="csr absolute w-[100vw] h-[120vh] h-[120lvh]"
        style={{
          opacity: trans,
          objectPosition: moveX & 2 ? x2 : undefined,
          scale: active ? scale : undefined,
          y: y2C,
        }}
      />
    </MotionDiv>
  );
};
