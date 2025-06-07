import { blogCategoryLink, blogLink } from "@/lib/links";
import Link from "next/link";
import { Panel } from "./Panel";
import { Category } from "@/types/Category";

export const Categories = ({
  categories,
  activeSlug,
  locale,
  variant,
}: {
  categories: Category[];
  activeSlug: string;
  locale: string;
  variant: "light" | "dark";
}) => {
  return (
    <Panel scrollDir="x" stretch="grow" hasBottomBorder variant={variant}>
      {categories
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((category: any) => {
          const active = activeSlug === category.slug;
          const href = active
            ? blogLink({ locale })
            : blogCategoryLink({ locale, category, isFancy: variant === 'dark' });

          return (
            <Link
              key={category.id}
              href={href}
              className={`category whitespace-nowrap p-2 px-3 text-sm transition ${
                active
                  ? "bg-yellow-400 hover:bg-yellow-300"
                  : "bg-gray-700 hover:bg-yellow-500"
              } text-white`}
            >
              {category.name}
            </Link>
          );
        })}
    </Panel>
  );
};
