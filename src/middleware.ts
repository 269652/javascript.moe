import createMiddleware from "next-intl/middleware";
import supportedLocales from "@/lib/locales";

export default createMiddleware({
  locales: supportedLocales,
  defaultLocale: "en",
  // localePrefix: "as-needed",
});
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
