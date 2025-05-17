"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

export const NoScript = ({ children, className }: any) => {
  const [wasRun, setWasRun] = useState(
    typeof window === "undefined" ? false : (window as any).jsEnabled || false
  );

  useEffect(() => {
    setWasRun(true);
  });
  if (wasRun) return null;
  return <div className={clsx("noscript",className)}>{children}</div>;
};
