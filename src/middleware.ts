import createMiddleware from "next-intl/middleware";
export default createMiddleware({
  locales: ["de", "en", "es"],
  defaultLocale: "en",
  // localePrefix: "as-needed",
});
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
