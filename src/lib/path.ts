export const img = (strs: TemplateStringsArray, ...vals: string[]) =>
  vals[0]?.startsWith("http") ? vals[0] : process.env.STRAPI_BASE + vals[0];
