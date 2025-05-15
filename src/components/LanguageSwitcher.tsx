"use client";

import { useParams, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import supportedLocales from "@/lib/locales"; // Adjust path as needed
import clsx from "clsx";

const LanguageSwitcher = ({
  availableLocales,
  href,
  showCurrent = true,
}: any) => {
  const { locale } = useParams<{ locale: string }>();
  const pathname = usePathname();

  const currentLocale = supportedLocales.includes(locale) ? locale : "en";

  return (
    <div className="top-4 right-8 flex z-10 h-fit rounded-md bg-black/30 overflow-hidden ">
      {supportedLocales
        .filter(
          (loc) =>
            (loc !== currentLocale || showCurrent) &&
            availableLocales?.includes(loc)
        )
        .map((loc) => {
          const path = href ? href : pathname;
          const newUrl = path.replace(`/${currentLocale}`, `/${loc}`);

          return (
            <Link key={loc} href={newUrl}>
              <Image
                src={`/images/flags/${loc}.png`}
                alt={`Switch to ${loc}`}
                width={30}
                height={20}
                className={clsx("cursor-pointer min-w-[48px] p-2 hover:bg-white/15", {
                  "cursor-default  bg-white/20 shadow-[0px_0px_3px_1px_black_inset]": currentLocale === loc,
                })}
              />
            </Link>
          );
        })}
    </div>
  );
};

export default LanguageSwitcher;
