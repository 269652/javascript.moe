"use client";

import { useLocalStorage } from "@/lib/useLocalStorage";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import clsx from "clsx";
import { useLocale } from "next-intl";

export const ViewCounter = ({ post, className }: any) => {
  const [incremented, setIncremented] = useLocalStorage(
    false,
    "viewed." + post.documentId
  );
  const [views, setViews] = useState(post.views);
  const sem = useRef(false);
  const sem2 = useRef(false);
  // In your frontend (e.g., Next.js)
  useEffect(() => {
    (async () => {
      if (!incremented && !sem.current) {
        sem.current = true;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_BASE}/api/blog-posts/${post.documentId}/increment-views?locale=${post.locale}`,
          {
            method: "POST",
          }
        );

        const json = await res.json();
        console.log("INCREMENT ", json);
        if (json.success) setIncremented(true);
      }
    })();
  }, [post.documentId, incremented, sem.current]);

  useEffect(() => {
    if (!post.documentId) return;
    (async () => {
      if (!sem2.current) {
        sem2.current = true;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_BASE}/api/blog-posts/${post.documentId}/views?locale=${post.locale}`,
          {
            method: "GET",
          }
        );
        const json = await res.json();
        console.log ("VIEWS", json.views)
        setViews(json.views);
      }
    })();
  }, [post.documentId]);

  return (
    <div
      className={clsx(
        "ml-4 p-2 flex gap-2 bg-white/20 rounded-md items-center font-semibold text-lg",
        className
      )}
    >
      <Icon icon="FaEye" className="!h-6 !w-6"></Icon>
      {views || "0"}
    </div>
  );
};
