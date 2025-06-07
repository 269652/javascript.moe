"use client";

import clsx from "clsx";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Panel } from "./Panel";
import { LabelsProps } from "@/types/Labels";
import { blogLabelsLink } from "@/lib/links";

export const Labels = ({
  labels,
  labelNames,
  className,
  connection,
  variant,
}: LabelsProps) => {
  const { locale } = useParams<{ locale: string }>();
  const searchParams = Object.fromEntries(useSearchParams().entries());
  const newSearchParams = { ...searchParams };
  const isAndCon = connection === "AND";

  if (!isAndCon) {
    newSearchParams.c = "AND";
  } else {
    delete newSearchParams.c;
  }
  return (
    <Panel
      scrollDir="y"
      stretch="shrink"
      hasBottomBorder
      hasBottomPadding
      className={className}
      variant={variant}
    >
      {labels
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((cat: any) => {
          const active = labelNames.includes(cat.slug);
          const disabled = labelNames.length > 4 && !active;

          const newLabelNames = active
            ? labelNames.filter((l: string) => l !== cat.slug)
            : [...labelNames, cat.slug].sort();

          const searchParams = {} as any;
          if (isAndCon) searchParams.c = "AND";
          if (variant === "dark") searchParams.ui = 1;
          const href =
            newLabelNames.length > 0
              ? `/${locale}/blog/labels/${newLabelNames.join(",")}?` +
                new URLSearchParams(searchParams).toString()
              : `/${locale}/blog`;

          return (
            <Link
              key={cat.id}
              href={disabled ? "" : href}
              className={clsx(
                `p-2 px-3 rounded-full  text-sm text-white transition`,
                {
                  "bg-sky-600 hover:bg-sky-500": active,
                  "bg-gray-700 hover:bg-sky-700": !active,
                  "!bg-gray-400/40 !hover:bg-purple-500 cursor-default !text-gray-100":
                    disabled,
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
            "absolute top-0 right-0 p-2  rounded-bl-lg min-w-11 text-center",
            {
              "bg-amber-500 hover:bg-amber-400": isAndCon,
              "bg-purple-500 hover:bg-purple-400  ": !isAndCon,
              "shadow-[0px_0px_2px_1px_black]": variant === "dark",
              "shadow-[0px_0px_2px_1px_white]": variant === "light",
            }
          )}
          href={blogLabelsLink({
            locale,
            searchParams: newSearchParams,
            labels: labelNames,
          })}
        >
          {isAndCon ? "AND" : "OR"}
        </Link>
      )}
    </Panel>
  );
};
