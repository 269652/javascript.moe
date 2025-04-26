"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { PropsWithChildren, useContext } from "react";
import { sectionCtx } from "@/components/AnimatedSection";
import { useWindowHeight } from "@/lib/hooks";

export type FlyOutProps = PropsWithChildren<{
  range: [number, number];
  className?: string;
}>;

export const FlyOut = ({ children, range }: FlyOutProps) => {
  const { ref } = useContext(sectionCtx);
  const { scrollYProgress } = useScroll({
    layoutEffect: false,
    target: ref || undefined,
    offset: ["start start", "end end"],
  });
  const height = useWindowHeight();
  const y = useTransform(scrollYProgress, range, [0, -height]);

  return <motion.div style={{ y }}>{children}</motion.div>;
};
