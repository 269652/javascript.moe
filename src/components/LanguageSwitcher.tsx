"use client";

import { useParams, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const LanguageSwitcher = () => {
  const { locale } = useParams();
  const pathname = usePathname();

  // Determine the current locale from the pathname
  const currentLocale = locale === "de" ? "de" : "en";

  // Construct the new locale to switch to
  const newLocale = currentLocale === "de" ? "en" : "de";

  // Generate the new URL for the other language
  const newUrl = pathname.replace(`/${currentLocale}`, `/${newLocale}`);

  return (
    <div className=" top-4 right-8 flex gap-2 z-10">
      {/* Link to switch to the other locale */}
      <Link href={newUrl} locale={newLocale}>
        <Image
          src={`/images/flags/${newLocale}.png`}
          alt={newLocale === "en" ? "English" : "German"}
          width={30}
          height={20}
          className="cursor-pointer min-w-[32px]"
        />
      </Link>
    </div>
  );
};

export default LanguageSwitcher;
