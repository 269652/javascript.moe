import Link from "next/link";
import { Button } from "./Button";
import { dynamicLink } from "@/lib/links";
import clsx from "clsx";
import { min } from "date-fns";

export type PaginationProps = {
  className?: string;
  pagination: {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
  };
  params: any;
  searchParams: any;
};
export const Pagination = (props: PaginationProps) => {
  const { className, pagination, params, searchParams } = props;
  const { page, pageCount } = pagination;
  let pages = [...new Array(pageCount)].map((e, i) => i + 1) as any;

  const filteredPages = pages.filter((page: number) => {
    return (
      page === 1 || // Always show first page
      page === pageCount || // Always show last page
      Math.abs(page - pagination.page) <= 2 // Show current ± 2 pages
    );
  });
  return (
    <div className="ml-auto flex p-2 gap-1">
      {filteredPages.map((p: number) => {
        return (
          <>
            {p === pageCount && page < pageCount - 3 && (
              <Button
                disabled
                className="min-h-[3ch] !bg-white/10 hover:bg-white/10 !cursor-default !border-transparent"
              >
                ...
              </Button>
            )}
            <Link
              scroll
              href={dynamicLink({
                locale: params.locale,
                params,
                searchParams: { ...searchParams, p },
              })}
            >
              <Button
                className={clsx("min-w-[3ch] text-center flex justify-center", {
                  " !bg-white/40": page === p,
                  " !bg-white/0": page !== p,
                })}
              >
                {p}
              </Button>
            </Link>
            {p === 1 && page > 3 && (
              <Button
                disabled
                className="min-h-[3ch] !bg-white/10 hover:bg-white/10 !cursor-default !border-transparent"
              >
                ...
              </Button>
            )}
          </>
        );
      })}
    </div>
  );
};
