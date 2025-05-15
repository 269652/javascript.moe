"use client";

import { useLocalStorage } from "@/lib/useLocalStorage";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import clsx from "clsx";

export const ViewCounter = ({ post, className, increment }: any) => {
  const [incremented, setIncremented] = useLocalStorage(
    false,
    `viewed.${post.locale}.${post.documentId}`
  );
  const [views, setViews] = useState(post.views);
  const hasFetched = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !hasFetched.current && post?.documentId) {
          hasFetched.current = true;

          try {
            // Fetch view count
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_STRAPI_BASE}/api/blog-posts/${post.documentId}/views?locale=${post.locale}`
            );
            const json = await res.json();
            setViews(json.views);

            // Optionally increment view count
            if (increment && !incremented) {
              const resInc = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_BASE}/api/blog-posts/${post.documentId}/increment-views?locale=${post.locale}`,
                { method: "POST" }
              );
              const incJson = await resInc.json();
              if (incJson.success) {
                setViews(json.views);
                setIncremented(true);
              }
            }
          } catch (err) {
            console.error("Error fetching/incrementing views", err);
          }

          observer.disconnect(); // Disconnect after first fetch
        }
      },
      {
        rootMargin: "0px",
        threshold: 0.1, // Adjust based on when you want it to trigger
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [post?.documentId, increment, incremented]);

  return (
    <div
      ref={ref}
      className={clsx(
        "ml-4 p-2 flex gap-2 bg-white/20 rounded-md items-center font-semibold text-lg",
        className
      )}
    >
      <Icon icon="FaEye" className="!h-6 !w-6" />
      {views || "0"}
    </div>
  );
};
