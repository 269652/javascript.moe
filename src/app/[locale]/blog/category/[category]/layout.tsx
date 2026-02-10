// app/[locale]/layout.tsx
import { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Metadata } from "next";
import { setNotFoundContext } from "@/lib/context";
import { getBlogPosts, getCategories } from "@/lib/api";
import supportedLocales from "@/lib/locales";

export async function generateStaticParams({ params }: any) {
  const allParams: { locale: string; category: string }[] = [];

  for (const locale of supportedLocales) {
    const { data: categories } = await getCategories({ locale });
    categories.filter((cat: any) => cat.slug).forEach((cat: any) => {
      console.log("Generating static params for:", { locale, category: cat.slug });
      allParams.push({
        locale,
        category: cat.slug, // join slug and id
      });
    });
  }

  return allParams;
}


export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale } = await params;
  setNotFoundContext({ ...(await params) });
  // Use `params` directly (no await needed)
  setRequestLocale(locale);
  return (
    // <html lang={locale}>
    <NextIntlClientProvider
      messages={
        (await import(`@/assets/translations/${locale}.ts`)).default
        // … and provide the relevant messages
      }
    >
      {children}
    </NextIntlClientProvider>
    // </html>
  );
}
