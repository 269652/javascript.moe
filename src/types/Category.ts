export interface Category {
  name: string;
  slug: string;
  locale: string;
  localizations: Category[];
  coverImage: { url: string };
}
