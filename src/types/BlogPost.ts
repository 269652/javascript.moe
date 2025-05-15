import { Category } from "./Category";

export interface BlogPostProps {
  id: number;
  documentId: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  locale: string;
  localizations: BlogPostProps[];
  coverImage: { url: string };
  category: Category
  tags: Category[]
}
