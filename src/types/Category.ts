export interface Category {
  name: string;
  slug: string;
  description: string;
  locale: string;
  localizations: Category[];
  coverImage: { url: string };
}
