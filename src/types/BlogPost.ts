export interface BlogPost {
  documentId: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  locale: string;
  localizations: BlogPost[];
  coverImage: { url: string };
}
