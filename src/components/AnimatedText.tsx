"use client";

import {
  easeInOut,
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useParallax, useWindowHeight, useWindowWidth } from "@/lib/hooks";
import { useContext, useRef, useState, useMemo, useEffect } from "react";
import { sectionCtx } from "@/components/AnimatedSection";
import clsx from "clsx";
import { getHeight } from "@/lib/util";
import i18n from "i18next";
// import { IntersectionAnchor } from "./IntersectionAnchor";
import { MotionDiv, MotionSpan, MotionH1, MotionH2 } from "./client/Motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import { IntersectionAnchor } from "./IntersectionAnchor";

export const AnimatedText = () => {
  const { ref } = useContext(sectionCtx);
  const { scrollYProgress } = useScroll({
    layoutEffect: false,
    target: ref || undefined,
    offset: ["start start", "end end"],
  });
  const height = useWindowHeight();
  const y = useParallax(scrollYProgress, 150, height * -0.55, easeInOut);
  const scale = useTransform(scrollYProgress, [0.25, 1], ["36px", "72px"]);

  return (
    <MotionH1
      className="absolute top-5 text-center"
      style={{ y, fontSize: scale, lineHeight: scale, zIndex: 100 }}
    >
      Moritz Roessler
    </MotionH1>
  );
};

export const MyName = () => {
  const { ref } = useContext(sectionCtx);
  const height = getHeight(ref?.current || null);

  const { scrollYProgress: scrollYPage1 } = useScroll();
  const scrollYPage =
    typeof window === "undefined" ? new MotionValue(0) : scrollYPage1;
  const scrollYProgressHook = useTransform(scrollYPage, [0, 0.144], [0, 1], {
    clamp: true,
  });
  const scrollYProgress =
    typeof window === "undefined" ? new MotionValue(1) : scrollYProgressHook;
  // const { scrollYProgress } = useScroll({
  //   layoutEffect: false,
  //   target: ref || undefined,
  //   offset: ["start start", "end end"],
  // });
  const hRef = useRef<HTMLDivElement>(null);

  const distance = height / 1.75 / 4;
  let marginBottom = 16;
  if (hRef.current) {
    marginBottom =
      +window.getComputedStyle(hRef.current).marginBottom.replace("px", "") /
      window.devicePixelRatio;
  }

  const offset = marginBottom;
  const trans =
    typeof window === "undefined"
      ? new MotionValue(0)
      : useTransform(scrollYProgress, [0, 0.75], [0, 1]);

  const y = useParallax(trans, distance - offset, distance - offset, easeInOut);
  const width = useWindowWidth();
  const opacity = useTransform(trans, [0.75, 1], [1, 0.1]);
  const fS = width <= 452 ? 52 : 72;
  const fontSize = useTransform(
    trans,
    [0.25, 0.9],
    ["36px", width <= 452 ? "52px" : "72px"]
  );
  const shadow = useTransform(
    scrollYPage,
    [0, 0.05, 0.1, 0.15, 0.2],
    [
      "0px 0px 0px #FFFFFF",
      "0px 0px 8px #FFFFFF",
      "1px 1px 1px #333333",
      "0px 0px 0px #FFFFFF",
      "0px 0px 8px #FFFFFF",
    ]
  );

  const mRef = useRef<HTMLDivElement>(null);
  const oeRef = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState([4, -4]);

  const [distCenterM, distCenterOe] = dist;
  const mX = useTransform(trans, [0.8, 0.9], ["0px", distCenterM + "px"]);
  const oeX = useTransform(trans, [0.8, 0.9], ["0px", distCenterOe + "px"]);
  const scale = useTransform(
    trans,
    [0.8, 0.9, 0.95, 1],
    ["100%", "130%", "70%", "100%"]
  );
  const mRect = mRef.current?.getBoundingClientRect() || null;
  const oeRect = oeRef.current?.getBoundingClientRect() || null;
  const cw = (mRect?.width || 0) + (oeRect?.width || 0);
  const heightPipe = useTransform(trans, [0.95, 1], ["0px", 0.681 * cw + "px"]);
  const widthUS = useTransform(trans, [0.95, 1], ["0px", cw + "px"], {
    clamp: true,
  });
  const yPpipe = useTransform(
    trans,
    [0.95, 1],
    [fS * -0.25 + "px", 0.25 * cw + "px"],
    {
      clamp: true,
    }
  );
  const xUS = useTransform(
    trans,
    [0.95, 1],
    ["0px", -(mRect?.width || 0) + "px"],
    {
      clamp: true,
    }
  );
  const yUS = useTransform(trans, [0.95, 1], [0, -4], {
    clamp: true,
  });
  const shadowPipe = useTransform(
    trans,
    [0.97, 1],
    ["0px 0px 4px 2px #FFFFFF", "0px 0px 1px 0.5px #C0C0C0"],
    {
      clamp: true,
    }
  );
  const fillPipe = useTransform(trans, [0.95, 1], ["#FFFFFFFF", "#FFFFFF00"], {
    clamp: true,
  });
  const bb = useTransform(
    trans,
    [0, 0.95, 1],
    ["2px solid white", "2px solid white", "0px solid white"],
    {
      clamp: true,
    }
  );
  const scalePipe = useTransform(trans, [0.7, 0.9, 1], ["0%", "100%", "100%"], {
    clamp: true,
  });
  const wPipe = useTransform(trans, [0.5, 1], ["0px", "4px"], {
    clamp: true,
  });

  const color = useTransform(
    scrollYPage,
    [0, 0.05, 0.09, 0.2],
    ["#DDDDDDFF", "#EEEEEEFF", "#DDDDDDFF", "#FFFFFF33"],
    {
      clamp: true,
    }
  );

  const locale = useLocale();
  useEffect(() => {
    if (trans.get() <= 1) {
      // const hWidth = ((mRect?.width || 0) + (oeRect?.width || 0)) / 2
      const distCenterM =
        -(mRect?.left || 0) + window.innerWidth / 2 - (mRect?.width || 0);
      const distCenterOe = window.innerWidth / 2 - (oeRect?.left || 0);
      setDist([distCenterM, distCenterOe]);
    }
  });
  useMotionValueEvent(trans, "change", () => {
    if (trans.get() <= 1) {
      // const hWidth = ((mRect?.width || 0) + (oeRect?.width || 0)) / 2
      const distCenterM =
        -(mRect?.left || 0) + window.innerWidth / 2 - (mRect?.width || 0);
      const distCenterOe = window.innerWidth / 2 - (oeRect?.left || 0);
      setDist([distCenterM, distCenterOe]);
    }
  });
  return (
    <MotionH1
      id="moe"
      ref={hRef}
      className="absolute bottom-0 text-center"
      style={{
        y,
        fontSize,
        lineHeight: fontSize,
        zIndex: 100,
        textShadow: shadow,
        borderBottom: bb,
      }}
    >
      <Link href={"/" + locale + `/about`} className="!no-underline">
        <span ref={mRef}>
          <MotionSpan
            style={{ x: mX, display: "inline-block", scaleX: scale, color }}
          >
            M
            <MotionDiv
              className="inline-block rounded-full"
              style={{
                width: wPipe,
                background: fillPipe,
                scale: scalePipe,
                x: -1,
                fontSize: "32px",
                y: yPpipe,
                height: heightPipe,
                boxShadow: shadowPipe,
              }}
            ></MotionDiv>
          </MotionSpan>
        </span>
        <MotionSpan style={{ opacity }}>oritz R</MotionSpan>
        <span ref={oeRef}>
          <MotionSpan
            style={{ x: oeX, display: "inline-block", scaleX: scale, color }}
          >
            oe
            <MotionDiv
              className="absolute h-1 rounded-full"
              style={{
                background: fillPipe,
                scale: scalePipe,
                y: yUS,
                fontSize: "32px",
                x: xUS,
                width: widthUS,
                boxShadow: shadowPipe,
              }}
            ></MotionDiv>
          </MotionSpan>
        </span>
        <MotionSpan style={{ opacity }}>ssler</MotionSpan>
      </Link>
    </MotionH1>
  );
};

export const AppearingText = ({
  range = [0, 1],
  className,
  texts,
  slices,
  Component = MotionH1,
  hash,
}: {
  range?: number[];
  className?: string;
  texts: string[];
  slices?: number[];
  Component?: any;
  hash?: string;
}) => {
  const { ref } = useContext(sectionCtx);
  const { scrollYProgress } = useScroll({
    layoutEffect: false,
    target: ref || undefined,
    offset: ["start start", "end end"],
  });
  const trans = useTransform(scrollYProgress, range, [0, 1]);
  const dist = 110;
  const height = useWindowHeight();

  const off = dist - height * 0.25;
  const y = useParallax(trans, dist, off, easeInOut);
  const t2 = useTransform(trans, [0, 1], [1, texts.length + 1]);
  const boxShadow = useTransform(
    trans,
    [0, 1],
    ["0px 0px 0px black", "0px 0px 12px black"]
  );

  const [text, setText] = useState(["", ""]);
  const [, setRerender] = useState(0);
  const startMultiplier = 2;
  useMotionValueEvent(y, "change", () => {
    const totalProgress = t2.get();
    const curText = Math.min(texts.length - 1, Math.floor(totalProgress - 1));
    const curProgress = totalProgress % 1;
    const it = texts[curText];
    const slice = (slices || [])[curText] || 0;

    /** We want the end result to be visible for half the time of the animation. */
    const start = Math.floor(
      Math.round(curProgress * (it.length - slice - 1)) * startMultiplier
    );

    const rand = it.split("").slice(slice + start);

    rand
      .sort((a, b) => {
        const indA = it.indexOf(a);
        let indB = it.indexOf(b);
        const place = indA - indB;
        const isCapital = /[A-Z\s]/.test(a) || /[A-Z\s]/.test(b);
        if (isCapital) return 0;
        return (Math.random() - 0.5) * (1 - curProgress) + curProgress * place;
      })
      .join("");

    const part1 = it
      .split("")
      .slice(
        (slices || [])[curText] || 0,
        ((slices || [])[curText] || 0) + start
      )
      .join("");
    const part = rand.map((_, i) => rand[i]).join("");
    const txt = [it.slice(0, (slices || [])[curText] || 0).concat(part1), part];
    setText(txt);

    if (curProgress >= 0.5) {
      setRerender(1);
    } else if (curProgress < 0.5) {
      setRerender(0);
    }
  });
  return (
    <Component
      className={clsx("absolute text-center w-full", className, {
        "break-all": t2.get() % 1 < 1 / startMultiplier,
      })}
      style={{ y, zIndex: 100, textShadow: boxShadow }}
    >
      {/* {hash && (
        <IntersectionAnchor hash={hash} block={"start"}></IntersectionAnchor>
      )} */}

      <span>{text[0]}</span>
      <span style={{ color: "#FFFFFF33", textShadow: "0px 0px 7px white" }}>
        {text[1]}
      </span>
    </Component>
  );
};

export type BulletsProps = {
  data: {
    text: string;
    logo: any;
    href?: string;
    target?: string;
    download?: boolean;
  }[];
  className?: string;
  offset: number;
  reverse?: boolean;
  range?: number[];
  r?: boolean;
  l?: number;
  gapTiming?: -2 | -1;
};
export const Bullets = ({
  range = [0.5, 1],
  data,
  className,
  offset = 0.5,
  reverse,
  r,
  l,
  gapTiming = -1,
}: BulletsProps) => {
  const { ref } = useContext(sectionCtx);

  const { scrollYProgress } = useScroll({
    layoutEffect: false,
    target: ref || undefined,
    offset: ["start start", "end end"],
  });

  const trans = useTransform(scrollYProgress, range, [0, 1.1], { clamp: true });
  const trans2 = useTransform(trans, [0.4, 1], [0, 1], { clamp: true });
  const boxShadow = useTransform(
    trans,
    [0, 1],
    ["0px 0px 0px black", "0px 0px 12px black"]
  );

  const dist = offset - (range[1] - range[0]);
  const n = Math.max(4, data.length);
  const step = dist / n;
  const gap = useTransform(
    trans,
    [offset + step * (n + gapTiming), offset + step * (n + gapTiming + 1)],
    ["32px", "8px"]
  );
  const borderRadius = useTransform(
    trans,
    [offset + step * 1, offset + step * 2],
    ["32px", "0px"]
  );
  const textWidth = useTransform(
    trans,
    [offset + step * (n - 1), offset + step * n],
    ["0px", "300px"]
  );

  const scales = [...new Array(n)].map((_, i) => {
    return typeof window === "undefined"
      ? new MotionValue(0)
      : useTransform(trans2, [step * i, step * (1 + i)], [0, 1], {
          clamp: true,
        });
  });

  const filter = useTransform(
    scrollYProgress,
    [0.5, 0.9, 1],
    ["saturate(1)", "saturate(1.3)", "saturate(0.2)"]
  );

  const bg = useTransform(trans, [0.9, 1], ["#00000000", "#00000044"]);
  const rand = useMemo(
    () => scales.slice().sort(() => Math.random() - 0.5),
    []
  );
  return (
    <MotionDiv
      className={clsx(
        "flex flex-row flex-wrap text-white flex-grow-0 items-center justify-center",
        className
      )}
      style={{ gap }}
    >
      {data.map((e, i) => {
        const ele = reverse ? data.length - 1 - i : i;
        return (
          <MotionSpan
            key={"bullet" + e.text}
            className="bullet"
            tabIndex={-1}
            style={{
              display: "block",
              overflow: "hidden",
              whiteSpace: "nowrap",
              scale: r ? rand[ele % (l || n)] : scales[ele % (l || n)],
              boxShadow,
              borderRadius,
              alignItems: "center",
              justifyContent: "center",
              padding: 8,
              backgroundColor: bg,

              backdropFilter: filter,

              y: 8,
            }}
          >
            <Link href={e.href || "#"} target={e.target} download={e.download}>
              <MotionDiv className="flex flex-grow-0 items-center">
                <e.logo width="36px" height="36px" />
                <MotionH2
                  style={{
                    maxWidth: textWidth,
                  }}
                >
                  <div style={{ marginLeft: "8px" }}>{e.text}</div>
                </MotionH2>
              </MotionDiv>
            </Link>
          </MotionSpan>
        );
      })}
    </MotionDiv>
  );
};

export type BulletsRowsProps = {
  data: { text: string; logo: any; href?: string }[];
};

export const SlicedText = ({
  range = [0, 1],
  className,
  texts,
  Component = MotionH1,
}: {
  range?: number[];
  className?: string;
  texts: string[];
  slices?: number[];
  Component?: any;
}) => {
  const { ref } = useContext(sectionCtx);
  const { scrollYProgress } = useScroll({
    layoutEffect: false,
    target: ref || undefined,
    offset: ["start start", "end end"],
  });
  const trans = useTransform(scrollYProgress, range, [0, 1]);
  const dist = 110;
  const off = dist - getHeight(document.body) * 0.25;
  const y = useParallax(trans, dist, off, easeInOut);
  const t2 = useTransform(trans, [0, 1], [0, texts.length - 1]);

  const boxShadow = useTransform(
    trans,
    [0, 1],
    ["0px 0px 0px black", "0px 0px 12px black"]
  );

  const t = texts[Math.round(t2.get())];
  const [p, setP] = useState(0);

  const p1 = t.slice(0, t.length * p);
  const p2 = t.slice(p1.length);

  useMotionValueEvent(trans, "change", () => {
    setP(t2.get() % 1);
  });

  return (
    <Component
      className={clsx("absolute text-center", className, {
        "break-all": t2.get() % 1 < 1 / 1,
      })}
      style={{ y, zIndex: 100, textShadow: boxShadow }}
    >
      <span>{p1}</span>
      <span style={{ color: "#FFFFFF33", textShadow: "0px 0px 7px white" }}>
        {p2}
      </span>
    </Component>
  );
};
