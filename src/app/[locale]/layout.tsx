// app/[locale]/layout.tsx
import { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string }; // <-- Remove Promise type!
}) {
  const { locale } = await params;
  // Use `params` directly (no await needed)
  setRequestLocale(locale);
  return (
    <html lang={locale}>
      <NextIntlClientProvider
        messages={
          (await import(`../../assets/translations/${locale}.ts`)).default
          // … and provide the relevant messages
        }
      >
        {children}
      </NextIntlClientProvider>
    </html>
  );
}
