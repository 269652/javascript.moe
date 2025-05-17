"use client";

import clsx from "clsx";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Panel } from "./Panel";
import { LabelsProps } from "@/types/Labels";

export const Labels = ({ labels, labelNames, className }: LabelsProps) => {
  const { locale } = useParams<{ locale: string }>();
  const search = useSearchParams();
  const isAndCon = search.get("c") === "AND";
  return (
    <Panel
      scrollDir="y"
      stretch="shrink"
      hasBottomBorder
      hasBottomPadding
      className={className}
    >
      {labels
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((cat: any) => {
          const active = labelNames.includes(cat.slug);
          const disabled = labelNames.length > 4 && !active;

          const newLabelNames = active
            ? labelNames.filter((l: string) => l !== cat.slug)
            : [...labelNames, cat.slug].sort();
          const href =
            newLabelNames.length > 0
              ? `/${locale}/blog/labels/${newLabelNames.join(",")}${
                  isAndCon ? "?c=AND" : ""
                }`
              : `/${locale}/blog`;

          return (
            <Link
              key={cat.id}
              href={disabled ? "" : href}
              className={clsx(
                `p-2 px-3 rounded-full  text-sm text-white transition`,
                {
                  "bg-purple-600 hover:bg-purple-500": active,
                  "bg-gray-700 hover:bg-purple-500": !active,
                  "!bg-gray-400/40 !hover:bg-purple-500 cursor-default !text-gray-100": disabled,
                }
              )}
            >
              {cat.name}
            </Link>
          );
        })}
      {labelNames.length > 1 && (
        <Link
          className={clsx(
            "absolute top-0 right-0 p-2  rounded-bl-lg min-w-11 text-center shadow-[0px_0px_2px_1px_black]",
            {
              "bg-amber-500 hover:bg-amber-400": isAndCon,
              "bg-sky-500 hover:bg-sky-400  ": !isAndCon,
            }
          )}
          href={`/${locale}/blog/labels/${labelNames.join(",")}${
            isAndCon ? "" : "?c=AND"
          }`}
        >
          {isAndCon ? "AND" : "OR"}
        </Link>
      )}
    </Panel>
  );
};
