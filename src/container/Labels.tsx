"use client";

import clsx from "clsx";
import Link from "next/link";
import { useParams } from "next/navigation";

export const Labels = ({ labels, labelNames, className }: any) => {
  const { locale } = useParams();
  return (
    <div className={clsx("flex-wrap gap-1", className)}>
      {labels.map((cat: any) => {
        const active = labelNames.includes(cat.slug);
        const newLabelNames = active
          ? labelNames.filter((l: string) => l !== cat.slug)
          : [...labelNames, cat.slug];
        const href =
          newLabelNames.length > 0
            ? `/${locale}/blog/labels/${newLabelNames.join(",")}`
            : `/${locale}/blog`;

        return (
          <Link
            key={cat.id}
            href={href}
            className={`p-2 px-3 rounded-full text-sm ${
              active
                ? "bg-purple-600 hover:bg-purple-400"
                : "bg-gray-700 hover:bg-purple-500"
            } text-white transition`}
          >
            {cat.name}
          </Link>
        );
      })}
    </div>
  );
};
