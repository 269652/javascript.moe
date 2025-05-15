import { blogCategoryLink, blogLink } from "@/lib/links";
import { useLocale } from "next-intl";
import Link from "next/link";
import { Panel } from "./Panel";
import { Category } from "@/types/Category";

export const Categories = ({
  categories,
  activeSlug,
}: {
  categories: Category[];
  activeSlug: string;
}) => {
  const locale = useLocale();
  return (
    <Panel scrollDir="x" stretch="grow" hasBottomBorder>
      {categories
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((category: any) => {
          const active = activeSlug === category.slug;
          const href = active
            ? blogLink({ locale })
            : blogCategoryLink({ locale, category });

          return (
            <Link
              key={category.id}
              href={href}
              className={`category whitespace-nowrap p-2 px-3 text-sm transition ${
                active
                  ? "bg-yellow-600 hover:bg-yellow-400"
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
