"use client";

import { useEffect } from "react";

export const AnchorJumper = () => {
  useEffect(() => {
    // Only run client-side
    if (typeof window === "undefined") return;

    const anchor = window.location.hash?.slice(1); // remove "#"
    if (anchor) {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: "instant" });
      }
    }
  }, []); // run once on mount

  return null;
};
