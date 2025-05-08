export interface BlogPost {
  documentId: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  coverImage: { url: string };
}
