export const img = (strs: TemplateStringsArray, ...vals: string[]) =>
  process.env.STRAPI_BASE + vals[0];
