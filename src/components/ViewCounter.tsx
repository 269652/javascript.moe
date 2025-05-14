"use client";

import { useLocalStorage } from "@/lib/useLocalStorage";
import { useEffect, useRef } from "react";
import { Icon } from "./Icon";
import clsx from "clsx";

export const ViewCounter = ({ post, className }: any) => {
  const [incremented, setIncremented] = useLocalStorage(
    false,
    "viewed." + post.documentId
  );
  const sem = useRef(false);
  // In your frontend (e.g., Next.js)
  useEffect(() => {
    (async () => {
      if (!incremented && !sem.current) {
        sem.current = true;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_BASE}/api/blog-posts/${post.documentId}/increment-views`,
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

  return (
    <div
      className={clsx(
        "ml-4 p-2 flex gap-2 bg-white/20 rounded-md items-center font-semibold text-lg",
        className
      )}
    >
      <Icon icon="FaEye" className="!h-6 !w-6"></Icon>
      {post.views || "0"}
    </div>
  );
};
