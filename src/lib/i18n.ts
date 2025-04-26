// src/i18n.ts
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale = "en" }) => ({
  locale,
  messages: (await import(`../assets/translations/${locale}.ts`)).default,
}));
