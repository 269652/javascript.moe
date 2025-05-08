"use client";

import { useParams, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import supportedLocales from "@/lib/locales"; // Adjust path as needed

const LanguageSwitcher = ({ availableLocales, href, showCurrent }: any) => {
  const { locale } = useParams<{ locale: string }>();
  const pathname = usePathname();

  const currentLocale = supportedLocales.includes(locale) ? locale : "en";

  return (
    <div className="top-4 right-8 flex gap-2 z-10">
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
            <Link key={loc} href={newUrl} locale={loc}>
              <Image
                src={`/images/flags/${loc}.png`}
                alt={`Switch to ${loc}`}
                width={30}
                height={20}
                className="cursor-pointer min-w-[32px]"
              />
            </Link>
          );
        })}
    </div>
  );
};

export default LanguageSwitcher;
