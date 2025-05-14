"use client";

import clsx from "clsx";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

export const Labels = ({ labels, labelNames, className }: any) => {
  const { locale } = useParams<{ locale: string }>();
  const search = useSearchParams();
  const isAndCon = search.get("c") !== "OR";

  return (
    <div
      className={clsx(
        "flex-wrap gap-1  basis-1/2 shrink justify-start ml-auto p-2  rounded-md rounded-bl-none bg-black/20 max-h-[98px] overflow-y-auto ",
        className
      )}
    >
      {labels.map((cat: any) => {
        const active = labelNames.includes(cat.slug);
        const newLabelNames = active
          ? labelNames.filter((l: string) => l !== cat.slug)
          : [...labelNames, cat.slug].sort();
        const href =
          newLabelNames.length > 0
            ? `/${locale}/blog/labels/${newLabelNames.join(",")}${
                !isAndCon ? "?c=OR" : ""
              }`
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
      {labelNames.length > 1 && (
        <Link
          className={clsx("absolute top-1 right-1 p-2  rounded-full min-w-11 text-center",{
            "bg-amber-500 hover:bg-amber-400": isAndCon,
            "bg-sky-500 hover:bg-sky-400  ": !isAndCon,
          })}
          href={`/${locale}/blog/labels/${labelNames.join(",")}${
            isAndCon ? "?c=OR" : ""
          }`}
        >
          {isAndCon ? "AND" : "OR"}
        </Link>
      )}
    </div>
  );
};
